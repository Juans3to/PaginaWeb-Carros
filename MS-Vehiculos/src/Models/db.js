const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',  // Usuario, root por defecto.
    password: '',  // cambia si tienes.
    port: 3306, // Puerto por defecto de MySQL
    database: 'VehiculosWeb'  // la base de datoss
});

module.exports = pool;
