const pool = require("../config/db");
const bcrypt = require("bcrypt");

async function accesoAdmin(req, res) {
  res.json({ ok: true, mensaje: "Acceso permitido a admin" });
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

async function obtenerUsuario(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT 
      id_usuario,
      nombre,
      email,
      rol,
      estado,
      ultimo_login,
      creado_hace
      FROM usuarios
      WHERE estado = 1
      ORDER BY id_usuario DESC`,
    );

    if (rows.length === 0) {
      return res.json({ ok: true, usuarios: [] });
    }

    const usuarios = rows.map((usuario) => ({
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      ultimo_login: usuario.ultimo_login,
      creado_hace: usuario.creado_hace,
      estado: Number(usuario.estado),
    }));
    res.json({ ok: true, usuarios });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Error al obtener usuarios" });
  }
}

async function agregarUsuario(req, res) {
  try {
    const { nombre, email, password, rol } = req.body;

    const nombreLimpio = nombre?.trim();
    const emailLimpio = email?.trim().toLowerCase();

    if (!nombreLimpio || !emailLimpio || !password || !rol) {
      return res
        .status(400)
        .json({ ok: false, error: "Faltan campos requeridos" });
    }

    if (!emailValido(emailLimpio)) {
      return res.status(400).json({ ok: false, error: "Email no válido" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const rolesPermitidos = ["Admin", "User"];

    if (!rolesPermitidos.includes(rol)) {
      return res.status(400).json({ ok: false, error: "Rol no permitido" });
    }

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombreLimpio, emailLimpio, passwordHash, rol],
    );

    if (result.affectedRows === 0) {
      return res
        .status(500)
        .json({ ok: false, error: "No se pudo agregar el usuario" });
    }

    res.json({ ok: true, mensaje: "Usuario agregado correctamente" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ ok: false, error: "El email ya está registrado" });
    }
    console.error("Error al agregar usuario", error);
    res.status(500).json({ ok: false, error: "Error al agregar usuario" });
  }
}

async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nombre, email, rol, estado } = req.body;

    if (!nombre || !email || !rol || estado === undefined) {
      return res
        .status(400)
        .json({ ok: false, error: "Faltan campos requeridos" });
    }

    if (![0, 1].includes(Number(estado))) {
      return res.status(400).json({
        ok: false,
        error: "Estado no válido, debe ser 0 o 1",
      });
    }

    const rolesPermitidos = ["Admin", "User"];

    if (!rolesPermitidos.includes(rol)) {
      return res.status(400).json({ ok: false, error: "Rol no permitido" });
    }

    const [result] = await pool.query(
      "UPDATE usuarios SET nombre = ?, email = ?, rol = ?, estado = ? WHERE id_usuario = ?",
      [nombre.trim(), email.trim(), rol, estado, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Usuario a editar no encontrado",
      });
    }

    res.json({
      ok: true,
      mensaje: "Usuario editado correctamente",
    });
  } catch (error) {
    console.error("Error al editar el usuario", error);
    res.status(500).json({
      ok: false,
      error: "Error al editar el usuario",
    });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "UPDATE usuarios SET estado = 0 WHERE id_usuario = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Usuario a eliminar no encontrado",
      });
    }
    res.json({
      ok: true,
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar el usuario", error);
    res.status(500).json({
      ok: false,
      error: "Error al eliminar el usuario",
    });
  }
}

module.exports = {
  accesoAdmin,
  obtenerProductosAdmin,
  resumenAdmin,
  inactivarProducto,
  editarProducto,
  obtenerUsuario,
  agregarUsuario,
  editarUsuario,
  eliminarUsuario,
};
