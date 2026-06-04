require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const authMiddleware = require("./middlewares/auth.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");

const authRoutes = require("./routes/auth.routes");
const tiendaRoutes = require("./routes/tienda.routes");
const adminRoutes = require("./routes/admin.routes");
const carritoRoutes = require("./routes/carrito.routes");

const pool = require("./config/db");

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1 AS ok");

    res.json({
      ok: true,
      database: "connected",
    });
  } catch (err) {
    console.error("HEALTH CHECK ERROR >>>", err);

    res.status(500).json({
      ok: false,
      error: "Servicio no disponible",
    });
  }
});

app.use("/api", authRoutes);
app.use("/api/tienda", tiendaRoutes);
app.use("/api/admin", adminRoutes(authMiddleware, adminMiddleware));
app.use("/api/carrito", carritoRoutes(authMiddleware));

module.exports = app;
