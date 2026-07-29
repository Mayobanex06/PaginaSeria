import { actualizarPerfil, cambiarPassword } from "../../services/cuenta-config.services.js";

export function registrarEventosCuentaConfig({ botones, onNavegar }) {
  botones.forEach((boton) => {
    boton.addEventListener("click", async () => {
      const seccion = boton.dataset.seccion;
      await onNavegar(seccion);
    });
  });
}

export function registrarActualizarPerfil(formulario, inputs){

  formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const datos = {
      nombre: inputs.inputNombre.value.trim(),
      email: inputs.inputEmail.value.trim(),
      rol: inputs.inputRol.value.trim(),
    }

    await actualizarPerfil(datos);

  })

}

export function registrarCambiarPassword(formulario, inputs){

  formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const datos = {
      passwordActual: inputs.inputActualPassword.value,
      passwordNueva: inputs.inputNuevaPassword.value
    }

    await cambiarPassword(datos);

  })

}