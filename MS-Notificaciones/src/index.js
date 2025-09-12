const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const notificacionesRoutes = require('./Controllers/notificacionesController');

const app = express();
const PORT = 3004; // este microservicio corre en el puerto 3004

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', notificacionesRoutes); // 👈 Deja solo esta línea para que funcione con el API Gateway
app.use('/notificaciones', notificacionesRoutes); // 👈 Esta línea debe ser eliminada o comentada

// Servidor
app.listen(PORT, () => {
    console.log(`🚀 Microservicio Notificaciones corriendo en http://localhost:${PORT}`);
});