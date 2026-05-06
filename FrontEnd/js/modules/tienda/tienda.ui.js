import { formatearPrecio } from "../../utils/formatters.js";

export function crearTarjetaProductoTienda(producto) {
  return `
    <div class="producto-card" data-categoria="${producto.marca}">
      <div class="producto-imagen">
        <img
          src="${producto.imagen}"
          alt="${producto.marca} ${producto.nombre}"
        />
      </div>

      <div class="producto-info">
        <p class="marca">${producto.marca}</p>
        <h3 class="nombre">${producto.nombre}</h3>
        <p class="precio">${formatearPrecio(producto.precio)}</p>

        <div class="memorias">
          <button class="chip">256GB</button>
          <button class="chip">512GB</button>
        </div>

        <button class="btn-carrito" data-producto-id="${producto.id}">Agregar al carrito</button>
      </div>
    </div>
  `;
}

export function renderProductos(lista, contenedor) {
  if (!contenedor) {
    console.error("No se encontró el contenedor de productos");
    return;
  }

  contenedor.innerHTML = lista
    .map((producto) => crearTarjetaProductoTienda(producto))
    .join("");
}

export function mostrarToast(mensaje, tipo = "success") {
  const toast = document.createElement("div");
  toast.classList.add("toast", `toast-${tipo}`);
  toast.textContent = mensaje;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("visible");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}
