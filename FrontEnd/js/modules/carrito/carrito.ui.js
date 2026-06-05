import { formatearPrecio } from "../../utils/formatters.js";
import { escaparHTML, obtenerRutaImagenSegura, obtenerRutaImagenRespaldo } from "../../utils/sanitizar.js";

export function crearTarjetaCarrito(carritoItem) {
  const imagenSegura = obtenerRutaImagenSegura(carritoItem.imagen);
  const imagenRespaldo = obtenerRutaImagenRespaldo();

  return `<div class="carrito-item" data-producto-id="${escaparHTML(Number(carritoItem.producto_id))}">
    <div class="carrito-item-img">
      <img src="${imagenSegura}" alt="${escaparHTML(carritoItem.nombre)}" data-imagen-respaldo="${imagenRespaldo}" />
    </div>

    <div class="carrito-item-info">
      <p class="carrito-item-marca">${escaparHTML(carritoItem.marca)}</p>
      <h3 class="carrito-item-nombre">${escaparHTML(carritoItem.nombre)}</h3>
      <p class="carrito-item-precio">${formatearPrecio(Number(carritoItem.precio))}</p>
    </div>

    <div class="carrito-item-actions">
      <div class="cantidad-control">
        <button class="btn-cantidad btn-restar" data-producto-id="${escaparHTML(Number(carritoItem.producto_id))}">-</button>
        <span class="cantidad">${escaparHTML(Number(carritoItem.cantidad))}</span>
        <button class="btn-cantidad btn-sumar" data-producto-id="${escaparHTML(Number(carritoItem.producto_id))}">+</button>
      </div>

      <p class="carrito-item-subtotal">
        ${formatearPrecio(Number(carritoItem.precio) * Number(carritoItem.cantidad))}
      </p>

      <button class="btn-eliminar" data-producto-id="${escaparHTML(Number(carritoItem.producto_id))}">
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
    resumen.cantidad.textContent = Number(totales.cantidad);
  }

  resumen.subtotal.textContent = formatearPrecio(Number(totales.subtotal));
  resumen.envio.textContent = formatearPrecio(Number(totales.envio));
  resumen.total.textContent = formatearPrecio(Number(totales.total));
}
