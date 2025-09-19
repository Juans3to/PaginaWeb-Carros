const express = require('express');
const router = express.Router();
const UsuarioModel = require('../Models/usuariosModel');

// Crear usuario
router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const id = await UsuarioModel.crearUsuario(username, email, password);
        res.status(201).json({ mensaje: 'Usuario creado', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear: usuario o correo ya en uso' });
    }
});

// Consultar todos
router.get('/', async (req, res) => {
    try {
        const usuarios = await UsuarioModel.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
});

// Consultar por username
router.get('/:username', async (req, res) => {
    try {
        const usuario = await UsuarioModel.obtenerUsuarioPorUsername(req.params.username);
        usuario
            ? res.json(usuario)
            : res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar usuario' });
    }
});

// Actualizar usuario
router.put('/:username', async (req, res) => {
    try {
        const { email, password } = req.body;
        const actualizado = await UsuarioModel.actualizarUsuario(
            req.params.username,
            email,
            password
        );
        actualizado
            ? res.json({ mensaje: 'Usuario actualizado' })
            : res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar usuario' });
    }
});

// Eliminar usuario
router.delete('/:username', async (req, res) => {
    try {
        const eliminado = await UsuarioModel.eliminarUsuario(req.params.username);
        eliminado
            ? res.json({ mensaje: 'Usuario eliminado' })
            : res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar usuario' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body; // puede ser username o email
        const usuario = await UsuarioModel.login(identifier, password);
        usuario
            ? res.json({ mensaje: 'Login exitoso', usuario })
            : res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al validar login' });
    }
});

module.exports = router;

