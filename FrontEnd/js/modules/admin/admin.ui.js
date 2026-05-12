function crearModalEditarProducto(producto) {
  return `
    <div class="modal-header">
      <h2>Editar producto</h2>
      <button class="modal-cerrar">&times;</button>
    </div>

    <form id="formEditarProducto" class="modal-form" data-id="${producto.id}">
      
      <label>
        Nombre
        <input type="text" name="nombre" value="${producto.nombre}" required>
      </label>

      <label>
        Marca
        <input type="text" name="marca" value="${producto.marca}" required>
      </label>

      <label>
        Precio
        <input type="number" name="precio" value="${producto.precio}" required>
      </label>

      <label>
        Stock
        <input type="number" name="stock" value="${producto.stock}" required>
      </label>

      <div class="modal-acciones">
        <button type="button" id="cancelarModalEditar">Cancelar</button>
        <button type="submit">Guardar cambios</button>
      </div>

    </form>
  `;
}
