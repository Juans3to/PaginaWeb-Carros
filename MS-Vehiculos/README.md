### Guia para la base de datos y tabla de Vehiculos:

create database VehiculosWeb;
use VehiculosWeb;

CREATE TABLE autos (
id INT AUTO_INCREMENT PRIMARY KEY,
Modelo VARCHAR(100),
Anio VARCHAR(10),
Estado VARCHAR(20),
Km VARCHAR(20),
Precio_en_dolares VARCHAR(20),
MSRP VARCHAR(20));


CREATE TABLE publicaciones (
idPublicacion INT AUTO_INCREMENT PRIMARY KEY,
idUsuario VARCHAR(100) NOT NULL,
idVehiculo INT NOT NULL,
fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
estado ENUM('activo', 'vendido') DEFAULT 'activo',
FOREIGN KEY (idVehiculo) REFERENCES autos(id));

### Verificar:
describe autos;

> Publicaciones esta solo por si algo, pero no se usa.

