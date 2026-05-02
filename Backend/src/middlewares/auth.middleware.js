const COOKIE_NAME = "sid";

function authMiddleware(sessions) {
  return (req, res, next) => {
    const sid = req.cookies[COOKIE_NAME];

    if (!sid || !sessions[sid]) {
      return res.status(401).json({
        ok: false,
        error: "No autenticado",
      });
    }

    if (Date.now() > sessions[sid].expiresAt) {
      delete sessions[sid];

      return res.status(401).json({
        ok: false,
        error: "Sesión expirada",
      });
    }

    req.userId = sessions[sid].id_usuario;
    next();
  };
}

module.exports = authMiddleware;
