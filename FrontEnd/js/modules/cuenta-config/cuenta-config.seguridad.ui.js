export function crearUISeguridad(){
    return `<div class="configuracion-panel-header">
    <div>
      <h2>Seguridad</h2>
      <p>Administra la contraseña de tu cuenta.</p>
    </div>

    <div class="configuracion-avatar">
      <i class="fa-solid fa-lock"></i>
    </div>
  </div>

  <form class="configuracion-form" id="form-seguridad">

    <div class="configuracion-grid">

      <label class="campo">
        <span class="campo-label">Contraseña actual</span>
        <input
          id="passwordActual"
          type="password"
          class="campo-input"
          placeholder="••••••••"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Nueva contraseña</span>
        <input
          id="passwordNueva"
          type="password"
          class="campo-input"
          placeholder="••••••••"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Confirmar contraseña</span>
        <input
          id="passwordConfirmacion"
          type="password"
          class="campo-input"
          placeholder="••••••••"
        />
      </label>

    </div>

    <div class="configuracion-acciones">
      <button type="submit" class="btn-config-principal">
        Actualizar contraseña
      </button>
    </div>

  </form>`;
}

export function renderizarSeguridad(contenedor){
    if (!contenedor) {
        console.error("No existe el contenedor para el perfil");
        return;
    }

    contenedor.innerHTML = crearUISeguridad();
}