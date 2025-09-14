const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',  // cambia si tienes contraseña
    database: 'autoslindotesdb'  // tu base de datos
});

module.exports = pool;
