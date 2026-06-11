const METODOS_SEGUROS = ["GET", "HEAD", "OPTIONS"];

function validarOrigen(req, res, next) {
  if (METODOS_SEGUROS.includes(req.method)) {
    return next();
  }

  const origenPermitido = process.env.FRONTEND_ORIGIN;
  const origenRecibido = req.get("origin");

  if (!origenRecibido || origenRecibido !== origenPermitido) {
    return res.status(403).json({
      ok: false,
      error: "Origen no autorizado",
    });
  }

  next();
}

module.exports = validarOrigen;