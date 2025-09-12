const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(morgan('dev'));

// Usuarios
app.use('/usuarios', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
}));

app.use(
  '/vehiculos',
  createProxyMiddleware({
    target: 'http://localhost:3003',
    changeOrigin: true,
  })
);

// Reseñas
app.use('/resenas', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true
}));

// Notificaciones
app.use('/notificaciones', createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true,
  pathRewrite: { '^/notificaciones': '/' } // 👈 Agrega esta línea
}));

app.listen(4000, () => {
  console.log('API Gateway corriendo en http://localhost:4000');
});

