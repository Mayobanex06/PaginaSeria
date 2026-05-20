const express = require("express");
const router = express.Router();
const { loginLimiter } = require("../middlewares/rateLimit.middleware");

const authController = require("../controllers/auth.controller");

module.exports = (sessions, authMiddleware) => {
  router.post("/register", authController.register);
  router.post("/login", loginLimiter, authController.login(sessions));
  router.get("/me", authMiddleware, authController.me);
  router.post("/logout", authController.logout(sessions));

  return router;
};
