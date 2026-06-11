export function registrarEventosCuentaConfig({ botones, onNavegar }) {
  botones.forEach((boton) => {
    boton.addEventListener("click", async () => {
      const seccion = boton.dataset.seccion;
      await onNavegar(seccion);
    });
  });
}