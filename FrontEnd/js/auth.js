import {
  registrarFormularioRegister,
  registrarFormularioLogin,
} from "./modules/auth/auth.events.js";

const mensaje = document.getElementById("mensaje");
const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");

registrarFormularioLogin(formLogin, mensaje);
registrarFormularioRegister(formRegister, mensaje);
