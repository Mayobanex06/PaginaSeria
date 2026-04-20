const crypto = require("crypto");
const bcrypt = require("bcrypt");
const pool = require("../config/db");

const COOKIE_NAME = "sid";
const SALT_ROUNDS = 10;

async function register(req, res) {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const [existe] = await pool.query(
      "SELECT id_usuario FROM usuarios WHERE email = ?",
      [email],
    );

    if (existe.length > 0) {
      return res.status(409).json({ error: "El email ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      `INSERT INTO usuarios 
      (nombre, email, password, rol, estado) 
      VALUES (?, ?, ?, 'User', 1)`,
      [nombre, email, hashedPassword],
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("REGISTER ERROR >>>", err);
    return res.status(500).json({
      error: "Error en registro",
      detalle: err.message,
      code: err.code,
    });
  }
}

function login(sessions) {
  return async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Faltan datos" });
      }

      const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email],
      );

      if (rows.length === 0) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const user = rows[0];

      if (user.estado !== 1) {
        return res.status(403).json({ error: "Usuario inactivo" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciales inválidas" });
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
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.json({ ok: true });
    } catch (err) {
      console.error("LOGIN ERROR >>>", err);
      return res.status(500).json({
        error: "Error en login",
        detalle: err.message,
        code: err.code,
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
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ ok: true, user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
}

function logout(sessions) {
  return (req, res) => {
    const sid = req.cookies[COOKIE_NAME];

    if (sid) {
      delete sessions[sid];
    }

    res.clearCookie(COOKIE_NAME);
    res.json({ ok: true });
  };
}

module.exports = {
  register,
  login,
  me,
  logout,
};
