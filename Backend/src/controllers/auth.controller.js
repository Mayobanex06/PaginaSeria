const crypto = require("crypto");
const bcrypt = require("bcrypt");
const pool = require("../config/db");

const COOKIE_NAME = "sid";
const SALT_ROUNDS = 10;

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarPassword(password) {
  return typeof password === "string" && password.length >= 8;
}

async function register(req, res) {
  try {
    const { nombre, email, password } = req.body;

    const nombreLimpio = nombre?.trim();
    const emailLimpio = email?.trim().toLowerCase();

    if (!nombreLimpio || !emailLimpio || !password) {
      return res.status(400).json({
        ok: false,
        error: "Faltan datos",
      });
    }

    if (nombreLimpio.length < 2 || nombreLimpio.length > 50) {
      return res.status(400).json({
        ok: false,
        error: "El nombre no es válido",
      });
    }

    if (!emailValido(emailLimpio)) {
      return res.status(400).json({
        ok: false,
        error: "El correo electrónico no es válido",
      });
    }

    if (!validarPassword(password)) {
      return res.status(400).json({
        ok: false,
        error: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    const [existe] = await pool.query(
      "SELECT id_usuario FROM usuarios WHERE email = ?",
      [emailLimpio],
    );

    if (existe.length > 0) {
      return res.status(409).json({
        ok: false,
        error: "El email ya existe",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      `INSERT INTO usuarios
      (nombre, email, password, rol, estado)
      VALUES (?, ?, ?, 'User', 1)`,
      [nombreLimpio, emailLimpio, hashedPassword],
    );

    return res.status(201).json({
      ok: true,
      mensaje: "Usuario registrado correctamente",
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        error: "El email ya existe",
      });
    }

    console.error("REGISTER ERROR >>>", err);

    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor",
    });
  }
}

function login(sessions) {
  return async (req, res) => {
    try {
      const { email, password } = req.body;

      const emailLimpio = email?.trim().toLowerCase();

      if (!emailLimpio || !password) {
        return res.status(400).json({
          ok: false,
          error: "Faltan datos",
        });
      }

      if (!emailValido(emailLimpio)) {
        return res.status(401).json({
          ok: false,
          error: "Credenciales inválidas",
        });
      }

      const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [emailLimpio],
      );

      if (rows.length === 0) {
        return res.status(401).json({
          ok: false,
          error: "Credenciales inválidas",
        });
      }

      const user = rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          ok: false,
          error: "Credenciales inválidas",
        });
      }

      if (user.estado !== 1) {
        return res.status(403).json({
          ok: false,
          error: "Usuario inactivo",
        });
      }

      const sid = crypto.randomBytes(24).toString("hex");

      sessions[sid] = {
        id_usuario: user.id_usuario,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      };

      await pool.query(
        "UPDATE usuarios SET ultimo_login = NOW() WHERE id_usuario = ?",
        [user.id_usuario],
      );

      res.cookie(COOKIE_NAME, sid, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.json({ ok: true });
    } catch (err) {
      console.error("LOGIN ERROR >>>", err);
      return res.status(500).json({
        ok: false,
        error: "Error interno del servidor",
      });
    }
  };
}

async function me(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id_usuario, nombre, email, rol, estado, ultimo_login FROM usuarios WHERE id_usuario = ?",
      [req.userId],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ ok: false, error: "Usuario no encontrado" });
    }

    res.json({ ok: true, user: rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error interno del servidor" });
  }
}

function logout(sessions) {
  return (req, res) => {
    const sid = req.cookies[COOKIE_NAME];

    if (sid) {
      delete sessions[sid];
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.json({ ok: true });
  };
}

module.exports = {
  register,
  login,
  me,
  logout,
};
