## Comandos para la base de datos de 'MS-Usuarios':

CREATE DATABASE UsuariosWeb;
USE UsuariosWeb;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL);

### Para verificar:

DESCRIBE usuarios;