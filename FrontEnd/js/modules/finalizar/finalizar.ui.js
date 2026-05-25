
export function renderResumenCheckout(carrito) {
  if (!carrito || carrito.length === 0) {
    return `
      <p>No hay productos en el carrito.</p>
    `;
  }

  let subtotal = 0;

  const productosHTML = carrito
    .map((producto) => {
      const subtotalProducto =
        producto.precio * producto.cantidad;

      subtotal += subtotalProducto;

      return `
        <div class="checkout-producto">
          <div>
            <h4>${producto.nombre}</h4>

            <p>
              Cantidad: ${producto.cantidad}
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
  `;
}