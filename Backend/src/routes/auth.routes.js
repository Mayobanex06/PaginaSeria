const express = require("express");
const router = express.Router();

const {
  loginLimiter,
  registerLimiter,
} = require("../middlewares/rateLimit.middleware");

const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");

router.post("/register", registerLimiter, authController.register);
router.post("/login", loginLimiter, authController.login);
router.get("/me", authMiddleware, authController.me);
router.post("/logout", authController.logout);

module.exports = router;