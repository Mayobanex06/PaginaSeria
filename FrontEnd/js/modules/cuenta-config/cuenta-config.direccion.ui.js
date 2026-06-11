import { escaparHTML } from "../../utils/sanitizar.js";

export function crearUIDireccion(dataDireccion){
    return `<div class="configuracion-panel-header">

    <div>
      <h2>Dirección de envío</h2>
      <p>Esta dirección será utilizada para recibir tus pedidos.</p>
    </div>

    <div class="configuracion-avatar">
      <i class="fa-solid fa-location-dot"></i>
    </div>

  </div>

  <form class="configuracion-form" id="form-direccion">

    <div class="configuracion-grid">

      <label class="campo">
        <span class="campo-label">Nombre de quien recibe</span>
        <input
          id="nombreRe
ceptor"
          class="campo-input"
          type="text"
          placeholder="Nombre completo"
          value="${escaparHTML(dataDireccion.nombreReceptor)}"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Teléfono</span>
        <input
          id="telefonoReceptor"
          class="campo-input"
          type="text"
          placeholder="809-000-0000"
          value="${escaparHTML(dataDireccion.telefono)}"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Provincia</span>
        <input
          id="provincia"
          class="campo-input"
          type="text"
          value="${escaparHTML(dataDireccion.provincia)}"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Municipio</span>
        <input
          id="municipio"
          class="campo-input"
          type="text"
          value="${escaparHTML(dataDireccion.municipio)}"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Sector</span>
        <input
          id="sector"
          class="campo-input"
          type="text"
          value="${escaparHTML(dataDireccion.sector)}"
        />
      </label>

      <label class="campo">
        <span class="campo-label">Código Postal</span>
        <input
          id="codigoPostal"
          class="campo-input"
          type="text"
          placeholder="Opcional"
          value="${escaparHTML(dataDireccion.codigoPostal)}"
        />
      </label>

    </div>

    <label class="campo configuracion-full">

      <span class="campo-label">Dirección detallada</span>

      <textarea
        id="direccion"
        class="campo-input configuracion-textarea"
        placeholder="Calle, casa, apartamento..."
        value="${escaparHTML(dataDireccion.direccion)}"
      ></textarea>

    </label>

    <label class="campo configuracion-full">

      <span class="campo-label">Referencia</span>

      <textarea
        id="referencia"
        class="campo-input configuracion-textarea"
        placeholder="Punto de referencia para encontrar la dirección"
        value="${escaparHTML(dataDireccion.referencia)}"
      ></textarea>

    </label>

    <div class="configuracion-acciones">
      <button
        type="submit"
        class="btn-config-principal"
      >
        Guardar dirección
      </button>
    </div>

  </form>
`;
}

export function renderizarDireccion(contenedor, data){
    if (!contenedor) {
        console.error("No existe el contenedor para el perfil");
        return;
    }

    contenedor.innerHTML = crearUIDireccion(data);
}