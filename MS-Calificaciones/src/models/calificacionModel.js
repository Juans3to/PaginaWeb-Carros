// src/models/calificacionesModel.js
import db from '../config/db.js';

/** Utilidades internas */
const toInt = (v) => {
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
};

/** =============== CREATE =============== */
export async function crearCalificacion({ carroId, estrellas }) {
  const [r] = await db.query(
    'INSERT INTO calificaciones (carroId, estrellas) VALUES (?, ?)',
    [carroId, estrellas]
  );
  return { id: r.insertId, carroId, estrellas };
}

/** =============== READ =============== */
// Lista global con paginación
export async function listar({ limit = 50, offset = 0 } = {}) {
  const [rows] = await db.query(
    'SELECT * FROM calificaciones ORDER BY id DESC LIMIT ? OFFSET ?',
    [Number(limit) || 50, Number(offset) || 0]
  );
  return rows;
}

// Lista por carro con paginación
export async function listarPorCarro(carroId, { limit = 50, offset = 0 } = {}) {
  const [rows] = await db.query(
    'SELECT * FROM calificaciones WHERE carroId = ? ORDER BY id DESC LIMIT ? OFFSET ?',
    [carroId, Number(limit) || 50, Number(offset) || 0]
  );
  return rows;
}

// Obtener por id
export async function obtenerPorId(id) {
  const [rows] = await db.query('SELECT * FROM calificaciones WHERE id = ?', [id]);
  return rows[0] || null;
}

/** =============== UPDATE =============== */
export async function actualizar(id, { carroId, estrellas }) {
  // Construcción dinámica del SET
  const set = [];
  const params = [];

  if (carroId !== undefined && carroId !== null) {
    set.push('carroId = ?');
    params.push(carroId);
  }
  if (estrellas !== undefined && estrellas !== null) {
    set.push('estrellas = ?');
    params.push(estrellas);
  }

  if (set.length === 0) return 0; // nada que actualizar

  params.push(id);
  const [r] = await db.query(`UPDATE calificaciones SET ${set.join(', ')} WHERE id = ?`, params);
  return r.affectedRows; // 0 o 1
}

/** =============== DELETE =============== */
export async function eliminar(id) {
  const [r] = await db.query('DELETE FROM calificaciones WHERE id = ?', [id]);
  return r.affectedRows; // 0 o 1
}

/** =============== EXTRAS =============== */
// Promedio + cantidad de un carro
export async function promedioPorCarro(carroId) {
  const [rows] = await db.query(
    'SELECT COALESCE(AVG(estrellas),0) AS promedio, COUNT(*) AS cantidad FROM calificaciones WHERE carroId = ?',
    [carroId]
  );
  return rows[0]; // { promedio, cantidad }
}

// Agregados para “top” (por si los quieres)
export async function agregadosTop({ limit = 10, minReviews = 0 } = {}) {
  const [rows] = await db.query(
    `SELECT carroId,
            AVG(estrellas) AS rating_promedio,
            COUNT(*)       AS rating_cantidad
     FROM calificaciones
     GROUP BY carroId
     HAVING COUNT(*) >= ?
     ORDER BY rating_promedio DESC, rating_cantidad DESC, carroId DESC
     LIMIT ?`,
    [Number(minReviews) || 0, Number(limit) || 10]
  );
  return rows;
}