const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // usuario MySQL (vacio de momento, se usa root)
    password: '',        // contraseña (igual vacio)
    database: 'UsuariosWeb'
});

module.exports = pool;
