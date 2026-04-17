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

  return router;
};
