import { obtenerCarritoFinalizar } from "./services/finalizar.service.js";

import { renderResumenCheckout } from "./modules/finalizar/finalizar.ui.js";

async function cargarResumen() {
    try {
        const data = await obtenerCarritoFinalizar();

        console.log("DATA FINALIZAR >>>", data);

        const contenedorResumen =
            document.getElementById("checkoutResumen");

        contenedorResumen.innerHTML =
            renderResumenCheckout(data.carrito);

    } catch (error) {
        console.error("Error al cargar resumen", error);
    }
}

cargarResumen();