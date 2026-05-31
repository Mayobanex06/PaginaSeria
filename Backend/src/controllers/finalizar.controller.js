import pool from "../config/db.js";

export async function finalizarCompra(req, res) {
    const usuarioId = req.userId;


    const {
        direccion,
        telefono,
        metodoPago,
        nota,
    } = req.body;
}