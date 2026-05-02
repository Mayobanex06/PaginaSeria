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

async function cargarTarjetaUsuario() {
  try {
    const user = await obtenerSesionActual();

    if (!user) {
      userCard.innerHTML = crearTarjetaUsuarioInactivo();
      registrarEventosUsuarioInactivo();
      return;
    }

    userCard.innerHTML = crearTarjetaUsuarioActivo(user);
    registrarEventoLogout();
  } catch (error) {
    userCard.innerHTML = crearTarjetaUsuarioError();
  }
}

function registrarEventoLogout() {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", async () => {
    await cerrarSesionActual();
    window.location.href = "login.html";
  });
}

function registrarEventosUsuarioInactivo() {
  userCard.addEventListener("click", (e) => {
    const action = e.target.dataset.action;

    if (action === "login") {
      window.location.href = "login.html";
    }

    if (action === "register") {
      window.location.href = "register.html";
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
    const user = await obtenerSesionActual();

    if (usuarioEsAdmin(user) && headerIconos) {
      headerIconos.insertAdjacentHTML("beforeend", crearIconoAdmin());
    }
  } catch (error) {
    return;
  }
}

registrarToggleTarjetaUsuario();
verificarAdmin();
