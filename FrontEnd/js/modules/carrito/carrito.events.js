import {
  agregarProducto,
  eliminarProducto,
  actualizarCantidad,
} from "../../services/carrito.services.js";

export function registrarEventosCarrito({
  carritoLista,
  obtenerEstado,
  recargarCarrito,
}) {
  carritoLista.addEventListener("click", async (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar");
    const btnSumar = e.target.closest(".btn-sumar");
    const btnRestar = e.target.closest(".btn-restar");

    if (!btnEliminar && !btnSumar && !btnRestar) return;

    const btn = btnEliminar || btnSumar || btnRestar;
    const productoId = btn.dataset.productoId;

    try {
      if (btnEliminar) {
        await eliminarProducto(productoId);
      }

      if (btnSumar) {
        await agregarProducto(productoId);
      }

      if (btnRestar) {
        const carrito = obtenerEstado();

        const item = carrito.find(
          (i) => Number(i.producto_id) === Number(productoId),
        );

        if (!item) {
          console.error("El item no existe");
          return;
        }

        if (item.cantidad > 1) {
          await actualizarCantidad(productoId, item.cantidad - 1);
        } else {
          await eliminarProducto(productoId);
        }
      }

      await recargarCarrito();
    } catch (error) {
      console.error("ERROR ACCIÓN CARRITO >>>", error);
    }
  });
}
