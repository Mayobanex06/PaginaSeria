const express = require("express");
const router = express.Router();

const carritoController = require("../controllers/carrito.controller");

module.exports = (authMiddleware) => {
  router.post("/agregar", authMiddleware, carritoController.agregarAlCarrito);
  router.get("/obtener", authMiddleware, carritoController.obtenerCarrito);
  router.delete(
    "/eliminar/:productoId",
    authMiddleware,
    carritoController.eliminarDelCarrito,
  );
  router.patch(
    "/actualizar-cantidad/:productoId",
    authMiddleware,
    carritoController.actualizarCantidad,
  );

  router.delete("/vaciar", authMiddleware, carritoController.vaciarCarrito);

  return router;
};
