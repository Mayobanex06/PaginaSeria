const pool = require("../config/db");

function validarProductoId(valor) {
  if (valor === undefined) {
    return { ok: false, status: 400, error: "Faltan datos" };
  }

  const producto_id = Number(valor);

  if (Number.isNaN(producto_id)) {
    return { ok: false, status: 400, error: "ID de producto inválido (NaN)" };
  }

  if (producto_id <= 0) {
    return { ok: false, status: 400, error: "ID de producto inválido" };
  }

  return { ok: true, producto_id };
}

async function buscarProducto(producto_id) {
  const [rows] = await pool.query(
    `SELECT id_producto, stock, estado
     FROM productos
     WHERE id_producto = ?`,
    [producto_id],
  );

  return rows[0] || null;
}

async function agregarAlCarrito(req, res) {
  try {
    const validacion = validarProductoId(req.body.producto_id);

    if (!validacion.ok) {
      return res.status(validacion.status).json({ error: validacion.error });
    }

    const { producto_id } = validacion;
    const producto = await buscarProducto(producto_id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (producto.estado === 0) {
      return res.status(400).json({ error: "Producto no disponible" });
    }

    if (producto.stock <= 0) {
      return res.status(400).json({ error: "Producto sin stock" });
    }

    const [items] = await pool.query(
      `SELECT id_item, cantidad
       FROM carrito_items
       WHERE usuario_id = ? AND producto_id = ?`,
      [req.userId, producto_id],
    );

    if (items.length === 0) {
      await pool.query(
        `INSERT INTO carrito_items (usuario_id, producto_id, cantidad)
         VALUES (?, ?, 1)`,
        [req.userId, producto_id],
      );
    } else {
      const nuevaCantidad = items[0].cantidad + 1;

      if (nuevaCantidad > producto.stock) {
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

    return res.status(200).json({
      ok: true,
      message: "Producto agregado al carrito",
    });
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
          p.estado,
          p.stock
       FROM carrito_items c
       INNER JOIN productos p
         ON c.producto_id = p.id_producto
       WHERE c.usuario_id = ?`,
      [req.userId],
    );

    return res.status(200).json({
      ok: true,
      carrito: rows,
    });
  } catch (error) {
    console.error("Error obtener carrito >>>", error);
    return res.status(500).json({ error: "Error al obtener el carrito" });
  }
}

async function actualizarCantidad(req, res) {
  try {
    const validacion = validarProductoId(req.params.productoId);

    if (!validacion.ok) {
      return res.status(validacion.status).json({ error: validacion.error });
    }

    const { producto_id } = validacion;
    const cantidad = Number(req.body.cantidad);

    if (Number.isNaN(cantidad) || cantidad < 1) {
      return res
        .status(400)
        .json({ error: "La cantidad debe ser un número mayor o igual a 1" });
    }

    const producto = await buscarProducto(producto_id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (producto.estado === 0) {
      return res.status(400).json({ error: "Producto no disponible" });
    }

    if (cantidad > producto.stock) {
      return res.status(400).json({
        error: "La cantidad solicitada supera el stock disponible",
      });
    }

    const [items] = await pool.query(
      `SELECT id_item
       FROM carrito_items
       WHERE usuario_id = ? AND producto_id = ?`,
      [req.userId, producto_id],
    );

    if (items.length === 0) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    await pool.query(
      `UPDATE carrito_items
       SET cantidad = ?
       WHERE usuario_id = ? AND producto_id = ?`,
      [cantidad, req.userId, producto_id],
    );

    return res.status(200).json({
      ok: true,
      message: "Cantidad actualizada correctamente",
    });
  } catch (error) {
    console.error("Error actualizar cantidad >>>", error);
    return res.status(500).json({ error: "Error al actualizar la cantidad" });
  }
}

async function eliminarDelCarrito(req, res) {
  try {
    const validacion = validarProductoId(req.params.productoId);

    if (!validacion.ok) {
      return res.status(validacion.status).json({ error: validacion.error });
    }

    const { producto_id } = validacion;

    const [rows] = await pool.query(
      `SELECT id_item
       FROM carrito_items
       WHERE usuario_id = ? AND producto_id = ?`,
      [req.userId, producto_id],
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    await pool.query(
      `DELETE FROM carrito_items
       WHERE usuario_id = ? AND producto_id = ?`,
      [req.userId, producto_id],
    );

    return res.status(200).json({
      ok: true,
      message: "Producto eliminado del carrito",
    });
  } catch (error) {
    console.error("Error eliminar del carrito >>>", error);
    return res.status(500).json({ error: "Error al eliminar del carrito" });
  }
}

async function vaciarCarrito(req, res) {
  try {
    await pool.query(
      `DELETE FROM carrito_items
       WHERE usuario_id = ?`,
      [req.userId],
    );

    return res.status(200).json({
      ok: true,
      message: "Carrito vaciado correctamente",
    });
  } catch (error) {
    console.error("Error vaciar carrito >>>", error);
    return res.status(500).json({ error: "Error al vaciar el carrito" });
  }
}

module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
};
