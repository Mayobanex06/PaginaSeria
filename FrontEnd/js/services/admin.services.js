import { apiPut, apiGet, apiPost, apiPatch } from "../api.js";

export function obtenerUsuarioActual() {
  return apiGet("/me");
}

export function obtenerResumenAdmin() {
  return apiGet("/admin/resumen");
}

export function obtenerProductos() {
  return apiGet("/admin/productos/obtener");
}

export function inactivarProducto(id) {
  return apiPatch(`/admin/productos/${id}/inactivar`);
}

export function editarProducto(id, data) {
  return apiPut(`/admin/productos/${id}/editar`, data);
}

export function obtenerUsuarios() {
  return apiGet("/admin/usuarios/obtener");
}

export function agregarUsuario(data) {
  return apiPost("/admin/usuarios/agregar", data);
}

export function editarUsuario(id, data) {
  return apiPut(`/admin/usuarios/${id}/editar`, data);
}

export function desactivarUsuario(id) {
  return apiPatch(`/admin/usuarios/${id}/desactivar`);
}
