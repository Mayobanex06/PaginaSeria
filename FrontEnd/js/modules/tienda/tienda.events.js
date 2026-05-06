import { mostrarToast } from "./tienda.ui.js";
import { agregarProducto } from "../../services/carrito.services.js";

export function registrarEventosTienda(contenedor) {
  if (!contenedor) {
    console.error(
      "No se encontró el contenedor de productos para registrar eventos",
    );
    return;
  }

  contenedor.addEventListener("click", async (e) => {
    const btnAgregarCarrito = e.target.closest(".btn-carrito");

    if (!btnAgregarCarrito) return;

    const productoId = btnAgregarCarrito.dataset.productoId;

    try {
      await agregarProducto(productoId);
      mostrarToast("Producto agregado al carrito");
      btnAgregarCarrito.textContent = "Agregado";
      btnAgregarCarrito.disabled = true;
      setTimeout(() => {
        btnAgregarCarrito.textContent = "Agregar al carrito";
        btnAgregarCarrito.disabled = false;
      }, 1200);
    } catch (error) {
      btnAgregarCarrito.disabled = false;
      console.error("Error al agregar el producto al carrito:", error);
      mostrarToast("Error al agregar el producto al carrito");
    }
  });
}

export function registrarEventosFiltroCategorias({ categorias, onFiltrar }) {
  categorias.forEach((cat) => {
    cat.addEventListener("click", () => {
      categorias.forEach((c) => c.classList.remove("categoria-activa"));
      cat.classList.add("categoria-activa");

      const categoriaSeleccionada = cat.dataset.categoria;
      onFiltrar(categoriaSeleccionada);
    });
  });
}
