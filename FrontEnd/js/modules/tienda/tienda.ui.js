import { formatearPrecio } from "../../utils/formatters.js";
import { escaparHTML, obtenerRutaImagenSegura, obtenerRutaImagenRespaldo } from "../../utils/sanitizar.js";

function registrarFallbackImagenes(contenedor) {
  const imagenes = contenedor.querySelectorAll("img[data-imagen-respaldo]");

  imagenes.forEach((imagen) => {
    imagen.addEventListener(
      "error",
      () => {
        const respaldo = imagen.dataset.imagenRespaldo;

        if (imagen.src !== respaldo) {
          imagen.src = respaldo;
        }
      },
      { once: true },
    );
  });
}

export function crearTarjetaProductoTienda(producto) {
  const imagenSegura = obtenerRutaImagenSegura(producto.imagen);
  const imagenRespaldo = obtenerRutaImagenRespaldo();

  return `
    <div class="producto-card" data-categoria="${escaparHTML(producto.marca)}">
      <div class="producto-imagen">
        <img
          src="${imagenSegura}"
          alt="${escaparHTML(producto.marca)} ${escaparHTML(producto.nombre)}"
          data-imagen-respaldo="${imagenRespaldo}"
        />
      </div>

      <div class="producto-info">
        <p class="marca">${escaparHTML(producto.marca)}</p>
        <h3 class="nombre">${escaparHTML(producto.nombre)}</h3>
        <p class="precio">${formatearPrecio(Number(producto.precio))}</p>

        <div class="memorias">
          <button class="chip">256GB</button>
          <button class="chip">512GB</button>
        </div>

        <button class="btn-carrito" data-producto-id="${escaparHTML(Number(producto.id))}">Agregar al carrito</button>
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

  registrarFallbackImagenes(contenedor);
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
