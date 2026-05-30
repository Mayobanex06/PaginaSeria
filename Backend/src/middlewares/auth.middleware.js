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

function authMiddleware(sessions) {
  return async (req, res, next) => {
    try {
      const sid = req.cookies[COOKIE_NAME];

      if (!sid || !sessions[sid]) {
        return res.status(401).json({
          ok: false,
          error: "No autenticado",
        });
      }

      if (Date.now() > sessions[sid].expiresAt) {
        delete sessions[sid];
        limpiarCookieSesion(res);

        return res.status(401).json({
          ok: false,
          error: "Sesión expirada",
        });
      }

      const userId = sessions[sid].id_usuario;

      const [rows] = await pool.query(
        "SELECT estado FROM usuarios WHERE id_usuario = ?",
        [userId],
      );

      if (rows.length === 0 || Number(rows[0].estado) !== 1) {
        delete sessions[sid];
        limpiarCookieSesion(res);

        return res.status(401).json({
          ok: false,
          error: "Sesión no válida",
        });
      }

      req.userId = userId;
      next();
    } catch (error) {
      console.error("AUTH MIDDLEWARE ERROR >>>", error);

      return res.status(500).json({
        ok: false,
        error: "Error interno del servidor",
      });
    }
  };
}

module.exports = authMiddleware;
