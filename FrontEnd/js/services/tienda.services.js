import { apiGet } from "../api.js";

export function obtenerProductos() {
  return apiGet("/tienda/productos");
}
