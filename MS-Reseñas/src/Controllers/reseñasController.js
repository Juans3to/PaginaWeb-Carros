const express = require('express');
const router = express.Router();
const ResenasModel = require('../Models/reseñasModel');

// GET: Ruta para obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const reseñas = await ResenasModel.obtenerTodas();
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// GET: Ruta para obtener las reseñas de un vehículo específico
router.get('/:idVehiculo', async (req, res) => {
  try {
    const { idVehiculo } = req.params;
    const reseñas = await ResenasModel.obtenerPorVehiculo(idVehiculo);
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseñas por vehículo' });
  }
});

// POST: Ruta para crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const { idUsuario, idVehiculo, comentario } = req.body;

    // Validación de datos
    if (!idUsuario || !idVehiculo || !comentario) {
      return res.status(400).json({ error: 'idUsuario, idVehiculo y comentario son obligatorios' });
    }

    const id = await ResenasModel.crear(idUsuario, idVehiculo, comentario);
    res.status(201).json({ mensaje: 'Reseña creada', id });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear reseña' });
  }
});

// PUT: Ruta para actualizar una reseña existente
router.put('/:id', async (req, res) => {
  try {
    const { comentario } = req.body;
    const actualizado = await ResenasModel.actualizar(req.params.id, comentario);

    if (actualizado === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    res.json({ mensaje: 'Reseña actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar reseña' });
  }
});

// DELETE: Ruta para eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await ResenasModel.eliminar(req.params.id);

    if (eliminado === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    res.json({ mensaje: 'Reseña eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar reseña' });
  }
});

module.exports = router;

