const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // usuario MySQL
    password: '',        // contraseña (si no tienen, vacio, usen el root)
    database: 'compraventa'
});

module.exports = pool;
