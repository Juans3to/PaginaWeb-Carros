// src/controllers/calificacionesControl.js
import db from '../config/db.js';
import axios from 'axios';

const MS_VEHICULOS_URL = process.env.MS_VEHICULOS_URL || 'http://localhost:3003';

// Helpers
const parseId = (v) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
};
const validStars = (v) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 5;
};
const ensureVehiculoExiste = async (carroId) => {
  try {
    const url = `${MS_VEHICULOS_URL}/vehiculos/${carroId}`;
    const resp = await axios.get(url, { timeout: 3000 });
    // si devuelve 200 y tiene id, consideramos que existe
    return !!resp?.data?.id;
  } catch {
    return false;
  }
};

// =============== CRUD ===============

// Crear calificación
export const crearCalificacion = async (req, res) => {
  try {
    const carroId = parseId(req.body.carroId);
    const estrellas = req.body.estrellas;

    if (!carroId) {
      return res.status(400).json({ mensaje: 'carroId inválido' });
    }
    if (!validStars(estrellas)) {
      return res.status(400).json({ mensaje: 'estrellas debe ser entero 1-5' });
    }

    // validar que el vehículo exista en el MS de Vehículos
    const existe = await ensureVehiculoExiste(carroId);
    if (!existe) {
      return res.status(400).json({ mensaje: 'El vehículo no existe' });
    }

    const [r] = await db.query(
      'INSERT INTO calificaciones (carroId, estrellas) VALUES (?, ?)',
      [carroId, Number(estrellas)]
    );

    res.status(201).json({ id: r.insertId, carroId, estrellas: Number(estrellas) });
  } catch (error) {
    console.error('crearCalificacion:', error);
    res.status(500).json({ error: 'Error al crear calificación' });
  }
};

// Listar calificaciones (todas o por carroId)
export const obtenerCalificaciones = async (req, res) => {
  try {
    const { carroId, limit = 50, offset = 0 } = req.query;

    if (carroId !== undefined) {
      const id = parseId(carroId);
      if (!id) return res.status(400).json({ mensaje: 'carroId inválido' });

      const [rows] = await db.query(
        'SELECT * FROM calificaciones WHERE carroId = ? ORDER BY id DESC LIMIT ? OFFSET ?',
        [id, Number(limit) || 50, Number(offset) || 0]
      );
      return res.json(rows);
    }

    const [rows] = await db.query(
      'SELECT * FROM calificaciones ORDER BY id DESC LIMIT ? OFFSET ?',
      [Number(limit) || 50, Number(offset) || 0]
    );
    res.json(rows);
  } catch (error) {
    console.error('obtenerCalificaciones:', error);
    res.status(500).json({ error: 'Error al obtener calificaciones' });
  }
};

// Obtener una calificación por id
export const obtenerCalificacionPorId = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ mensaje: 'id inválido' });

    const [rows] = await db.query('SELECT * FROM calificaciones WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Calificación no encontrada' });

    res.json(rows[0]);
  } catch (error) {
    console.error('obtenerCalificacionPorId:', error);
    res.status(500).json({ error: 'Error al obtener calificación' });
  }
};

// Actualizar calificación (carroId?, estrellas?)
export const actualizarCalificacion = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ mensaje: 'id inválido' });

    const updates = [];
    const params = [];

    if (req.body.carroId !== undefined) {
      const c = parseId(req.body.carroId);
      if (!c) return res.status(400).json({ mensaje: 'carroId inválido' });

      // validar que el vehículo exista si me mandan carroId nuevo
      const existe = await ensureVehiculoExiste(c);
      if (!existe) return res.status(400).json({ mensaje: 'El vehículo no existe' });

      updates.push('carroId = ?');
      params.push(c);
    }

    if (req.body.estrellas !== undefined) {
      if (!validStars(req.body.estrellas)) {
        return res.status(400).json({ mensaje: 'estrellas debe ser entero 1-5' });
      }
      updates.push('estrellas = ?');
      params.push(Number(req.body.estrellas));
    }

    if (updates.length === 0) {
      return res.status(400).json({ mensaje: 'Nada para actualizar (carroId/estrellas)' });
    }

    params.push(id);
    const [r] = await db.query(
      `UPDATE calificaciones SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    if (r.affectedRows === 0) return res.status(404).json({ mensaje: 'Calificación no encontrada' });
    res.json({ mensaje: 'Calificación actualizada' });
  } catch (error) {
    console.error('actualizarCalificacion:', error);
    res.status(500).json({ error: 'Error al actualizar calificación' });
  }
};

// Eliminar calificación
export const eliminarCalificacion = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ mensaje: 'id inválido' });

    const [r] = await db.query('DELETE FROM calificaciones WHERE id = ?', [id]);
    if (r.affectedRows === 0) return res.status(404).json({ mensaje: 'Calificación no encontrada' });

    res.json({ mensaje: 'Calificación eliminada' });
  } catch (error) {
    console.error('eliminarCalificacion:', error);
    res.status(500).json({ error: 'Error al eliminar calificación' });
  }
};

// Extra: Obtener promedio de un carro
export const obtenerPromedio = async (req, res) => {
  try {
    const carroId = parseId(req.params.carroId);
    if (!carroId) return res.status(400).json({ mensaje: 'carroId inválido' });

    // opcional: asegurarse que el carro existe antes de calcular
    const existe = await ensureVehiculoExiste(carroId);
    if (!existe) return res.status(400).json({ mensaje: 'El vehículo no existe' });

    const [rows] = await db.query(
      'SELECT COALESCE(AVG(estrellas),0) AS promedio, COUNT(*) AS cantidad FROM calificaciones WHERE carroId = ?',
      [carroId]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error('obtenerPromedio:', error);
    res.status(500).json({ error: 'Error al calcular promedio' });
  }
};