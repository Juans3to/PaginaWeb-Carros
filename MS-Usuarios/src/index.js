const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usuariosControl = require('./Controllers/usuariosController');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas del microservicio usuarios
app.use('/usuarios', usuariosControl);

app.listen(3001, () => {
    console.log('Microservicio de Usuarios ejecutándose en el puerto 3001');
});
