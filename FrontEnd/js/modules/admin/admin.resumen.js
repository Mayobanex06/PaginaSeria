import { obtenerResumenAdmin } from "../../services/admin.services.js";

export async function cargarResumenAdmin() {
  try {
    const data = await obtenerResumenAdmin();

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
