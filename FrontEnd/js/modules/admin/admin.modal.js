function crearModalBase() {
  const modal = document.createElement("div");

  modal.id = "modalAdmin";
  modal.className = "modal-admin oculto";

  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-contenido"></div>
  `;

  document.body.appendChild(modal);

  return modal;
}

function obtenerModal() {
  return document.querySelector("#modalAdmin") || crearModalBase();
}

export function abrirModal(html) {
  const modal = obtenerModal();
  const modalContenido = modal.querySelector(".modal-contenido");

  modalContenido.innerHTML = html;
  modal.classList.remove("oculto");
}

export function cerrarModal() {
  const modal = document.querySelector("#modalAdmin");

  if (!modal) return;

  modal.classList.add("oculto");
}
