import { escaparHTML } from "../../utils/sanitizar.js";

export function crearUIPerfil(dataPerfil){
    return `
  <div class="configuracion-panel-header">
    <div>
      <h2>Información personal</h2>
      <p>Actualiza los datos principales de tu cuenta.</p>
    </div>

    <div class="configuracion-avatar">
      <i class="fa-solid fa-user"></i>
    </div>
  </div>

  <form class="configuracion-form" id="form-perfil">

    <div class="configuracion-grid">

      <label class="campo">
        <span class="campo-label">Nombre</span>
        <input
          id="input-nombre"
          type="text"
          class="campo-input"
          placeholder="Tu nombre"
          value="${escaparHTML(dataPerfil.nombre)}"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Correo electrónico</span>
        <input
          id="input-email"
          type="email"
          class="campo-input"
          placeholder="tucorreo@ejemplo.com"
          value="${escaparHTML(dataPerfil.email)}"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Teléfono</span>
        <input
          id="input-telefono"
          type="tel"
          class="campo-input"
          placeholder="829-000-0000"
          value="${escaparHTML(dataPerfil.telefono)}"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Rol</span>
        <input
          id="input-rol"
          type="text"
          class="campo-input"
          placeholder="User"
          value="${escaparHTML(dataPerfil.rol)}"
          disabled
        />
      </label>

    </div>`;
}

export function renderizarPerfil(contenedor, data){
    if (!contenedor) {
        console.error("No existe el contenedor para el perfil");
        return;
    }

    contenedor.innerHTML = crearUIPerfil(data);
}