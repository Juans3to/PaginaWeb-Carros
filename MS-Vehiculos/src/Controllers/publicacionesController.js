const express = require('express');
const router = express.Router();
const PublicacionesModel = require('../Models/publicacionesModel');

router.post('/', async (req, res) => {
  try {
    const { idUsuario, idVehiculo } = req.body;
    const id = await PublicacionesModel.crearPublicacion(idUsuario, idVehiculo);
    res.status(201).json({ mensaje: 'Publicación creada', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear publicación' });
  }
});

router.get('/', async (req, res) => {
  try {
    const publicaciones = await PublicacionesModel.obtenerPublicaciones();

    const publicacionesConImagen = publicaciones.map(pub => ({
      ...pub,
      imagen: "http://localhost:3003/images/carro.jpg" // la ruta de tu imagen
    }));

    res.json(publicacionesConImagen);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener publicaciones' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const publicacion = await PublicacionesModel.obtenerPublicacionPorId(req.params.id);
    if (publicacion) {
      res.json(publicacion);
    } else {
      res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener publicación' });
  }
});

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
