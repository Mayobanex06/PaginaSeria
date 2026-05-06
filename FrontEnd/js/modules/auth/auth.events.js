import { loginUser, registerUser } from "../../services/auth.services.js";
import { mostrarMensaje } from "./auth.ui.js";

export function registrarFormularioLogin(form, mensaje) {
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await loginUser({
        email: form.email.value.trim(),
        password: form.password.value,
      });

      window.location.href = "index.html";
    } catch (error) {
      console.error("Error en la autenticación:", error);
      mostrarMensaje(
        mensaje,
        error.message || "Ocurrió un error. Inténtalo de nuevo.",
      );
    }
  });
}

export function registrarFormularioRegister(form, mensaje) {
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        nombre: form.nombre.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value,
      });

      window.location.href = "login.html";
    } catch (error) {
      console.error("Error en el registro:", error);
      mostrarMensaje(
        mensaje,
        error.message || "Ocurrió un error. Inténtalo de nuevo.",
      );
    }
  });
}
