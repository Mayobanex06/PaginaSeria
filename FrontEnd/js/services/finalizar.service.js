import { apiGet, apiPost } from "../api.js";

export async function obtenerCarritoFinalizar() {
    return await apiGet("/carrito/obtener");
}

export async function finalizarcompra(datosCompra) {
    return await apiPost("/finalizar", datosCompra);
}