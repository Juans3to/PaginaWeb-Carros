const pool = require('../db'); // tu conexión

const reseñasModel = {
  // Crear reseña
  async crear(username, idVehiculo, comentario) {
    const [result] = await pool.query(
      "INSERT INTO resenas (username, idVehiculo, comentario) VALUES (?, ?, ?)",
      [username, idVehiculo, comentario]
    );
    return result.insertId;
  },

  // Obtener todas las reseñas
  async obtenerTodas() {
    const [rows] = await pool.query("SELECT * FROM resenas");
    return rows;
  },

  // Obtener reseñas por vehículo
  async obtenerPorVehiculo(idVehiculo) {
    const [rows] = await pool.query(
      "SELECT * FROM resenas WHERE idVehiculo = ?",
      [idVehiculo]
    );
    return rows;
  },

  // Obtener una reseña por ID
  async obtenerPorId(id_resena) {
    const [rows] = await pool.query(
      "SELECT * FROM resenas WHERE id_resena = ?",
      [id_resena]
    );
    return rows[0];
  },

  // Actualizar reseña (solo comentario)
  async actualizar(id_resena, nuevoComentario) {
    const [result] = await pool.query(
      "UPDATE resenas SET comentario = ? WHERE id_resena = ?",
      [nuevoComentario, id_resena]
    );
    return result.affectedRows;
  },

  // Eliminar reseña
  async eliminar(id_resena) {
    const [result] = await pool.query(
      "DELETE FROM resenas WHERE id_resena = ?",
      [id_resena]
    );
    return result.affectedRows;
  }
};

module.exports = reseñasModel;
