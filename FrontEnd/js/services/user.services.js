import { apiGet, apiPost } from "../api.js";

export function obtenerUsuario() {
  return apiGet("/me");
}

export function cerrarSesion() {
  return apiPost("/logout", {});
}
