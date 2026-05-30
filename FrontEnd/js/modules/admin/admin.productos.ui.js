import { escaparHTML } from "../../utils/sanitizar.js";

export function obtenerEstadoProductos(producto) {
  const estado = Number(producto.estado);
  const stock = Number(producto.stock);

  if (estado === 0) {
    return { texto: "Inactivo", clase: "estado-bajo" };
  }

  if (stock <= 3) {
    return { texto: "Bajo", clase: "estado-bajo" };
  }

  return { texto: "Activo", clase: "estado-activo" };
}

export function crearFilaProducto(producto) {
  const estado = obtenerEstadoProductos(producto);
  const id = Number(producto.id);
  const precio = Number(producto.precio);
  const stock = Number(producto.stock);

  return `
    <div class="admin-tabla-row">
      <span>#${String(id).padStart(3, "0")}</span>
      <span>${escaparHTML(producto.nombre)}</span>
      <span>${escaparHTML(producto.marca)}</span>
      <span>RD$${precio.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</span>
      <span>${stock}</span>
      <span class="${estado.clase}">${estado.texto}</span>

      <div class="admin-tabla-acciones">
        <button type="button" data-id="${id}" class="btn-editar">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button type="button" data-id="${id}" class="btn-eliminar">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

export function listarTablaProductos(contenedor, lista) {
  if (!contenedor) {
    console.error("No existe #adminTablaProductos");
    return;
  }

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="admin-tabla-row">
        <span>-</span>
        <span>No hay productos</span>
        <span>-</span>
        <span>-</span>
        <span>-</span>
        <span>-</span>
        <div class="admin-tabla-acciones"></div>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = lista.map(crearFilaProducto).join("");
}

export function crearModalEditarProducto(producto) {
  const id = Number(producto.id);
  const precio = Number(producto.precio);
  const stock = Number(producto.stock);
  const estado = Number(producto.estado);

  return `
    <div class="modal-header">
      <h2>Editar producto</h2>
      <button class="modal-cerrar">&times;</button>
    </div>

    <form id="formEditarProducto" class="modal-form" data-id="${id}">
      <label>
        Nombre
        <input type="text" name="nombre" value="${escaparHTML(producto.nombre)}" required>
      </label>

      <label>
        Marca
        <input type="text" name="marca" value="${escaparHTML(producto.marca)}" required>
      </label>

      <label>
        Precio
        <input type="number" name="precio" value="${precio}" required>
      </label>

      <label>
        Stock
        <input type="number" name="stock" value="${stock}" required>
      </label>

      <label>
        Estado
        <select name="estado" required>
          <option value="1" ${estado === 1 ? "selected" : ""}>
            Activo
          </option>
          <option value="0" ${estado === 0 ? "selected" : ""}>
            Inactivo
          </option>
        </select>
      </label>

      <div class="modal-acciones">
        <button type="button" id="cancelarModalEditar">Cancelar</button>
        <button type="submit">Guardar cambios</button>
      </div>
    </form>
  `;
}
