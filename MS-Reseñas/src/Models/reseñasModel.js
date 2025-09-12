const pool = require('../db');

const ResenasModel = {
  async obtenerTodas() {
    const [rows] = await pool.query('SELECT * FROM resenas');
    return rows;
  },

  async crear(idUsuario, calificacion, comentario) {
    const [result] = await pool.query(
      'INSERT INTO resenas (idUsuario, calificacion, comentario) VALUES (?, ?, ?)',
      [idUsuario, calificacion, comentario || null]
    );
    return result.insertId;
  },

  async actualizar(id, calificacion, comentario) {
    const [result] = await pool.query(
      'UPDATE resenas SET calificacion = ?, comentario = ? WHERE id_resena = ?',
      [calificacion, comentario, id]
    );
    return result.affectedRows;
  },

  async eliminar(id) {
    const [result] = await pool.query(
      'DELETE FROM resenas WHERE id_resena = ?',
      [id]
    );
    return result.affectedRows;
  }
};

module.exports = ResenasModel;
