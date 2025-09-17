import { Router } from "express";
import {
  crearCalificacion,
  obtenerCalificaciones,
  obtenerPromedio
} from "../controllers/calificacionController.js";

const router = Router();

// Crear una calificación
router.post("/", crearCalificacion);

// Obtener todas las calificaciones
router.get("/", obtenerCalificaciones);

// Obtener promedio de un carro
router.get("/promedio/:carroId", obtenerPromedio);

export default router;
