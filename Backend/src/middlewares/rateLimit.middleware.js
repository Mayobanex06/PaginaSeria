const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error:
      "Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde.",
  },
});

const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Demasiados intentos de registro. Intenta de nuevo más tarde.",
  },
});

module.exports = {
  loginLimiter,
  registerLimiter,
};
