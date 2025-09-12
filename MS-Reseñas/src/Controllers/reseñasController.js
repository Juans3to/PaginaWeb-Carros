const express = require('express');
const router = express.Router();
const ResenasModel = require('../Models/reseñasModel');

// GET todas
router.get('/', async (req, res) => {
  try {
    const reseñas = await ResenasModel.obtenerTodas();
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// POST nueva
router.post('/', async (req, res) => {
  try {
    const { idUsuario, calificacion, comentario } = req.body;

    if (!idUsuario || !calificacion) {
      return res.status(400).json({ error: 'idUsuario y calificación son obligatorios' });
    }

    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    const id = await ResenasModel.crear(idUsuario, calificacion, comentario);
    res.status(201).json({ mensaje: 'Reseña creada', id });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear reseña' });
  }
});

// PUT actualizar
router.put('/:id', async (req, res) => {
  try {
    const { calificacion, comentario } = req.body;
    const actualizado = await ResenasModel.actualizar(req.params.id, calificacion, comentario);

    if (actualizado === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    res.json({ mensaje: 'Reseña actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar reseña' });
  }
});

// DELETE
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

