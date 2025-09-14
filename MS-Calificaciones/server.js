import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import calificacionesRoutes from "./src/routes/calificacionesRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

// Middleware para JSON
app.use(express.json());

// Rutas
app.use("/calificaciones", calificacionesRoutes);

// Puerto fijo 3004
const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
