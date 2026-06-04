const pool = require("../config/db");

const COOKIE_NAME = "sid";

function limpiarCookieSesion(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

async function invalidarSesion(sid, res, mensaje) {
  await pool.query(
    "DELETE FROM sesiones WHERE id_sesion = ?",
    [sid],
  );

  limpiarCookieSesion(res);

  return res.status(401).json({
    ok: false,
    error: mensaje,
  });
}

async function authMiddleware(req, res, next) {
  try {
    const sid = req.cookies?.[COOKIE_NAME];

    if (!sid) {
      return res.status(401).json({
        ok: false,
        error: "No autenticado",
      });
    }

    const [rows] = await pool.query(
      `SELECT
        s.id_sesion,
        s.usuario_id,
        s.expira_en,
        u.estado
       FROM sesiones s
       INNER JOIN usuarios u
         ON s.usuario_id = u.id_usuario
       WHERE s.id_sesion = ?`,
      [sid],
    );

    if (rows.length === 0) {
      limpiarCookieSesion(res);

      return res.status(401).json({
        ok: false,
        error: "Sesión no válida",
      });
    }

    const sesion = rows[0];

    const sesionExpirada =
      new Date(sesion.expira_en).getTime() <= Date.now();

    if (sesionExpirada) {
      return invalidarSesion(sid, res, "Sesión expirada");
    }

    if (Number(sesion.estado) !== 1) {
      return invalidarSesion(sid, res, "Sesión no válida");
    }

    req.userId = Number(sesion.usuario_id);

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR >>>", error);

    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor",
    });
  }
}

module.exports = authMiddleware;