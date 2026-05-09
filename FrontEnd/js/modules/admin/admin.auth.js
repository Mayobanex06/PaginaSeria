import { obtenerUsuarioActual } from "../../services/admin.services.js";

export async function verificarAdmin() {
  try {
    const user = await obtenerUsuarioActual();

    if (!user.ok || user.user.rol !== "Admin") {
      console.log("Acceso denegado, no es un usuario admin");
      return false;
    }

    console.log("Acceso permitido, ande tranquilo");
    return true;
  } catch (error) {
    console.error("Error al validar rol del usuario", error);
    return false;
  }
}
