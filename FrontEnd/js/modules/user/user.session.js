import { obtenerUsuario, cerrarSesion } from "../../services/user.services.js";

export async function obtenerSesionActual() {
  try {
    const data = await obtenerUsuario();
    return data.user;
  } catch (error) {
    if (error.status === 401) {
      return null;
    }
    console.error("ERROR OBTENER SESION >>>", error);
    throw error;
  }
}

export function usuarioEsAdmin(usuario) {
  return usuario?.rol === "Admin";
}

export async function cerrarSesionActual() {
  return await cerrarSesion();
}
