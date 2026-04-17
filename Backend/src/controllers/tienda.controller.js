const pool = require("../config/db");

async function obtenerProductosTienda(req, res) {
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

module.exports = {
  obtenerProductosTienda,
};
