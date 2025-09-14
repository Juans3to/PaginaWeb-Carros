const pool = require('../db');

const ResenasModel = {
  // Función para obtener todas las reseñas
  async obtenerTodas() {
    const [rows] = await pool.query('SELECT * FROM resenas');
    return rows;
  },

  // Función para obtener reseñas por el ID de un vehículo
  async obtenerPorVehiculo(idVehiculo) {
    const [rows] = await pool.query(
      'SELECT * FROM resenas WHERE idVehiculo = ?',
      [idVehiculo]
    );
    return rows;
  },

  // Función para crear una nueva reseña (solo comentario)
  async crear(idUsuario, idVehiculo, comentario) {
    const [result] = await pool.query(
      'INSERT INTO resenas (idUsuario, idVehiculo, comentario) VALUES (?, ?, ?)',
      [idUsuario, idVehiculo, comentario || null]
    );
    return result.insertId;
  },

  // Función para actualizar el comentario de una reseña
  async actualizar(id, comentario) {
    const [result] = await pool.query(
      'UPDATE resenas SET comentario = ? WHERE id_resena = ?',
      [comentario, id]
    );
    return result.affectedRows;
  },

  // Función para eliminar una reseña
  async eliminar(id) {
    const [result] = await pool.query(
      'DELETE FROM resenas WHERE id_resena = ?',
      [id]
    );
    return result.affectedRows;
  }
};

module.exports = ResenasModel;
