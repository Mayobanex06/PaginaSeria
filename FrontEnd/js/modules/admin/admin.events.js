export function registrarEventosNavegacion({
  botones,
  botonesPanelPrincipal,
  onNavegar,
}) {
  function manejarBoton(boton) {
    const seccion = boton.dataset.seccion;

    onNavegar(seccion);
  }

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      manejarBoton(boton);
    });
  });

  botonesPanelPrincipal.forEach((boton) => {
    boton.addEventListener("click", () => {
      manejarBoton(boton);
    });
  });
}

export function registrarEventoCerrarModal({ cerrarModal }) {
  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".modal-cerrar") ||
      e.target.id === "cancelarModalEditar" ||
      e.target.classList.contains("modal-overlay")
    ) {
      cerrarModal();
    }
  });
}
