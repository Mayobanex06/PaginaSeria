import { escaparHTML } from "../../utils/sanitizar.js";

export function crearTarjetaUsuarioActivo(data) {
  return `
      <h4>Mi cuenta</h4>
      <p><strong>Nombre:</strong> ${escaparHTML(data.nombre)}</p>
      <p><strong>Correo:</strong> ${escaparHTML(data.email)}</p>
      <p><strong>Rol:</strong> ${escaparHTML(data.rol)}</p>
      <button class="btn-user-sec" data-action="configuration">Ajustes</button>
      <button class="btn-user" id="logoutBtn">Cerrar sesión</button>
    `;
}

export function crearTarjetaUsuarioInactivo() {
  return `
        <h4>Mi cuenta</h4>
        <p>No has iniciado sesión.</p>
        <button class="btn-user" data-action="login">Iniciar sesión</button>
        <button class="btn-user-sec" data-action="register">Registrarse</button>
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
