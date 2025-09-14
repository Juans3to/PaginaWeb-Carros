const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',  // Usuario, root por defecto.
    password: '',  // cambia si tienes.
    database: 'VehiculosWeb'  // la base de datos.
});

module.exports = pool;
