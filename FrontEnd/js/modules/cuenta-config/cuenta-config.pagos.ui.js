import { escaparHTML } from "../../utils/sanitizar.js";

export function crearUIPagos(dataMetodosPago){
    return `<div class="configuracion-panel-header">

    <div>
      <h2>Método de pago</h2>
      <p>Selecciona el método que utilizarás al momento de realizar una compra.</p>
    </div>

    <div class="configuracion-avatar">
      <i class="fa-solid fa-credit-card"></i>
    </div>

  </div>

  <form class="configuracion-form" id="form-pago">

    <div class="configuracion-grid">

      <label class="campo">
        <span class="campo-label">Método de pago</span>

        <select
          id="metodoPago"
          class="campo-input"
        >
          <option value="paypal">PayPal</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="transferencia">Transferencia bancaria</option>
          value="${escaparHTML(dataMetodosPago.tipo)}"
        </select>

      </label>

      <label class="campo">
        <span class="campo-label">Titular</span>

        <input
          id="titular"
          class="campo-input"
          type="text"
          placeholder="Nombre del titular"
        />

      </label>

      <label class="campo">
        <span class="campo-label">Número de tarjeta</span>

        <input
          id="numeroTarjeta"
          class="campo-input"
          type="text"
          placeholder="**** **** **** ****"
        />

      </label>

      <label class="campo">
        <span class="campo-label">Fecha de expiración</span>

        <input
          id="expiracion"
          class="campo-input"
          type="month"
        />

      </label>

      <label class="campo">
        <span class="campo-label">CVV</span>

        <input
          id="cvv"
          class="campo-input"
          type="password"
          maxlength="4"
        />

      </label>

    </div>

    <div class="configuracion-acciones">

      <button
        type="submit"
        class="btn-config-principal"
      >
        Guardar método de pago
      </button>

    </div>

  </form>`;
}

export function renderizarPagos(contenedor, data){
    if (!contenedor) {
        console.error("No existe el contenedor para el perfil");
        return;
    }

    contenedor.innerHTML = crearUIPagos(data);
}