const pool = require("../config/db.js");

async function finalizarCompra(req, res) {

  const userId = req.userId;

  try {
    const [carritoItems] = await pool.query(
      `SELECT 
      ci.id_carrito,
      ci.cantidad,
      ci.producto_id,
      p.estado,
      p.stock
      FROM carrito_items ci
      JOIN productos p ON ci.producto_id = p.id_producto
      WHERE ci.usuario_id = ?`,
      [userId],
    );

    if (carritoItems.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "El carrito está vacío",
      });
    }

    if (carritoItems.some((item) => item.estado !== "Activo")) {
      return res.status(400).json({
        ok: false,
        error: "Uno o más productos en el carrito no están disponibles",
      });
    }

    if (carritoItems.some((item) => item.stock < item.cantidad)) {
      return res.status(400).json({
        ok: false,
        error: "Uno o más productos en el carrito no tienen suficiente stock",
      });
    }

      

    

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor",
    });
  }
}