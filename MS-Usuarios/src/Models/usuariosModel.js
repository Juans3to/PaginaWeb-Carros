const pool = require('./db');

const UsuarioModel = {
    async crearUsuario(nombre, email, password) {
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, password]
        );
        return result.insertId;
    },

    async obtenerUsuarios() {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        return rows;
    },

    async obtenerUsuarioPorId(id) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    },

    async actualizarUsuario(id, nombre, email, password) {
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?',
            [nombre, email, password, id]
        );
        return result.affectedRows;
    },

    async eliminarUsuario(id) {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return result.affectedRows;
    },

    async login(email, password) {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ? AND password = ?',
            [email, password]
        );
        return rows[0];
    }
};

module.exports = UsuarioModel;

