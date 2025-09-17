import db from "../config/db.js";

// Crear calificación
export const crearCalificacion = async (req, res) => {
  try {
    const { carroId, estrellas } = req.body;
    await db.query("INSERT INTO calificaciones (carroId, estrellas) VALUES (?, ?)", [carroId, estrellas]);
    res.json({ mensaje: "Calificación creada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear calificación" });
  }
};

// Obtener todas las calificaciones
export const obtenerCalificaciones = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM calificaciones");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener calificaciones" });
  }
};

// Obtener promedio de un carro
export const obtenerPromedio = async (req, res) => {
  try {
    const { carroId } = req.params;
    const [rows] = await db.query("SELECT AVG(estrellas) AS promedio FROM calificaciones WHERE carroId = ?", [carroId]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al calcular promedio" });
  }
};
