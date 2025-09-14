### Guia para la base de datos y tabla de Reseñas:

create database ResenasWeb;
use ResenasWeb;

CREATE TABLE resenas (
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idVehiculo INT NOT NULL,
    comentario VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

### Verificar:
describe resenas;