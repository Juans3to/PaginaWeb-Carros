// src/app.js
import express from "express";
import morgan from "morgan";
import calificacionesRoutes from "./routes/calificacionesRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/calificaciones", calificacionesRoutes);

export default app;
