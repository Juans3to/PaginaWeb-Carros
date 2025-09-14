import express from "express";

const router = express.Router();

// Array temporal en memoria
let calificaciones = [];

// Obtener todas las calificaciones
router.get("/", (req, res) => {
  res.json(calificaciones);
});

// Crear nueva calificación
router.post("/", (req, res) => {
  const { usuario, carroId, estrellas, comentario } = req.body;

  if (!usuario || !carroId || !estrellas) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  if (estrellas < 1 || estrellas > 5) {
    return res.status(400).json({ mensaje: "La calificación debe ser de 1 a 5" });
  }

  const nueva = {
    id: calificaciones.length + 1,
    usuario,
    carroId,
    estrellas,
    comentario: comentario || ""
  };

  calificaciones.push(nueva);

  res.status(201).json({ mensaje: "Calificación creada", calificacion: nueva });
});

export default router;
