require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const reseñasRoutes = require('./Controllers/reseñasController');

const app = express();
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

app.use('/resenas', reseñasRoutes);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Microservicio de Reseñas corriendo en http://localhost:${PORT}`);
});
