const COOKIE_NAME = "sid";

function authMiddleware(sessions) {
  return (req, res, next) => {
    const sid = req.cookies[COOKIE_NAME];

    if (!sid || !sessions[sid]) {
      return res.status(401).json({ error: "No autentificado" });
    }

    if (Date.now() > sessions[sid].expiresAt) {
      delete sessions[sid];
      return res.status(401).json({ error: "Sesion expirada" });
    }

    req.userId = sessions[sid].id_usuario;
    next();
  };
}

module.exports = authMiddleware;
