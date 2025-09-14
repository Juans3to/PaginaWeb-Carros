import pool from "../config/db.js";

export const crearCalificacion = async (carroId, usuarioId, estrellas) => {
  const [result] = await pool.query(
    "INSERT INTO calificaciones (carro_id, usuario_id, estrellas) VALUES (?, ?, ?)",
    [carroId, usuarioId, estrellas]
  );
  return result.insertId;
};

export const obtenerCalificacionesPorCarro = async (carroId) => {
  const [rows] = await pool.query(
    "SELECT * FROM calificaciones WHERE carro_id = ?",
    [carroId]
  );
  return rows;
};
