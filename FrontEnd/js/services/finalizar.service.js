import { apiGet, apiPost } from "../api.js";

export async function finalizarCompra(data) {
    return await apiPost("/finalizar", data);
}
