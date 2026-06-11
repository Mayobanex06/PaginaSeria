import {
  obtenerCarritoFinalizar,
  finalizarCompra,
} from "./services/finalizar.service.js";

import { renderResumenCheckout } from "./modules/finalizar/finalizar.ui.js";

// Parte adecuada del finalizar.js 

async function cargarResumen() {
  try {
    const data = await obtenerCarritoFinalizar();

    console.log("DATA FINALIZAR >>>", data);

    const contenedorResumen = document.getElementById("checkoutResumen");

    contenedorResumen.innerHTML = renderResumenCheckout(data.carrito);
  } catch (error) {
    console.error("Error al cargar resumen", error);
  }
}

cargarResumen();

// 1ra Parte a modularizar: (desconocido).js

const fechaExpiracionInput =
  document.getElementById("fechaExpiracion");

if (fechaExpiracionInput) {
  fechaExpiracionInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");

    if (valor.length > 4) {
      valor = valor.slice(0, 4);
    }

    if (valor.length >= 3) {
      valor =
        valor.slice(0, 2) +
        "/" +
        valor.slice(2);
    }

    e.target.value = valor;
  });
}


// 2da Parte a modularizar: finalizar.events.js

async function manejarFinalizarCompra(event) {
  event.preventDefault();

  const direccion = document.getElementById("direccion").value.trim();

  const telefono = document.getElementById("telefono").value.trim();

  const metodoPago = document.getElementById("metodoPago").value;

  const nota = document.getElementById("nota").value.trim();

  const numeroTarjeta = document.getElementById("numeroTarjeta").value.trim();

  const fechaExpiracion = document
    .getElementById("fechaExpiracion")
    .value.trim();

  const ccv = document.getElementById("ccv").value.trim();

  if (!direccion || !telefono || !metodoPago) {
    alert("Es necesario completar todos los campos requeridos");
    return;
  }

  if (metodoPago === "Tarjeta") {
    if (!numeroTarjeta || !fechaExpiracion || !ccv) {
      alert("Completa todos los datos de la tarjeta.");

      return;
    }

    if (ccv.length !== 3 || isNaN(ccv)) {
      alert("El CCV debe tener 3 números.");
    }

    const datosCompra = {
      direccion,
      telefono,
      metodoPago,
      nota,
    };

    try {
      const data = await finalizarCompra(datosCompra);

      alert(data.mensaje || "La compra fue correctamente finalizada");
    } catch (error) {
      console.error("Error al finalizar la compra");

      alert(error.mesage || "Error al finalizar la compra");
    }
  }

  

  function iniciarFinalizar() {
    const formulario = document.getElementById("checkoutForm");

    if (formulario) {
      formulario.addEventListener("submit", manejarFinalizarCompra);
    }
  }
}
iniciarFinalizar();
