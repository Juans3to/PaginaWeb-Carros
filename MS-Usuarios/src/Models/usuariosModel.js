const pool = require('./db');

const UsuarioModel = {
    async crearUsuario(username, email, password) {
        const [result] = await pool.query(
            'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        return result.insertId; // Se devuelve el id (aunque esto no se usa y/o muestra como tal en la pagina, en postman si.)
    },

    async obtenerUsuarios() {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        return rows;
    },

    async obtenerUsuarioPorUsername(username) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
        return rows[0];
    },

    async actualizarUsuario(username, email, password) {
        const [result] = await pool.query(
            'UPDATE usuarios SET email = ?, password = ? WHERE username = ?',
            [email, password, username]
        );
        return result.affectedRows;
    },

    async eliminarUsuario(username) {
        const [result] = await pool.query('DELETE FROM usuarios WHERE username = ?', [username]);
        return result.affectedRows;
    },

    async login(identifier, password) {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE (email = ? OR username = ?) AND password = ?',
            [identifier, identifier, password]
        );
        return rows[0];
    }

};

module.exports = UsuarioModel;

