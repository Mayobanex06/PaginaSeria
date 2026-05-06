import { formatearPrecio } from "../../utils/formatters.js";

export function crearTarjetaCarrito(carritoItem) {
  return `<div class="carrito-item" data-producto-id="${carritoItem.producto_id}">
    <div class="carrito-item-img">
      <img src="${carritoItem.imagen}" alt="${carritoItem.nombre}">
    </div>

    <div class="carrito-item-info">
      <p class="carrito-item-marca">${carritoItem.marca}</p>
      <h3 class="carrito-item-nombre">${carritoItem.nombre}</h3>
      <p class="carrito-item-precio">${formatearPrecio(carritoItem.precio)}</p>
    </div>

    <div class="carrito-item-actions">
      <div class="cantidad-control">
        <button class="btn-cantidad btn-restar" data-producto-id="${carritoItem.producto_id}">-</button>
        <span class="cantidad">${carritoItem.cantidad}</span>
        <button class="btn-cantidad btn-sumar" data-producto-id="${carritoItem.producto_id}">+</button>
      </div>

      <p class="carrito-item-subtotal">
        ${formatearPrecio(carritoItem.precio * carritoItem.cantidad)}
      </p>

      <button class="btn-eliminar" data-producto-id="${carritoItem.producto_id}">
        Eliminar
      </button>
    </div>
  </div>`;
}

export function renderCarrito(lista, elementos) {
  const { carritoLista, carritoVacio } = elementos;

  if (!carritoLista) {
    console.error("No se encontró el contenedor del carrito");
    return;
  }

  if (!lista || lista.length === 0) {
    carritoLista.innerHTML = "";
    carritoVacio.classList.remove("oculto");
    return;
  }

  carritoVacio.classList.add("oculto");

  carritoLista.innerHTML = lista.map(crearTarjetaCarrito).join("");
}

export function renderResumen(totales, elementos) {
  const { resumen } = elementos;

  if (resumen.cantidad) {
    resumen.cantidad.textContent = totales.cantidad;
  }

  resumen.subtotal.textContent = formatearPrecio(totales.subtotal);
  resumen.envio.textContent = formatearPrecio(totales.envio);
  resumen.total.textContent = formatearPrecio(totales.total);
}
