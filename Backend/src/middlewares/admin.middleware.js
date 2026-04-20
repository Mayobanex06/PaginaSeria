const pool = require("../config/db");

async function adminMiddleware(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT rol FROM usuarios WHERE id_usuario = ?",
      [req.userId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no existe" });
    }

    if (rows[0].rol !== "Admin") {
      return res.status(403).json({ error: "No autorizado" });
    }

    next();
  } catch (error) {
    console.error("ADMIN MIDDLEWARE ERROR >>>", error);
    res.status(500).json({ error: "Error al validar rol de admin" });
  }
}

module.exports = adminMiddleware;
