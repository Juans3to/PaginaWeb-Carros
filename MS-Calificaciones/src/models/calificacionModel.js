import db from "../config/db.js";

export const crearCalificacion = async (carroId, estrellas) => {
  const [result] = await db.query(
    "INSERT INTO calificaciones (carroId, estrellas) VALUES (?, ?)",
    [carroId, estrellas]
  );
  return { id: result.insertId, carroId, estrellas };
};

export const obtenerCalificacionesPorCarro = async (carroId) => {
  const [rows] = await db.query(
    "SELECT * FROM calificaciones WHERE carroId = ?",
    [carroId]
  );
  return rows;
};

export const obtenerPromedioPorCarro = async (carroId) => {
  const [rows] = await db.query(
    "SELECT AVG(estrellas) AS promedio FROM calificaciones WHERE carroId = ?",
    [carroId]
  );
  return rows[0].promedio;
};
