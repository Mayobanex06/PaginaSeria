require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authMiddlewareFactory = require("./middlewares/auth.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");

const authRoutes = require("./routes/auth.routes");
const tiendaRoutes = require("./routes/tienda.routes");
const adminRoutes = require("./routes/admin.routes");
const carritoRoutes = require("./routes/carrito.routes");

const app = express();

const sessions = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

const authMiddleware = authMiddlewareFactory(sessions);

app.get("/ping", (req, res) => {
  res.send("pong");
});

const pool = require("./config/db");

app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "DB no conecta", detail: String(err.message || err) });
  }
});

app.use("/api", authRoutes(sessions, authMiddleware));
app.use("/api/tienda", tiendaRoutes);
app.use("/api/admin", adminRoutes(authMiddleware, adminMiddleware));
app.use("/api/carrito", carritoRoutes(authMiddleware));

module.exports = app;
