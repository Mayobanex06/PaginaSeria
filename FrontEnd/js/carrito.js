import { obtenerCarrito } from "./services/carrito.services.js";
import { renderCarrito, renderResumen } from "./modules/carrito/carrito.ui.js";
import { calcularTotales } from "./modules/carrito/carrito.calculos.js";
import { registrarEventosCarrito } from "./modules/carrito/carrito.events.js";

let carrito = [];

const elementos = {
  carritoLista: document.getElementById("carritoLista"),
  carritoVacio: document.getElementById("carritoVacio"),
  vaciarCarritoBtn: document.getElementById("vaciarCarritoBtn"),
  resumen: {
    cantidad: document.getElementById("resumenCantidad"),
    subtotal: document.getElementById("resumenSubtotal"),
    envio: document.getElementById("resumenEnvio"),
    total: document.getElementById("resumenTotal"),
  },
};

async function cargarCarrito() {
  try {
    const data = await obtenerCarrito();

    carrito = data.carrito || [];

    renderCarrito(carrito, elementos);

    const totales = calcularTotales(carrito);
    renderResumen(totales, elementos);
  } catch (error) {
    console.error("ERROR CARGAR CARRITO >>>", error);
  }
}

registrarEventosCarrito({
  carritoLista: elementos.carritoLista,
  obtenerEstado: () => carrito,
  recargarCarrito: cargarCarrito,
  vaciarCarritoBtn: elementos.vaciarCarritoBtn,
});

const btnFinalizar =
  document.getElementById("finalizarCompraBtn");

if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    window.location.href = "finalizar.html";
  });
}

cargarCarrito();


