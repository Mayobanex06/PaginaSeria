import { apiGet, apiPost } from "../api.js";

export function obtenerCarritoFinalizar() {
    return apiGet("/carrito/obtener");
}

export async function finalizarCompra(data) {
    return await apiPost("/finalizar", data);
}
