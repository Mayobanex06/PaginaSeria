let productos = [];

function obtenerEstadoProductos(producto) {
  if (producto.estado === 0) {
    return { texto: "Inactivo", clase: "estado-bajo" };
  }

  if (producto.stock <= 3) {
    return { texto: "Bajo", clase: "estado-bajo" };
  }

  return { texto: "Activo", clase: "estado-activo" };
}

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

function listarTablaProductos(lista) {
  const contenedor = document.getElementById("adminTablaProductos");

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

async function renderizarProductos() {
  try {
    const response = await fetch(API2 + "/api/admin/productos", {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "No se pudieron mostrar los productos");
    }

    productos = data.productos;
    listarTablaProductos(productos);
  } catch (error) {
    console.error("Error renderizando productos", error);
  }
}

function aplicarFiltros() {
  const inputBusqueda = document.getElementById("adminSearch");
  const selectMarca = document.getElementById("adminMarca");

  if (!inputBusqueda || !selectMarca) {
    console.error("No se encontró #adminSearch o #adminMarca");
    return;
  }

  const textoBusqueda = inputBusqueda.value.trim().toLowerCase();
  const marcaSeleccionada = selectMarca.value;

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(textoBusqueda);

    const coincideMarca =
      marcaSeleccionada === "todas" || producto.marca === marcaSeleccionada;

    return coincideNombre && coincideMarca;
  });

  listarTablaProductos(productosFiltrados);
}

function inicializarFiltros() {
  const inputBusqueda = document.getElementById("adminSearch");
  const selectMarca = document.getElementById("adminMarca");

  if (!inputBusqueda || !selectMarca) {
    console.error("No se encontró #adminSearch o #adminMarca");
    return;
  }

  inputBusqueda.addEventListener("input", aplicarFiltros);
  selectMarca.addEventListener("change", aplicarFiltros);
}

async function desactivarProducto(id) {
  try {
    const response = await fetch(API2 + `/api/admin/producto/${id}/inactivar`, {
      method: "PATCH",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "No se pudo desactivar el producto");
    }

    await cargarResumenAdmin();
    await renderizarProductos();
    aplicarFiltros();
  } catch (error) {
    console.error("Error al desactivar el producto", error);
  }
}

function inicializarEliminarProductos() {
  document.addEventListener("click", async (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar");

    if (!btnEliminar) return;

    const id = btnEliminar.dataset.id;

    const confirmar = confirm(
      "¿Está seguro de que quiere eliminar este producto?",
    );

    if (!confirmar) return;

    await desactivarProducto(id);
  });
}

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

document.addEventListener("click", async (e) => {
  const btnEditarProducto = e.target.closest(".btn-editar");

  if (btnEditarProducto) {
    const id = btnEditarProducto.dataset.id;

    const producto = productos.find((p) => p.id == id);

    if (!producto) {
      alert("Producto no encontrado");
      return;
    }

    abrirModal(crearModalEditarProducto(producto));
  }
});
