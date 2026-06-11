import {
  agregarProducto,
  eliminarProducto,
  actualizarCantidad,
  vaciarCarrito,
} from "../../services/carrito.services.js";

export function registrarEventosCarrito({
  carritoLista,
  vaciarCarritoBtn,
  obtenerEstado,
  recargarCarrito,
}) {
  carritoLista.addEventListener("click", async (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar");
    const btnSumar = e.target.closest(".btn-sumar");
    const btnRestar = e.target.closest(".btn-restar");

    if (!btnEliminar && !btnSumar && !btnRestar) return;

    const btn = btnEliminar || btnSumar || btnRestar;
    const productoId = Number(btn.dataset.productoId);

    if (!Number.isInteger(productoId) || productoId <= 0) {
      console.error("ID de producto inválido");
      return;
    }

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
          (i) => Number(i.producto_id) === productoId,
        );

        if (!item) {
          console.error("El item no existe");
          return;
        }

        const cantidadActual = Number(item.cantidad);

        if (cantidadActual > 1) {
          await actualizarCantidad(productoId, cantidadActual - 1);
        } else {
          await eliminarProducto(productoId);
        }
      }

      await recargarCarrito();
    } catch (error) {
      console.error("ERROR ACCIÓN CARRITO >>>", error);
    }
  });

  if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener("click", async () => {
      try {
        await vaciarCarrito();
        await recargarCarrito();
      } catch (error) {
        console.error("ERROR VACIAR CARRITO >>>", error);
      }
    });
  }
}