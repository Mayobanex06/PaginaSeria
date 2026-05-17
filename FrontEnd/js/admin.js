import { verificarAdmin } from "./modules/admin/admin.auth.js";
import { cargarResumenAdmin } from "./modules/admin/admin.resumen.js";
import {
  registrarEventosNavegacion,
  registrarEventoCerrarModal,
} from "./modules/admin/admin.events.js";
import { mostrarSeccion } from "./modules/admin/admin.navigation.js";
import { cerrarModal, abrirModal } from "./modules/admin/admin.modal.js";
import {
  obtenerProductos,
  obtenerUsuarios,
} from "./services/admin.services.js";
import { listarTablaProductos } from "./modules/admin/admin.productos.ui.js";
import { listarTablaUsuarios } from "./modules/admin/admin.users.ui.js";
import {
  registrarEliminarProducto,
  registrarEditarProducto,
  registrarFiltrosProductos,
} from "./modules/admin/admin.productos.events.js";
import {
  registrarEliminarUsuarios,
  registrarEditarUsuario,
  registrarFiltrosUsuarios,
} from "./modules/admin/admin.users.events.js";

const filtros = {
  buscarUsuario: document.getElementById("buscarUsuario"),
  filtroEstadoUsuario: document.getElementById("filtroEstadoUsuario"),
  buscarProducto: document.getElementById("buscarProducto"),
  filtroEstadoProducto: document.getElementById("filtroEstadoProducto"),
};

const elementos = {
  botones: document.querySelectorAll(".admin-opcion"),
  botonesPanelPrincipal: document.querySelectorAll(
    ".panel-inicial-acciones button",
  ),
  secciones: document.querySelectorAll(".admin-panel-seccion"),
  tablaProductos: document.getElementById("adminTablaProductos"),
  tablaUsuarios: document.getElementById("adminTablaUsuarios"),
};

let productos = [];
let usuarios = [];

async function cargarProductosAdmin() {
  try {
    const data = await obtenerProductos();

    productos = data.productos || [];

    listarTablaProductos(elementos.tablaProductos, productos);
  } catch (error) {
    console.error("ERROR CARGAR PRODUCTOS ADMIN >>>", error);
  }
}

async function cargarUsuariosAdmin() {
  try {
    const data = await obtenerUsuarios();

    usuarios = data.usuarios || [];

    listarTablaUsuarios(elementos.tablaUsuarios, usuarios);
  } catch (error) {
    console.error("ERROR CARGAR USUARIOS ADMIN >>>", error);
  }
}

async function iniciarAdmin() {
  const accesoPermitido = await verificarAdmin();

  if (!accesoPermitido) {
    window.location.href = "login.html";
    return;
  }

  await cargarResumenAdmin();

  registrarEventoCerrarModal({
    cerrarModal,
  });

  registrarEventosNavegacion({
    botones: elementos.botones,

    botonesPanelPrincipal: elementos.botonesPanelPrincipal,

    onNavegar: (seccion) =>
      mostrarSeccion({
        seccion,

        botones: elementos.botones,

        secciones: elementos.secciones,

        OnProductos: cargarProductosAdmin,

        OnUsuarios: cargarUsuariosAdmin,
      }),
  });

  registrarEliminarProducto({
    contenedor: elementos.tablaProductos,
    onActualizarResumen: cargarResumenAdmin,
    onActualizarProductos: cargarProductosAdmin,
  });

  registrarEditarProducto({
    getProductos: () => productos,
    abrirModal,
    cerrarModal,
    contenedor: elementos.tablaProductos,
    onActualizarResumen: cargarResumenAdmin,
    onActualizarProductos: cargarProductosAdmin,
  });

  registrarFiltrosProductos({
    filtros,
    contenedor: elementos.tablaProductos,
    getProductos: () => productos,
  });

  registrarEliminarUsuarios({
    contenedor: elementos.tablaUsuarios,

    onActualizarResumen: cargarResumenAdmin,
  });

  registrarEditarUsuario({
    getUsuarios: () => usuarios,
    abrirModal,
    cerrarModal,
    contenedor: elementos.tablaUsuarios,
    onActualizarResumen: cargarResumenAdmin,
    onActualizarUsuarios: cargarUsuariosAdmin,
  });

  registrarFiltrosUsuarios({
    filtros,
    getUsuarios: () => usuarios,
    contenedor: elementos.tablaUsuarios,
  });
}

iniciarAdmin();
