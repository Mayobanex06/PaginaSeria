CREATE DATABASE IF NOT EXISTS coretech_db;
USE coretech_db;

DROP TABLE IF EXISTS compra_items;
DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS pagos;
DROP TABLE IF EXISTS direcciones_envio;
DROP TABLE IF EXISTS carritos_items;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS sesiones;
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

CREATE TABLE sesiones (
id_sesion CHAR(48) PRIMARY KEY,
usuario_id INT NOT NULL,
expira_en DATETIME NOT NULL,
creada_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT fk_sesiones_usuarios
		FOREIGN KEY (usuario_id)
		REFERENCES usuarios(id_usuario)
		ON DELETE CASCADE
);

CREATE INDEX idx_sesiones_usuarios
ON sesiones(usuario_id);

CREATE INDEX idx_sesiones_expiracion
ON sesiones(expira_en);


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

CREATE TABLE compras (
  id_compra INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  direccion_id INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  costo_envio DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  estado ENUM('pendiente_pago', 'pagada', 'enviada', 'entregada', 'cancelada') 
    NOT NULL DEFAULT 'pendiente_pago',
  creada_en DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario),
  FOREIGN KEY (direccion_id) REFERENCES direcciones_envio(id_direccion)
);

CREATE TABLE compra_items (
  id_item INT AUTO_INCREMENT PRIMARY KEY,
  compra_id INT NOT NULL,
  producto_id INT NOT NULL,
  nombre_producto VARCHAR(150) NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  cantidad INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,

  FOREIGN KEY (compra_id) REFERENCES compras(id_compra) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id_producto)
);

CREATE TABLE pagos (
  id_pago INT AUTO_INCREMENT PRIMARY KEY,
  compra_id INT NOT NULL,
  metodo_pago ENUM('tarjeta', 'paypal', 'transferencia') NOT NULL,
  estado_pago ENUM('pendiente', 'aprobado', 'rechazado', 'reembolsado') 
    NOT NULL DEFAULT 'pendiente',
  monto DECIMAL(10,2) NOT NULL,
  referencia_pago VARCHAR(150),
  fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (compra_id) REFERENCES compras(id_compra) ON DELETE CASCADE
);

CREATE TABLE direcciones_envio (
  id_direccion INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  nombre_recibe VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  provincia VARCHAR(80) NOT NULL,
  municipio VARCHAR(80) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  direccion_detallada VARCHAR(255) NOT NULL,
  referencia VARCHAR(255),
  es_principal TINYINT(1) DEFAULT 0,
  creada_en DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);


