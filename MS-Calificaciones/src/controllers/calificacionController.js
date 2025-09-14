import { crearCalificacion, obtenerCalificacionesPorCarro } from "../models/calificacionModel.js";

export const agregarCalificacion = async (req, res) => {
  try {
    const { carro_id, usuario_id, estrellas } = req.body;

    if (!carro_id || !usuario_id || !estrellas) {
      return res.status(400).json({ mensaje: "Faltan datos requeridos" });
    }

    if (estrellas < 1 || estrellas > 5) {
      return res.status(400).json({ mensaje: "La calificación debe ser de 1 a 5 estrellas" });
    }

    const calificacionId = await crearCalificacion(carro_id, usuario_id, estrellas);
    res.status(201).json({ mensaje: "Calificación agregada", calificacionId });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

export const listarCalificaciones = async (req, res) => {
  try {
    const { carro_id } = req.params;
    const calificaciones = await obtenerCalificacionesPorCarro(carro_id);
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};
