const pool = require('./db');

const VehiculosModel = {
  async obtenerVehiculos() {
    const [rows] = await pool.query('SELECT * FROM autos');
    return rows;
  },

  async crearVehiculo(Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP) {
    console.log("📥 Datos que llegan al model:", { Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP });
    try {
      const [result] = await pool.query(
        'INSERT INTO autos (Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP) VALUES (?, ?, ?, ?, ?, ?)',
        [Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP]
      );
      console.log("✅ Resultado del INSERT:", result);
      return result.insertId;
    } catch (err) {
      console.error("❌ Error en el INSERT:", err);
      throw err; // vuelve a lanzar el error
    }
  },

  async obtenerVehiculoPorId(id) {
    const [rows] = await pool.query('SELECT * FROM autos WHERE id = ?', [id]);
    return rows[0];
  },

  async actualizarVehiculo(id, Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP) {
    const [result] = await pool.query(
      `UPDATE autos
       SET Modelo = ?, Anio = ?, Estado = ?, Km = ?, Precio_en_dolares = ?, MSRP = ?
       WHERE id = ?`,
      [Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP, id]
    );
    return result.affectedRows;
  },

  async eliminarVehiculo(id) {
    const [result] = await pool.query('DELETE FROM autos WHERE id = ?', [id]);
    return result.affectedRows;
  },

  // Buscar por modelo con paginación (LIKE %query%)
  async buscarPorModelo({ query, limit = 15, offset = 0 }) {
    // Asegurar números
    limit = Number(limit) || 15;
    offset = Number(offset) || 0;

    // LIKE insensible a mayúsculas si tu collation es *_ci (lo normal en MySQL).
    const like = `%${query || ''}%`;

    const [rows] = await pool.query(
      `SELECT id, Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP
       FROM autos
       WHERE Modelo LIKE ?
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [like, limit, offset]
    );
    return rows;
  },

  // Para saber cuántos hay en total y poder paginar en frontend
  async contarPorModelo({ query }) {
    const like = `%${query || ''}%`;
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM autos
       WHERE Modelo LIKE ?`,
      [like]
    );
    return rows[0]?.total || 0;
  },

};



module.exports = VehiculosModel;
