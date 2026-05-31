import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
    finalizarCompra,
} from "../controllers/finalizar.controller.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    finalizarCompra,
);

export default router;