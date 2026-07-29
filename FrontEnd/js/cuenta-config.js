import { mostrarPanelCuentaConfig } from "./modules/cuenta-config/cuenta-config.navigation.js";
import { registrarEventosCuentaConfig} from "./modules/cuenta-config/cuenta-config.events.js";

const elementos = {
    botones: document.querySelectorAll(".configuracion-opcion"),
    contenedor: document.getElementById("panel-configuracion"),
}

registrarEventosCuentaConfig({
    botones: elementos.botones,
    onNavegar: async (seccion) => {
        await mostrarPanelCuentaConfig({
            seccion,
            contenedor: elementos.contenedor,
            botones: elementos.botones,
        });
    }
})

mostrarPanelCuentaConfig({
    seccion: "perfil",
    contenedor: elementos.contenedor,
    botones: elementos.botones,
});
