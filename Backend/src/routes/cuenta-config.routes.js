const express = require("express");
const router = express.Router();

const cuentaConfigController = require("../controllers/cuenta-config.controller");

module.exports = (authMiddleware) => {

    router.get(
        "/perfil/obtener",
        authMiddleware,
        cuentaConfigController.obtenerPerfil
    );
    router.patch("/perfil/actualizar",
        authMiddleware,
        cuentaConfigController.actualizarPerfil
    )
    router.patch(
        "/perfil/cambiar-password",
        authMiddleware,
        cuentaConfigController.cambiarPassword
    )
    router.get(
        "/direccion/obtener",
        authMiddleware,
        cuentaConfigController.obtenerDireccion
    )
    router.post(
        "/direccion/agregar",
        authMiddleware,
        cuentaConfigController.agregarDireccion
    )

    return router; 
}