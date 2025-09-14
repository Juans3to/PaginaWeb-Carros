import pool from "./db.js";

// Función para insertar una nueva calificación.
export const crearCalificacion = async (idVehiculo, idUsuario, estrellas) => {
  const [result] = await pool.query(
    "INSERT INTO calificaciones (idVehiculo, idUsuario, estrellas) VALUES (?, ?, ?)",
    [idVehiculo, idUsuario, estrellas]
  );
  return result.insertId;
};

// Función para obtener todas las calificaciones de un vehículo.
export const obtenerCalificacionesPorVehiculo = async (idVehiculo) => {
  const [rows] = await pool.query(
    "SELECT * FROM calificaciones WHERE idVehiculo = ?",
    [idVehiculo]
  );
  return rows;
};
