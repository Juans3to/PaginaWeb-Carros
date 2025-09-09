const express = require('express');
const router = express.Router();
const UsuarioModel = require('../Models/usuariosModel');

// Crear usuario
router.post('/', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const id = await UsuarioModel.crearUsuario(nombre, email, password);
        res.status(201).json({ mensaje: 'Usuario creado', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear usuario' });
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

// Consultar por id
router.get('/:id', async (req, res) => {
    try {
        const usuario = await UsuarioModel.obtenerUsuarioPorId(req.params.id);
        usuario
            ? res.json(usuario)
            : res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar usuario' });
    }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const actualizado = await UsuarioModel.actualizarUsuario(
            req.params.id,
            nombre,
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
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await UsuarioModel.eliminarUsuario(req.params.id);
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
        const { email, password } = req.body;
        const usuario = await UsuarioModel.login(email, password);
        usuario
            ? res.json({ mensaje: 'Login exitoso', usuario })
            : res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al validar login' });
    }
});

module.exports = router;

