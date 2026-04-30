let usuarios = [];

function obtenerEstadoUsuarios(usuario) {
  if (usuario.estado === 0) {
    return { texto: "Inactivo", clase: "estado-bajo" };
  }

  return { texto: "Activo", clase: "estado-activo" };
}

function crearFilaUsuario(usuario) {
  const estado = obtenerEstadoUsuarios(usuario);

  return `
    <div class="admin-tabla-row admin-tabla-row-usuarios">
      <span>#${String(usuario.id).padStart(3, "0")}</span>
      <span>${usuario.nombre}</span>
      <span>${usuario.email}</span>
      <span>${usuario.rol}</span>
      <span class="${estado.clase}">${estado.texto}</span>

      <div class="admin-tabla-acciones">
        <button type="button" data-id="${usuario.id}" class="btn-editar-usuario">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button type="button" data-id="${usuario.id}" class="btn-eliminar-usuario">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

function listarTablaUsuarios(lista) {
  const contenedor = document.getElementById("adminTablaUsuarios");

  if (!contenedor) {
    console.error("No existe #adminTablaUsuarios");
    return;
  }

  if (lista.length === 0) {
    contenedor.innerHTML = `      
        <div class="admin-tabla-row">
        <span>-</span>
        <span>No hay usuarios</span>
        <span>-</span>
        <span>-</span>
        <span>-</span>
        <span>-</span>
        <div class="admin-tabla-acciones"></div>
      </div>`;
    return;
  }

  contenedor.innerHTML = lista.map(crearFilaUsuario).join("");
}

async function renderizarUsuarios() {
  try {
    const response = await fetch(API2 + "/api/admin/usuarios/obtener", {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Error al cargar usuarios");
    }

    usuarios = data.usuarios;

    listarTablaUsuarios(usuarios);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
}

async function desactivarUsuario(id) {
  try {
    const response = await fetch(
      API2 + `/api/admin/usuarios/${id}/desactivar`,
      {
        method: "PATCH",
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Error al desactivar usuario");
    }

    await cargarResumenAdmin();
    await renderizarUsuarios();
  } catch (error) {
    console.error("Error al desactivar usuario", error);
  }
}

function inicializarEliminarUsuario() {
  document.addEventListener("click", async (e) => {
    const btnEliminar = e.target.closest(".btn-eliminar-usuario");

    if (!btnEliminar) return;

    const id = btnEliminar.dataset.id;

    const confirmar = confirm(
      "¿Está seguro de que quiere eliminar este usuario?",
    );

    if (!confirmar) return;

    await desactivarUsuario(id);
  });
}

function crearModalEditarUsuario(usuario) {
  return `
    <div class="modal-header">
      <h2>Editar usuario</h2>
      <button class="modal-cerrar">&times;</button>
    </div>

    <form id="formEditarUsuario" class="modal-form" data-id="${usuario.id}">
      
      <label>
        Nombre
        <input type="text" name="nombre" value="${usuario.nombre}" required>
      </label>

      <label>
        Email
        <input type="email" name="email" value="${usuario.email}" required>
      </label>

      <label>
        Rol
        <select name="rol" required>
          <option value="Admin" ${usuario.rol === "Admin" ? "selected" : ""}>Admin</option>
          <option value="User" ${usuario.rol === "User" ? "selected" : ""}>User</option>
        </select>
      </label>

      <label>
        Estado
        <select name="estado" required>
          <option value="1" ${usuario.estado == 1 ? "selected" : ""}>Activo</option>
          <option value="0" ${usuario.estado == 0 ? "selected" : ""}>Inactivo</option>
        </select>
      </label>

      <div class="modal-acciones">
        <button type="button" id="cancelarModalEditar">Cancelar</button>
        <button type="submit">Guardar cambios</button>
      </div>

    </form>
  `;
}

document.addEventListener("click", async (e) => {
  const btnEditarUsuario = e.target.closest(".btn-editar-usuario");

  if (btnEditarUsuario) {
    const id = btnEditarUsuario.dataset.id;

    const usuario = usuarios.find((u) => u.id == id);

    if (!usuario) {
      alert("Usuario no encontrado");
      return;
    }

    abrirModal(crearModalEditarUsuario(usuario));
  }
});
