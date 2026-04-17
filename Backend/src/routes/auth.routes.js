const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

module.exports = (sessions, authMiddleware) => {
  router.post("/register", authController.register);
  router.post("/login", authController.login(sessions));
  router.get("/me", authMiddleware, authController.me);
  router.post("/logout", authController.logout(sessions));

  return router;
};
