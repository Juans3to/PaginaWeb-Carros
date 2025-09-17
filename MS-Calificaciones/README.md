### Guia para la base de datos y tabla de Calificaciones:

create database CalificacionesWeb;
use CalificacionesWeb;

CREATE TABLE calificaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  carroId INT NOT NULL,
  estrellas INT NOT NULL CHECK (estrellas BETWEEN 1 AND 5),
  creadoEn TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

### Verificar:
describe calificaciones;