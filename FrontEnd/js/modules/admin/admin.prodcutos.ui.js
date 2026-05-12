function crearFilaProducto(producto) {
  const estado = obtenerEstadoProductos(producto);

  return `
    <div class="admin-tabla-row">
      <span>#${String(producto.id).padStart(3, "0")}</span>
      <span>${producto.nombre}</span>
      <span>${producto.marca}</span>
      <span>RD$${Number(producto.precio).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</span>
      <span>${producto.stock}</span>
      <span class="${estado.clase}">${estado.texto}</span>

      <div class="admin-tabla-acciones">
        <button type="button" data-id="${producto.id}" class="btn-editar">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button type="button" data-id="${producto.id}" class="btn-eliminar">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

function listarVaciaProductos() {
  return `<div class="admin-tabla-row">
        <span>-</span>
        <span>No hay productos</span>
        <span>-</span>
        <span>-</span>
        <span>-</span>
        <span>-</span>
        <div class="admin-tabla-acciones"></div>
      </div>
    `;
}
