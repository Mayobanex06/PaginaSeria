const pool = require("../config/db");
const bcrypt = require("bcrypt");

const {
  normalizarTexto,
  normalizarEmail,
  emailValido,
  passwordValida,
  obtenerIdValido,
  numeroMayorQueCero,
  enteroMayorOIgualACero,
  obtenerEstadoValido,
  valorPermitido,
} = require("../utils/validators");

const MARCAS_PERMITIDAS = ["Samsung", "Xiaomi", "Apple"];
const ROLES_PERMITIDOS = ["Admin", "User"];

function validarProductoAdmin({ nombre, marca, precio, stock, estado }) {
  const nombreLimpio = normalizarTexto(nombre);
  const marcaLimpia = normalizarTexto(marca);
  const precioNumero = Number(precio);
  const stockNumero = Number(stock);
  const estadoNumero = obtenerEstadoValido(estado);

  if (!nombreLimpio || nombreLimpio.length < 2) {
    return { error: "El nombre del producto no es válido" };
  }

  if (!valorPermitido(marcaLimpia, MARCAS_PERMITIDAS)) {
    return { error: "La marca no es válida" };
  }

  if (!numeroMayorQueCero(precio)) {
    return { error: "El precio debe ser mayor que 0" };
  }

  if (!enteroMayorOIgualACero(stock)) {
    return { error: "El stock debe ser un número entero mayor o igual a 0" };
  }

  if (estadoNumero === null) {
    return { error: "El estado no es válido" };
  }

  return {
    datos: {
      nombre: nombreLimpio,
      marca: marcaLimpia,
      precio: precioNumero,
      stock: stockNumero,
      estado: estadoNumero,
    },
  };
}

async function accesoAdmin(req, res) {
  return res.json({
    ok: true,
    mensaje: "Acceso permitido a admin",
  });
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
        stock,
        estado
      FROM productos
      ORDER BY id_producto DESC
    `);

    const productos = rows.map((producto) => ({
      id: producto.id_producto,
      marca: producto.marca,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      imagen: producto.imagen,
      categoria: producto.categoria,
      stock: Number(producto.stock),
      estado: Number(producto.estado),
    }));

    return res.json({ ok: true, productos });
  } catch (error) {
    console.error("Error productos >>>", error);

    return res.status(500).json({
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

    return res.json({
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

    return res.status(500).json({
      ok: false,
      error: "Error al obtener resumen del panel admin",
    });
  }
}

async function inactivarProducto(req, res) {
  try {
    const idProducto = obtenerIdValido(req.params.id);

    if (!idProducto) {
      return res.status(400).json({
        ok: false,
        error: "ID de producto no válido",
      });
    }

    const [result] = await pool.query(
      "UPDATE productos SET estado = 0 WHERE id_producto = ?",
      [idProducto],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Producto no encontrado",
      });
    }

    return res.json({
      ok: true,
      mensaje: "Producto inactivado correctamente",
    });
  } catch (error) {
    console.error("Error al inactivar producto: ", error);

    return res.status(500).json({
      ok: false,
      error: "Error al inactivar el producto",
    });
  }
}

async function editarProducto(req, res) {
  try {
    const idProducto = obtenerIdValido(req.params.id);

    if (!idProducto) {
      return res.status(400).json({
        ok: false,
        error: "ID de producto no válido",
      });
    }

    const validacion = validarProductoAdmin(req.body);

    if (validacion.error) {
      return res.status(400).json({
        ok: false,
        error: validacion.error,
      });
    }

    const { nombre, marca, precio, stock, estado } = validacion.datos;

    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, marca = ?, precio = ?, stock = ?, estado = ? WHERE id_producto = ?",
      [nombre, marca, precio, stock, estado, idProducto],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Producto a editar no encontrado",
      });
    }

    return res.json({
      ok: true,
      mensaje: "Producto editado correctamente",
    });
  } catch (error) {
    console.error("Error al editar el producto", error);

    return res.status(500).json({
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
      ORDER BY id_usuario DESC`,
    );

    const usuarios = rows.map((usuario) => ({
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      ultimo_login: usuario.ultimo_login,
      creado_hace: usuario.creado_hace,
      estado: Number(usuario.estado),
    }));

    return res.json({ ok: true, usuarios });
  } catch (error) {
    console.error("Error al obtener usuarios >>>", error);

    return res.status(500).json({
      ok: false,
      error: "Error al obtener usuarios",
    });
  }
}

async function agregarUsuario(req, res) {
  try {
    const { password, rol } = req.body;

    const nombreLimpio = normalizarTexto(req.body.nombre);
    const emailLimpio = normalizarEmail(req.body.email);

    if (!nombreLimpio || !emailLimpio || !password || !rol) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos requeridos",
      });
    }

    if (!emailValido(emailLimpio)) {
      return res.status(400).json({
        ok: false,
        error: "Email no válido",
      });
    }

    if (!passwordValida(password)) {
      return res.status(400).json({
        ok: false,
        error: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    if (!valorPermitido(rol, ROLES_PERMITIDOS)) {
      return res.status(400).json({
        ok: false,
        error: "Rol no permitido",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombreLimpio, emailLimpio, passwordHash, rol],
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({
        ok: false,
        error: "No se pudo agregar el usuario",
      });
    }

    return res.json({
      ok: true,
      mensaje: "Usuario agregado correctamente",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        ok: false,
        error: "El email ya está registrado",
      });
    }

    console.error("Error al agregar usuario", error);

    return res.status(500).json({
      ok: false,
      error: "Error al agregar usuario",
    });
  }
}

async function editarUsuario(req, res) {
  try {
    const idUsuario = obtenerIdValido(req.params.id);
    const { rol, estado } = req.body;

    const nombreLimpio = normalizarTexto(req.body.nombre);
    const emailLimpio = normalizarEmail(req.body.email);
    const estadoNumero = obtenerEstadoValido(estado);

    if (!idUsuario) {
      return res.status(400).json({
        ok: false,
        error: "ID de usuario no válido",
      });
    }

    if (!nombreLimpio || !emailLimpio || !rol || estado === undefined) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos requeridos",
      });
    }

    if (!emailValido(emailLimpio)) {
      return res.status(400).json({
        ok: false,
        error: "Email no válido",
      });
    }

    if (estadoNumero === null) {
      return res.status(400).json({
        ok: false,
        error: "Estado no válido, debe ser 0 o 1",
      });
    }

    if (!valorPermitido(rol, ROLES_PERMITIDOS)) {
      return res.status(400).json({
        ok: false,
        error: "Rol no permitido",
      });
    }

    const [result] = await pool.query(
      "UPDATE usuarios SET nombre = ?, email = ?, rol = ?, estado = ? WHERE id_usuario = ?",
      [nombreLimpio, emailLimpio, rol, estadoNumero, idUsuario],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Usuario a editar no encontrado",
      });
    }

    return res.json({
      ok: true,
      mensaje: "Usuario editado correctamente",
    });
  } catch (error) {
    console.error("Error al editar el usuario", error);

    return res.status(500).json({
      ok: false,
      error: "Error al editar el usuario",
    });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const idUsuario = obtenerIdValido(req.params.id);

    if (!idUsuario) {
      return res.status(400).json({
        ok: false,
        error: "ID de usuario no válido",
      });
    }

    const [result] = await pool.query(
      "UPDATE usuarios SET estado = 0 WHERE id_usuario = ?",
      [idUsuario],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        error: "Usuario a eliminar no encontrado",
      });
    }

    return res.json({
      ok: true,
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar el usuario", error);

    return res.status(500).json({
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