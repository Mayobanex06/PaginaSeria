const pool = require("../config/db");

async function agregarAlCarrito(req, res) {
  const productoIdNeto = req.body.producto_id;

  try {
    if (productoIdNeto === undefined) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const producto_id = Number(productoIdNeto);

    if (isNaN(producto_id)) {
      return res.status(400).json({ error: "ID de producto invalido (NaN)" });
    }

    if (producto_id <= 0) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const [rows] = await pool.query(
      `SELECT id_producto, stock, estado
    FROM productos
    WHERE id_producto = ?`,
      [producto_id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const estado = rows[0].estado;

    if (estado === 0) {
      return res.status(400).json({ error: "Producto no disponible" });
    }

    const stock = rows[0].stock;

    if (stock <= 0) {
      return res.status(400).json({ error: "Producto sin stock" });
    }

    const [rows2] = await pool.query(
      `SELECT id_item, cantidad
    FROM carrito_items
    WHERE usuario_id = ? AND producto_id = ?`,
      [req.userId, producto_id],
    );

    if (rows2.length === 0) {
      await pool.query(
        `INSERT INTO carrito_items (usuario_id, producto_id, cantidad)
            VALUES (?, ?, 1)`,
        [req.userId, producto_id],
      );
    } else {
      const cantidadActual = rows2[0].cantidad;
      const nuevaCantidad = cantidadActual + 1;

      if (nuevaCantidad > stock) {
        return res.status(400).json({
          error: "No puedes agregar más unidades de este producto al carrito",
        });
      }

      await pool.query(
        `UPDATE carrito_items
            SET cantidad = ?
            WHERE usuario_id = ? AND producto_id = ?`,
        [nuevaCantidad, req.userId, producto_id],
      );
    }

    return res.status(200).json({ message: "Producto agregado al carrito" });
  } catch (error) {
    console.error("Error agregar al carrito >>>", error);
    return res.status(500).json({ error: "Error al agregar al carrito" });
  }
}

async function obtenerCarrito(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT 
    c.id_item,
    c.producto_id,
    c.cantidad,
    p.nombre,
    p.marca,
    p.precio,
    p.imagen,
    p.categoria,
    p.estado
    FROM carrito_items c
    INNER JOIN productos p ON c.producto_id = p.id_producto
    WHERE c.usuario_id = ?`,
      [req.userId],
    );
    return res.status(200).json({ carrito: rows });
  } catch (error) {
    console.error("Error obtener carrito >>>", error);
    return res.status(500).json({ error: "Error al obtener el carrito" });
  }
}

async function eliminarDelCarrito(req, res) {
  try {
    const productoIdNeto = req.params.productoId;
    if (productoIdNeto === undefined) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const producto_id = Number(productoIdNeto);
    if (isNaN(producto_id)) {
      return res.status(400).json({ error: "ID de producto invalido (NaN)" });
    }
    if (producto_id <= 0) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const [rows] = await pool.query(
      `SELECT id_item FROM carrito_items
            WHERE usuario_id = ? AND producto_id = ?`,
      [req.userId, producto_id],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    } else {
      await pool.query(
        `DELETE FROM carrito_items
                WHERE usuario_id = ? AND producto_id = ?`,
        [req.userId, producto_id],
      );
      return res
        .status(200)
        .json({ message: "Producto eliminado del carrito" });
    }
  } catch (error) {
    console.error("Error eliminar del carrito >>>", error);
    return res.status(500).json({ error: "Error al eliminar del carrito" });
  }
}

module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
};
