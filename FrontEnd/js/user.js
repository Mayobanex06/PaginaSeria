import {
  obtenerSesionActual,
  usuarioEsAdmin,
  cerrarSesionActual,
} from "./modules/user/user.session.js";

import {
  crearTarjetaUsuarioActivo,
  crearTarjetaUsuarioInactivo,
  crearTarjetaUsuarioError,
  crearIconoAdmin,
} from "./modules/user/user.ui.js";

const userBtn = document.getElementById("userBtn");
const userCard = document.getElementById("userCard");
const headerIconos = document.querySelector(".header-iconos");

let usuarioCache = null;
let sesionCargada = false;

async function cargarSesion() {
  if (sesionCargada) {
    return usuarioCache;
  }

  try {
    usuarioCache = await obtenerSesionActual();
    sesionCargada = true;

    return usuarioCache;
  } catch (error) {
    console.error("ERROR CARGAR SESION >>>", error);
    throw error;
  }
}

async function cargarTarjetaUsuario() {
  if (!userCard) return;

  try {
    const user = await cargarSesion();

    if (!user) {
      userCard.innerHTML = crearTarjetaUsuarioInactivo();
      return;
    }

    userCard.innerHTML = crearTarjetaUsuarioActivo(user);
  } catch (error) {
    userCard.innerHTML = crearTarjetaUsuarioError();
  }
}

function registrarEventosUserCard() {
  if (!userCard) return;

  userCard.addEventListener("click", async (e) => {
    const logoutBtn = e.target.closest("#logoutBtn");
    const actionBtn = e.target.closest("[data-action]");

    if (logoutBtn) {
      await cerrarSesionActual();

      usuarioCache = null;
      sesionCargada = false;

      window.location.href = "login.html";
      return;
    }

    if (actionBtn?.dataset.action === "login") {
      window.location.href = "login.html";
      return;
    }

    if (actionBtn?.dataset.action === "register") {
      window.location.href = "register.html";
      return;
    }
  });
}

function registrarToggleTarjetaUsuario() {
  if (!userBtn || !userCard) return;

  userBtn.addEventListener("click", async () => {
    userCard.classList.toggle("oculto");

    if (!userCard.classList.contains("oculto")) {
      await cargarTarjetaUsuario();
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".user-menu")) {
      userCard.classList.add("oculto");
    }
  });
}

async function verificarAdmin() {
  try {
    const user = await cargarSesion();

    if (
      usuarioEsAdmin(user) &&
      headerIconos &&
      !headerIconos.querySelector(".admin-link")
    ) {
      headerIconos.insertAdjacentHTML("beforeend", crearIconoAdmin());
    }
  } catch (error) {
    return;
  }
}

registrarToggleTarjetaUsuario();
registrarEventosUserCard();
verificarAdmin();
