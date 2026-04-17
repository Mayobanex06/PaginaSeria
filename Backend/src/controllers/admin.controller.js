const pool = require("../config/db");

async function accesoAdmin(req, res) {
  res.json({ ok: true, mensaje: "Acceso permitido a admin" });
}

async function obtenerProductosAdmin(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id_producto,
        marca,
        nombre,
        precio,
        imagen,
        categoria,
        stock
      FROM productos
      WHERE estado = 1
      ORDER BY id_producto DESC
    `);

    const productos = rows.map((producto) => ({
      id: producto.id_producto,
      marca: producto.marca,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      imagen: producto.imagen,
      categoria: producto.categoria,
      stock: producto.stock,
    }));

    res.json({ ok: true, productos });
  } catch (error) {
    console.error("Error productos >>>", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener productos",
    });
  }
}

async function resumenAdmin(req, res) {
  try {
    const [[productosTotalRows]] = await pool.query(`
      SELECT COUNT(*) AS total_productos
      FROM productos
    `);

    const [[usuariosActivosRows]] = await pool.query(`
      SELECT COUNT(*) AS usuarios_activos
      FROM usuarios
      WHERE estado = 1
    `);

    const [[stockBajoRows]] = await pool.query(`
      SELECT COUNT(*) AS stock_bajo
      FROM productos
      WHERE stock <= 3 AND estado = 1
    `);

    res.json({
      ok: true,
      resumen: {
        totalProductos: productosTotalRows.total_productos,
        usuariosActivos: usuariosActivosRows.usuarios_activos,
        ordenesHoy: 0,
        stockBajo: stockBajoRows.stock_bajo,
      },
    });
  } catch (error) {
    console.error("ERROR RESUMEN ADMIN >>>", error);
    res.status(500).json({
      ok: false,
      error: "Error al obtener resumen del panel admin",
    });
  }
}

async function inactivarProducto(req, res) {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE productos SET estado = 0 WHERE id_producto = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Producto no encontrado",
      });
    }

    res.json({
      ok: true,
      mensaje: "Producto inactivado correctamente",
    });
  } catch (error) {
    console.error("Error al inactivar producto: ", error);
    res.status(500).json({
      ok: false,
      error: "Error al inactivar el producto",
    });
  }
}

async function editarProducto(req, res) {
  try {
    const { id } = req.params;
    const { nombre, marca, precio, stock, estado } = req.body;

    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, marca = ?, precio = ?, stock = ?, estado = ? WHERE id_producto = ?",
      [nombre, marca, precio, stock, estado, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Producto a editar no encontrado",
      });
    }

    res.json({
      ok: true,
      mensaje: "Producto editado correctamente",
    });
  } catch (error) {
    console.error("Error al editar el producto", error);
    res.status(500).json({
      ok: false,
      error: "Error al editar el producto",
    });
  }
}

module.exports = {
  accesoAdmin,
  obtenerProductosAdmin,
  resumenAdmin,
  inactivarProducto,
  editarProducto,
};
