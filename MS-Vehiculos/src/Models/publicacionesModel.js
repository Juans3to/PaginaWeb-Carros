const pool = require('./db');

const PublicacionesModel = {
  async crearPublicacion(idUsuario, idVehiculo) {
    const [result] = await pool.query(
      `INSERT INTO publicaciones (idUsuario, idVehiculo)
       VALUES (?, ?)`,
      [idUsuario, idVehiculo]
    );
    return result.insertId;
  },

  async obtenerPublicaciones() {
    const [rows] = await pool.query('SELECT * FROM publicaciones');
    return rows;
  },

  async obtenerPublicacionPorId(idPublicacion) {
    const [rows] = await pool.query(
      'SELECT * FROM publicaciones WHERE idPublicacion = ?',
      [idPublicacion]
    );
    return rows[0];
  },

  async marcarComoVendido(idPublicacion) {
    const [result] = await pool.query(
      `UPDATE publicaciones SET estado = 'vendido' WHERE idPublicacion = ?`,
      [idPublicacion]
    );
    return result.affectedRows;
  }
};

module.exports = PublicacionesModel;
