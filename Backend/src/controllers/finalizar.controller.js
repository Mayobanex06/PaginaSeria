import pool from "../config/db.js";

export async function finalizarCompra(req, res) {
  const usuarioId = req.userId;

  const { direccion, telefono, metodoPago, nota } = req.body;

  if (!direccion || !telefono || !metodoPago) {
    return res.status(400).json({
      ok: false,
      error: "Faltan datos requeridos",
    });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [carrito] = await connection.query(
      `
      SELECT 
        ci.producto_id,
        ci.cantidad,
        p.precio,
        p.stock
      FROM carrito_items ci
      INNER JOIN productos p
        ON ci.producto_id = p.id_producto
      WHERE ci.usuario_id = ?
      `,
      [usuarioId],
    );

    if (carrito.length === 0) {
      await connection.rollback();

      return res.status(400).json({
        ok: false,
        error: "El carrito está vacío",
      });
    }

    for (const item of carrito) {
      if (item.cantidad > item.stock) {
        await connection.rollback();

        return res.status(400).json({
          ok: false,
          error: "Stock insuficiente para uno o más productos",
        });
      }
    }

    const total = carrito.reduce((acum, item) => {
      return acum + Number(item.precio) * Number(item.cantidad);
    }, 0);

    const [ordenResult] = await connection.query(
      `
      INSERT INTO ordenes
        (usuario_id, total, direccion, telefono, metodo_pago, nota)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [usuarioId, total, direccion, telefono, metodoPago, nota || null],
    );

    const ordenId = ordenResult.insertId;

    for (const item of carrito) {
      await connection.query(
        `
        INSERT INTO orden_items
          (orden_id, producto_id, cantidad, precio)
        VALUES (?, ?, ?, ?)
        `,
        [ordenId, item.producto_id, item.cantidad, item.precio],
      );

      await connection.query(
        `
        UPDATE productos
        SET stock = stock - ?
        WHERE id_producto = ?
        `,
        [item.cantidad, item.producto_id],
      );
    }

    await connection.query(
      `
      DELETE FROM carrito_items
      WHERE usuario_id = ?
      `,
      [usuarioId],
    );

    await connection.commit();

    return res.json({
      ok: true,
      mensaje: "Compra finalizada correctamente",
      ordenId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("ERROR FINALIZAR COMPRA >>>", error);

    return res.status(500).json({
      ok: false,
      error: "Error al finalizar la compra",
    });
  } finally {
    connection.release();
  }
}
