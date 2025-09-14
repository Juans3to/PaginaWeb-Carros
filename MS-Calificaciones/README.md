### Guia para la base de datos y tabla de Calificaciones:

create database CalificacionesWeb;
use CalificacionesWeb;

CREATE TABLE calificaciones (
    idCalificacion INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idVehiculo INT NOT NULL,
    estrellas INT CHECK (estrellas BETWEEN 1 AND 5),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

### Verificar:
describe calificaciones;