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

  /*
  // Top N vehículos por calificación promedio
  async topCalificados({ limit = 10, minReviews = 0 } = {}) {
    limit = Number(limit) || 10;
    minReviews = Number(minReviews) || 0;
  
    const [rows] = await pool.query(
      `SELECT 
          a.id,
          a.Modelo,
          a.Anio,
          a.Estado,
          a.Km,
          a.Precio_en_dolares,
          a.MSRP,
          COALESCE(AVG(c.estrellas), 0) AS rating_promedio,
          COUNT(c.id)                   AS rating_cantidad
       FROM autos a
       LEFT JOIN calificaciones c ON c.carroId = a.id
       GROUP BY a.id
       HAVING COUNT(c.id) >= ?
       ORDER BY rating_promedio DESC, rating_cantidad DESC, a.id DESC
       LIMIT ?`,
      [minReviews, limit]
    );
  
    return rows;
  }
  ,
  */

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

  async obtener8Autos() {
    const [rows] = await pool.query(
      `SELECT id, Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP
     FROM autos
     ORDER BY id ASC
     LIMIT 4`
    );
    return rows;
  }

};

module.exports = VehiculosModel;