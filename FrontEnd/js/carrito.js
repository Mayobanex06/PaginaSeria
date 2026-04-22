const API = window.API_BASE;

let carritoItem = [];

function crearTarjetaCarrito(carritoItem) {
  return `<div class="carrito-item" data-producto-id="${carritoItem.producto_id}">
  
  <div class="carrito-item-img">
    <img src="${carritoItem.imagen}" alt="${carritoItem.nombre}">
  </div>

  <div class="carrito-item-info">
    <p class="carrito-item-marca">${carritoItem.marca}</p>
    <h3 class="carrito-item-nombre">${carritoItem.nombre}</h3>
    <p class="carrito-item-precio">RD$${carritoItem.precio.toFixed(2)}</p>
  </div>

  <div class="carrito-item-actions">
    
    <div class="cantidad-control">
      <button class="btn-cantidad btn-restar" data-producto-id="${carritoItem.producto_id}">-</button>
      <span class="cantidad">${carritoItem.cantidad}</span>
      <button class="btn-cantidad btn-sumar" data-producto-id="${carritoItem.producto_id}">+</button>
    </div>

    <p class="carrito-item-subtotal">
      RD$${(carritoItem.precio * carritoItem.cantidad).toFixed(2)}
    </p>

    <button class="btn-eliminar" data-producto-id="${carritoItem.producto_id}">Eliminar</button>

  </div>

</div>`;
}

const carritoLista = document.getElementById("carritoLista");
const carritoVacio = document.getElementById("carritoVacio");
const resumen = {
  cantidad: document.getElementById("resumenCantidad"),
  subtotal: document.getElementById("resumenSubtotal"),
  envio: document.getElementById("resumenEnvio"),
  total: document.getElementById("resumenTotal"),
};

function renderCarrito(lista) {
  if (!carritoLista) {
    return console.error("No se encontró el contenedor del carrito");
  }

  if (!lista || lista.length === 0) {
    carritoLista.innerHTML = "";
    carritoVacio.classList.remove("oculto");
    resumen.cantidad.textContent = "0";
    resumen.subtotal.textContent = "RD$0.00";
    resumen.envio.textContent = "RD$0.00";
    resumen.total.textContent = "RD$0.00";
    return;
  }

  carritoVacio.classList.add("oculto");

  carritoLista.innerHTML = lista
    .map((item) => crearTarjetaCarrito(item))
    .join("");

  let totalCantidad = 0;
  let totalSubtotal = 0;
  let totalEnvio;
  let totalTotal;

  lista.forEach((item) => {
    totalCantidad += item.cantidad;
    totalSubtotal += item.precio * item.cantidad;
  });

  totalEnvio = totalSubtotal * 0.1;
  totalTotal = totalSubtotal + totalEnvio;

  resumen.cantidad.textContent = totalCantidad;
  resumen.subtotal.textContent = `RD$${totalSubtotal.toFixed(2)}`;
  resumen.envio.textContent = `RD$${totalEnvio.toFixed(2)}`;
  resumen.total.textContent = `RD$${totalTotal.toFixed(2)}`;
}

async function registrarEventosCarrito() {}
