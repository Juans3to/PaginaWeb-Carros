const express = require('express');
const router = express.Router();
const VehiculosModel = require('../Models/vehiculosModel');

// Crear vehículo
router.post('/', async (req, res) => {
    try {
        const { Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP } = req.body;

        const id = await VehiculosModel.crearVehiculo(
            Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP
        );

        res.status(201).json({ mensaje: 'Vehículo creado', id });
    } catch (error) {
        console.error("Error al crear vehícusssso:", error);
        res.status(500).json({
            mensaje: "Error al crear vehículo",
            error: JSON.stringify(error, null, 2)
        });
    }
}); // 👈 aquí cierras bien la ruta POST


// Obtener todos los vehículos
router.get('/', async (req, res) => {
    try {
        const vehiculos = await VehiculosModel.obtenerVehiculos();
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener vehículos' });
    }
});

// Buscar vehículos por modelo: /vehiculos/buscar?query=Toyota&limit=10&offset=0
router.get('/buscar', async (req, res) => {
  try {
    const { query = '', limit = 15, offset = 0 } = req.query;

    // Si no mandan query, devolvemos vacío (o podrías devolver recientes)
    if (query.trim() === '') {
      return res.json({ items: [], total: 0, limit: Number(limit), offset: Number(offset) });
    }

    const [items, total] = await Promise.all([
      VehiculosModel.buscarPorModelo({ query, limit, offset }),
      VehiculosModel.contarPorModelo({ query })
    ]);

    res.json({
      items,
      total,
      limit: Number(limit),
      offset: Number(offset),
      hasMore: Number(offset) + Number(limit) < total
    });
  } catch (error) {
    console.error('Error en /vehiculos/buscar:', error);
    res.status(500).json({ mensaje: 'Error al buscar vehículos' });
  }
});

// GET /vehiculos/ocho
router.get('/ocho', async (req, res) => {
  try {
    const items = await VehiculosModel.obtener8Autos();
    res.json({ items, limit: 4 });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: 'Error al obtener 8 vehículos' });
  }
});


// Obtener vehículo por id
router.get('/:id', async (req, res) => {
    try {
        const vehiculo = await VehiculosModel.obtenerVehiculoPorId(req.params.id);
        if (vehiculo) {
            res.json(vehiculo);
        } else {
            res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener vehículo' });
    }
});

// Actualizar vehículo
router.put('/:id', async (req, res) => {
    try {
        const { Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP } = req.body;
        const actualizado = await VehiculosModel.actualizarVehiculo(
            req.params.id,
            Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP
        );
        if (actualizado) {
            res.json({ mensaje: 'Vehículo actualizado' });
        } else {
            res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar vehículo' });
    }
});

// Eliminar vehículo
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await VehiculosModel.eliminarVehiculo(req.params.id);
        if (eliminado) {
            res.json({ mensaje: 'Vehículo eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar vehículo' });
    }
});

module.exports = router;
