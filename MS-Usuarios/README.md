## Comandos para la base de datos de 'MS-Usuarios':

CREATE DATABASE UsuariosWeb;
USE UsuariosWeb;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL);

### Para verificar:

DESCRIBE usuarios;