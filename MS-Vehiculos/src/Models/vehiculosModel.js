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
  }
};

module.exports = VehiculosModel;
