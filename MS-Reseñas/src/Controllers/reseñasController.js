const express = require("express");
const router = express.Router();
const reseñasModel = require("../Models/reseñasModel");

// Crear reseña
router.post("/", async (req, res) => {
  try {
    const { username, idVehiculo, comentario } = req.body;
    if (!username || !idVehiculo || !comentario) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const id = await reseñasModel.crear(username, idVehiculo, comentario);
    res.status(201).json({ mensaje: "Reseña creada", id });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear reseña", error });
  }
});

// Obtener todas las reseñas
router.get("/", async (req, res) => {
  try {
    const reseñas = await reseñasModel.obtenerTodas();
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener reseñas", error });
  }
});

// Obtener reseñas por vehículo
router.get("/vehiculo/:idVehiculo", async (req, res) => {
  try {
    const reseñas = await reseñasModel.obtenerPorVehiculo(req.params.idVehiculo);
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener reseñas", error });
  }
});

// Actualizar reseña
router.put("/:id_resena", async (req, res) => {
  try {
    const { id_resena } = req.params;
    const { username, comentario } = req.body;

    // Verificar si la reseña existe
    const reseña = await reseñasModel.obtenerPorId(id_resena);
    if (!reseña) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }

    // Validar que la reseña pertenece al usuario
    if (reseña.username !== username) {
      return res.status(403).json({ mensaje: "No puedes modificar esta reseña" });
    }

    await reseñasModel.actualizar(id_resena, comentario);
    res.json({ mensaje: "Reseña actualizada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar reseña", error });
  }
});

// Eliminar reseña
router.delete("/:id_resena", async (req, res) => {
  try {
    const { id_resena } = req.params;
    const { username } = req.body;

    // Verificar si la reseña existe
    const reseña = await reseñasModel.obtenerPorId(id_resena);
    if (!reseña) {
      return res.status(404).json({ mensaje: "Reseña no encontrada" });
    }

    // Validar que la reseña pertenece al usuario
    if (reseña.username !== username) {
      return res.status(403).json({ mensaje: "No puedes eliminar esta reseña" });
    }

    await reseñasModel.eliminar(id_resena);
    res.json({ mensaje: "Reseña eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar reseña", error });
  }
});

module.exports = router;
