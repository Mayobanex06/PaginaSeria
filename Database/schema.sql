CREATE DATABASE IF NOT EXISTS coretech_db;
USE coretech_db;

DROP TABLE IF EXISTS direcciones;
DROP TABLE IF EXISTS carritos_items;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('Admin', 'User') NOT NULL,
  estado TINYINT(1) DEFAULT 1,
  ultimo_login DATETIME,
  creado_hace DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  marca VARCHAR(50) NOT NULL,
  descripcion VARCHAR(255) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  imagen VARCHAR(255) NOT NULL,
  categoria ENUM('Smartphone', 'Accesorio') NOT NULL,
  estado TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE carrito_items (
  id_item INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  agregado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (usuario_id, producto_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id_producto) ON DELETE CASCADE
);

CREATE TABLE direcciones (
  id_direccion INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  direccion VARCHAR(255),
  ciudad VARCHAR(50),
  pais VARCHAR(50),
  codigo_postal VARCHAR(20),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
);