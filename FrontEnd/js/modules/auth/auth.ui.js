export function mostrarMensaje(elemento, mensaje) {
  if (!elemento) return;

  elemento.textContent = mensaje;
}
