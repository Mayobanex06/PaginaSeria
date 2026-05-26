import {
    obtenerCarritoFinalizar,
    finalizarCompra,
} from "./services/finalizar.service.js";

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


async function manejarFinalizarCompra(event) {
    event.preventDefault();

    const direccion =
        document.getElementById("direccion").value.trim();


    const telefono =
        document.getElementById("telefono").value.trim();

    const metodoPago =
        document.getElementById("metodoPago").value;


    const nota =
        document.getElementById("nota").value.trim();


    if (!direccion || !telefono || !metodoPago) {
        alert("Es necesesario completar los campos requeridos.");

        return;
    }
    const datosCompra = {
        direccion,
        telefono,
        metodoPago,
        nota,
    };

    try {
        const data =
            await finalizarCompra(datosCompra);

        alert(
            data.mensaje ||
            "La compra fue correctamente finalizada"
        );
    } catch (error) {
        console.error(
            "Error al finalizar la compra",
        );


        alert(
            error.mesage ||
            "Error al finalizar la compra"
        );
    }
}

function iniciarFinalizar() {
    const formulario =
        document.getElementById("checkoutForm");

    if (formulario) {
        formulario.addEventListener(
            "submit",
            manejarFinalizarCompra
        );
    }
}

iniciarFinalizar();