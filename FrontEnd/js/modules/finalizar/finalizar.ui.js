

export function renderResumenCheckout(carrito) {
  if (!carrito || carrito.length === 0) {
    return `
      <div class="checkout-vacio">
        <p>No hay productos en tu carrito.</p>

        <a href="tienda.html">
          Regresar a la tienda
        </a>
      </div>
    `;
  }

  let subtotal = 0;
  let cantidadTotal = 0;

  const productosHTML = carrito
    .map((item) => {
      const subtotalProducto =
        Number(item.precio) * Number(item.cantidad);

      subtotal += subtotalProducto;

      cantidadTotal += Number(item.cantidad);

      return `
        <div class="checkout-producto">
          <div>
            <h4>${item.nombre}</h4>

            <p>
              Cantidad: ${item.cantidad}
            </p>
          </div>

          <strong>
            ${formatearPrecio(subtotalProducto)}
          </strong>
        </div>
      `;
    })
    .join("");

  const envio = subtotal * 0.01;

  const total = subtotal + envio;

  return `
    <div class="checkout-productos">
      ${productosHTML}
    </div>

    <div class="checkout-totales">

      <div class="checkout-linea">
        <span>Productos</span>

        <strong>${cantidadTotal}</strong>
      </div>

      <div class="checkout-linea">
        <span>Subtotal</span>

        <strong>${formatearPrecio(subtotal)}</strong>
      </div>

      <div class="checkout-linea">
        <span>Envío</span>

        <strong>${formatearPrecio(envio)}</strong>
      </div>

      <div class="checkout-linea checkout-total">
        <span>Total</span>

        <strong>${formatearPrecio(total)}</strong>
      </div>

    </div>
  `;
}
