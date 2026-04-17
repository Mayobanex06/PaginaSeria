const express = require("express");
const router = express.Router();

const tiendaController = require("../controllers/tienda.controller");

router.get("/productos", tiendaController.obtenerProductosTienda);

module.exports = router;
