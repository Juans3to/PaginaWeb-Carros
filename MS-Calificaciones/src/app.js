import express from "express";
import morgan from "morgan";
import cors from "cors";
import calificacionesRoutes from "./routes/calificacionesRoutes.js";

const app = express();

// --- CORS (habilita tu front en localhost/127.0.0.1, cualquier puerto)
const corsOptions = {
  origin: [
    /http:\/\/localhost(:\d+)?$/,
    /http:\/\/127\.0\.0\.1(:\d+)?$/
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// --- Manejo de preflight OPTIONS sin usar app.options()
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    // cors() ya puso los headers; solo devolvemos 204
    return res.sendStatus(204);
  }
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/calificaciones", calificacionesRoutes);

export default app;