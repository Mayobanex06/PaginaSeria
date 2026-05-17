import {
  obtenerProductos,
  inactivarProducto,
  editarProducto,
} from "../../services/admin.services.js";
import { filtrarLista } from "../../utils/filters.js";

import {
  crearModalEditarProducto,
  listarTablaProductos,
} from "./admin.productos.ui.js";

export function registrarEliminarProducto({
  contenedor,
  onActualizarResumen,
  onActualizarProductos,
}) {
  document.addEventListener("click", async (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar");

    if (!btnEliminar) return;

    const id = btnEliminar.dataset.id;

    const confirmar = confirm(
      "¿Está seguro de que quiere eliminar este producto?",
    );

    if (!confirmar) return;

    try {
      await inactivarProducto(id);

      await onActualizarProductos();

      await onActualizarResumen();

      const data = await obtenerProductos();
      console.log("PRODUCTOS DESPUÉS DE INACTIVAR:", data.productos);
    } catch (error) {
      console.error("Error eliminando producto", error);
    }
  });
}

export function registrarEditarProducto({
  abrirModal,
  cerrarModal,
  getProductos,
  contenedor,
  onActualizarResumen,
  onActualizarProductos,
}) {
  document.addEventListener("click", (e) => {
    const btnEditar = e.target.closest(".btn-editar");

    if (!btnEditar) return;

    const id = btnEditar.dataset.id;

    const producto = getProductos().find(
      (producto) => Number(producto.id) === Number(id),
    );

    if (!producto) {
      alert("Producto no encontrado");
      return;
    }

    abrirModal(crearModalEditarProducto(producto));
  });

  document.addEventListener("submit", async (e) => {
    const form = e.target.closest("#formEditarProducto");

    if (!form) return;

    e.preventDefault();

    const id = form.dataset.id;

    const dataProducto = {
      nombre: form.nombre.value.trim(),
      marca: form.marca.value.trim(),
      precio: Number(form.precio.value),
      stock: Number(form.stock.value),
      estado: 1,
    };

    try {
      await editarProducto(id, dataProducto);

      await onActualizarProductos();

      await onActualizarResumen();

      cerrarModal();
    } catch (error) {
      console.error("Error al editar producto", error);
    }
  });
}

export function registrarFiltrosProductos({
  filtros,
  contenedor,
  getProductos,
}) {
  if (!filtros.buscarProducto || !filtros.filtroEstadoProducto) return;

  function aplicarFiltros() {
    const productosFiltrados = filtrarLista(getProductos(), {
      nombre: filtros.buscarProducto.value,
      estado: filtros.filtroEstadoProducto.value,
    });

    listarTablaProductos(contenedor, productosFiltrados);
  }

  filtros.buscarProducto.addEventListener("input", aplicarFiltros);
  filtros.filtroEstadoProducto.addEventListener("change", aplicarFiltros);
}
