import { Router } from "express";
import { agregarCalificacion, listarCalificaciones } from "../controllers/calificacionController.js";

const router = Router();

// Ruta POST para agregar una nueva calificación
router.post("/", agregarCalificacion);

// Ruta GET para obtener las calificaciones de un vehículo por su ID
router.get("/:idVehiculo", listarCalificaciones);

export default router;
