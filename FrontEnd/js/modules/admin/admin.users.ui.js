export function obtenerEstadoUsuario(usuario) {
  if (usuario.estado === 0) {
    return { texto: "Inactivo", clase: "estado-bajo" };
  }

  return { texto: "Activo", clase: "estado-activo" };
}

export function crearFilaUsuarios(usuario) {
  const estado = obtenerEstadoUsuario(usuario);

  return `<div class="admin-tabla-row admin-tabla-row-usuarios">
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

export function listarTablaUsuarios(contenedor, lista) {
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
      </div>
    `;
    return;
  }

  contenedor.innerHTML = lista.map(crearFilaUsuarios).join("");
}

export function crearModalEditarUsuario(usuario) {
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
        <input type="text" name="email" value="${usuario.email}" required>
      </label>

      <label>
        Rol
        <select name="rol" required>
    <option value="User" ${usuario.rol === "User" ? "selected" : ""}>
      User
    </option>

    <option value="Admin" ${usuario.rol === "Admin" ? "selected" : ""}>
      Admin
    </option>
      </select>
      </label>  

      <label>
  Estado

  <select name="estado" required>
    <option value="1" ${Number(usuario.estado) === 1 ? "selected" : ""}>
      Activo
    </option>

    <option value="0" ${Number(usuario.estado) === 0 ? "selected" : ""}>
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
