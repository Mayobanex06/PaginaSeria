import { obtenerPerfil, obtenerDireccion, obtenerMetodosPago } from "../../services/cuenta-config.services.js";

import { renderizarPerfil } from "./cuenta-config.perfil.ui.js";
import { renderizarDireccion } from "./cuenta-config.direccion.ui.js";
import { renderizarPagos } from "./cuenta-config.pagos.ui.js";
import { renderizarSeguridad } from "./cuenta-config.seguridad.ui.js";
import { registrarActualizarPerfil } from "./cuenta-config.events.js";

export async function mostrarPanelCuentaConfig({seccion, contenedor, botones}){
    botones.forEach((boton) => {
        boton.classList.remove("configuracion-opcion-activa");
    })

    const botonActivo = Array.from(botones).find((boton) => boton.dataset.seccion === seccion)

    botonActivo?.classList.add("configuracion-opcion-activa");

    if (seccion === "perfil") {
        const perfil = await obtenerPerfil();
        renderizarPerfil(contenedor, perfil.perfil);

        const formulario = document.getElementById("form-perfil");
        const inputs = {
            inputNombre: formulario.querySelector("#input-nombre"),
            inputEmail: formulario.querySelector("#input-email"),
            inputRol: formulario.querySelector("#input-rol"),
        };

        registrarActualizarPerfil(formulario, inputs);
        
        return;
    }

    if (seccion === "direccion") {
        const direccion = await obtenerDireccion();
        renderizarDireccion(contenedor, direccion.direccion);
        return;
    }

    if (seccion === "pagos") {
        const pagos = await obtenerMetodosPago();
        renderizarPagos(contenedor, pagos);
        return;
    }

    if (seccion === "seguridad") {
        renderizarSeguridad(contenedor);
        return;
    }

}