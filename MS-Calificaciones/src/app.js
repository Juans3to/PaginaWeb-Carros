// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const mysql = require('mysql2/promise');

// Crear el pool de conexiones utilizando las variables del archivo .env
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Usamos las variables de entorno
    user: process.env.DB_USER,       // Usamos las variables de entorno
    password: process.env.DB_PASS,   // Usamos las variables de entorno
    database: process.env.DB_NAME    // Usamos las variables de entorno
});

module.exports = pool;
