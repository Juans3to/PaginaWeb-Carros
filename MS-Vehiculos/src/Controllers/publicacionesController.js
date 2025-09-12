const express = require('express');
const router = express.Router();
const PublicacionesModel = require('../Models/publicacionesModel');

// Crear publicación (ahora acepta "estado" opcional)
router.post('/', async (req, res) => {
  try {
    const { idUsuario, idVehiculo, estado } = req.body;

    // Validar estado (solo 'activo' o 'vendido', default 'activo')
    const allowed = ['activo', 'vendido'];
    const estadoFinal = allowed.includes(estado) ? estado : 'activo';

    const id = await PublicacionesModel.crearPublicacion(idUsuario, idVehiculo, estadoFinal);
    res.status(201).json({ mensaje: 'Publicación creada', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear publicación' });
  }
});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const publicaciones = await PublicacionesModel.obtenerPublicaciones();

    const publicacionesConImagen = publicaciones.map(pub => ({
      ...pub,
      imagen: "http://localhost:3003/images/carro.jpg" // ruta fija por ahora
    }));

    res.json(publicacionesConImagen);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener publicaciones' });
  }
});

// Obtener publicación por id
router.get('/:id', async (req, res) => {
  try {
    const publicacion = await PublicacionesModel.obtenerPublicacionPorId(req.params.id);
    if (publicacion) {
      res.json({
        ...publicacion,
        imagen: "http://localhost:3003/images/carro.jpg" // igual que en el listado
      });
    } else {
      res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener publicación' });
  }
});


// Marcar como vendido
router.put('/:id/vender', async (req, res) => {
  try {
    const actualizado = await PublicacionesModel.marcarComoVendido(req.params.id);
    if (actualizado) {
      res.json({ mensaje: 'Publicación marcada como vendida' });
    } else {
      res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar publicación' });
  }
});

module.exports = router;

