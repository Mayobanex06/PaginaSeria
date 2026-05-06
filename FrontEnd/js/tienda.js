import { obtenerProductos } from "./services/tienda.services.js";
import { renderProductos } from "./modules/tienda/tienda.ui.js";
import { filtrarProductosPorCategoria } from "./modules/tienda/tienda.filters.js";
import {
  registrarEventosTienda,
  registrarEventosFiltroCategorias,
} from "./modules/tienda/tienda.events.js";

let productos = [];

const contenedorProductos = document.getElementById("productos-contenedor");
const categorias = document.querySelectorAll(".categoria");

async function cargarProductos() {
  try {
    const data = await obtenerProductos();
    productos = data.productos || [];
    renderProductos(productos, contenedorProductos);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

function aplicarFiltro(categoria) {
  const productosFiltrados = filtrarProductosPorCategoria(productos, categoria);
  renderProductos(productosFiltrados, contenedorProductos);
}

registrarEventosTienda(contenedorProductos);
registrarEventosFiltroCategorias({
  categorias,
  onFiltrar: aplicarFiltro,
});

cargarProductos();
