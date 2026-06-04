import { apiGet, apiPost, apiPatch, apiDelete } from "../api.js";

export function obtenerCarrito() {
  return apiGet("/carrito/obtener");
}

export function agregarProducto(id) {
  return apiPost("/carrito/agregar", { producto_id: id });
}

export function actualizarCantidad(id, cantidad) {
  return apiPatch(`/carrito/actualizar-cantidad/${id}`, {
    cantidad: cantidad,
  });
}

export function eliminarProducto(id) {
  return apiDelete(`/carrito/eliminar/${id}`);
}

export function vaciarCarrito() {
  return apiDelete("/carrito/vaciar");
}