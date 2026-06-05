const pool = require("../config/db");

async function adminMiddleware(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT rol, estado FROM usuarios WHERE id_usuario = ?",
      [req.userId],
    );

    if (rows.length === 0) {
      return res.status(401).json({
        ok: false,
        error: "Sesión no válida",
      });
    }

    const usuario = rows[0];

    if (Number(usuario.estado) !== 1) {
      return res.status(401).json({
        ok: false,
        error: "Sesión no válida",
      });
    }

    if (usuario.rol !== "Admin") {
      return res.status(403).json({
        ok: false,
        error: "No autorizado",
      });
    }

    next();
  } catch (error) {
    console.error("ADMIN MIDDLEWARE ERROR >>>", error);

    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor",
    });
  }
}

module.exports = adminMiddleware;
