const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // usuario MySQL
    password: '',        // contraseña (sino hay, vacio)
    database: 'compraventa'
});

module.exports = pool;
