export function crearTarjetaUsuarioActivo(data) {
  return `
      <h4>Mi cuenta</h4>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Correo:</strong> ${data.email}</p>
      <p><strong>Rol:</strong> ${data.rol}</p>
      <button class="btn-user" id="logoutBtn">Cerrar sesión</button>
    `;
}

export function crearTarjetaUsuarioInactivo() {
  return `
        <h4>Mi cuenta</h4>
        <p>No has iniciado sesión.</p>
        <button class="btn-user" onclick="window.location.href='login.html'">Iniciar sesión</button>
        <button class="btn-user-sec" onclick="window.location.href='register.html'">Registrarse</button>
    `;
}

export function crearTarjetaUsuarioError() {
  return `
      <h4>Mi cuenta</h4>
      <p>Error al cargar la información.</p>
    `;
}

export function crearIconoAdmin() {
  return `
    <a href="admin.html" class="admin-link">
      <i class="fa-solid fa-gear"></i>
    </a>
  `;
}
