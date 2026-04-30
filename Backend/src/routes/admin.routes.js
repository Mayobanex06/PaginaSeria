const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");

module.exports = (authMiddleware, adminMiddleware) => {
  router.get("/", authMiddleware, adminMiddleware, adminController.accesoAdmin);
  router.get(
    "/productos",
    authMiddleware,
    adminMiddleware,
    adminController.obtenerProductosAdmin,
  );
  router.get(
    "/resumen",
    authMiddleware,
    adminMiddleware,
    adminController.resumenAdmin,
  );
  router.patch(
    "/producto/:id/inactivar",
    authMiddleware,
    adminMiddleware,
    adminController.inactivarProducto,
  );
  router.put(
    "/productos/:id",
    authMiddleware,
    adminMiddleware,
    adminController.editarProducto,
  );

  router.get(
    "/usuarios/obtener",
    authMiddleware,
    adminMiddleware,
    adminController.obtenerUsuario,
  );

  router.post(
    "/usuarios/agregar",
    authMiddleware,
    adminMiddleware,
    adminController.agregarUsuario,
  );

  router.put(
    "/usuarios/:id",
    authMiddleware,
    adminMiddleware,
    adminController.editarUsuario,
  );

  router.patch(
    "/usuarios/:id/desactivar",
    authMiddleware,
    adminMiddleware,
    adminController.eliminarUsuario,
  );

  return router;
};
