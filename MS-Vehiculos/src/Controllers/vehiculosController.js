const express = require('express');
const router = express.Router();
const VehiculosModel = require('../Models/vehiculosModel');

// Crear vehículo
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
