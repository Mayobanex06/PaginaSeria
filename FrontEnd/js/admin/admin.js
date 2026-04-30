async function iniciarAdmin() {
  const accesoPermitido = await verificarAdmin();

  if (!accesoPermitido) {
    window.location.href = "login.html";
    return;
  }

  await cargarResumenAdmin();

  inicializarNavegacionAdmin();

  inicializarFiltros();
  inicializarEliminarProductos();
  inicializarEliminarUsuario();
}

async function cargarResumenAdmin() {
  try {
    const response = await fetch(API2 + "/api/admin/resumen", {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "No se pudo cargar el resumen del admin");
    }

    document.getElementById("totalProductos").textContent =
      data.resumen.totalProductos;

    document.getElementById("usuariosActivos").textContent =
      data.resumen.usuariosActivos;

    document.getElementById("ordenesHoy").textContent = data.resumen.ordenesHoy;

    document.getElementById("stockBajo").textContent = data.resumen.stockBajo;
  } catch (error) {
    console.error("ERROR CARGANDO RESUMEN ADMIN >>>", error);
  }
}

function inicializarNavegacionAdmin() {
  const botones = document.querySelectorAll(".admin-opcion");
  const botonesPanelInicial = document.querySelectorAll(
    ".panel-inicial-acciones button",
  );
  const secciones = document.querySelectorAll(".admin-panel-seccion");

  function mostrarSeccion(seccion) {
    botones.forEach((btn) => btn.classList.remove("admin-opcion-activa"));

    const botonActivo = document.querySelector(
      `.admin-opcion[data-seccion="${seccion}"]`,
    );

    if (botonActivo) {
      botonActivo.classList.add("admin-opcion-activa");
    }

    secciones.forEach((panel) => panel.classList.add("oculto"));

    document.getElementById(`panel-${seccion}`)?.classList.remove("oculto");

    if (seccion === "productos") {
      renderizarProductos();
    }

    if (seccion === "usuarios") {
      renderizarUsuarios();
    }
  }

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      mostrarSeccion(boton.dataset.seccion);
    });
  });

  botonesPanelInicial.forEach((boton) => {
    boton.addEventListener("click", () => {
      mostrarSeccion(boton.dataset.seccion);
    });
  });
}

function abrirModal(html) {
  const modal = document.querySelector("#modalAdmin");
  const modalContenido = modal.querySelector(".modal-contenido");

  modalContenido.innerHTML = html;
  modal.classList.remove("oculto");
}

function cerrarModal() {
  const modal = document.querySelector("#modalAdmin");
  modal.classList.add("oculto");
}

document.addEventListener("click", (e) => {
  if (
    e.target.closest(".modal-cerrar") ||
    e.target.id === "cancelarModalEditar"
  ) {
    cerrarModal();
  }
});

iniciarAdmin();
