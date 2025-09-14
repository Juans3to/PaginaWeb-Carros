import { crearCalificacion, obtenerCalificacionesPorVehiculo } from "../models/calificacionModel.js";

// Controlador para agregar una calificación.
export const agregarCalificacion = async (req, res) => {
  try {
    const { idVehiculo, idUsuario, estrellas } = req.body;

    if (!idVehiculo || !idUsuario || !estrellas) {
      return res.status(400).json({ mensaje: "Faltan datos requeridos" });
    }

    if (estrellas < 1 || estrellas > 5) {
      return res.status(400).json({ mensaje: "La calificación debe ser de 1 a 5 estrellas" });
    }

    const calificacionId = await crearCalificacion(idVehiculo, idUsuario, estrellas);
    res.status(201).json({ mensaje: "Calificación agregada", calificacionId });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

// Controlador para listar las calificaciones de un vehículo.
export const listarCalificaciones = async (req, res) => {
  try {
    const { idVehiculo } = req.params;
    const calificaciones = await obtenerCalificacionesPorVehiculo(idVehiculo);
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};