export function abrirModal(html) {
  const modal = document.querySelector("#modalAdmin");
  const modalContenido = modal.querySelector(".modal-contenido");
  modalContenido.innerHTML = html;
  modal.classList.remove("oculto");
}

export function cerrarModal() {
  const modal = document.querySelector("#modalAdmin");
  modal.classList.add("oculto");
}
