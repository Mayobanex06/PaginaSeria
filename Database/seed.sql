INSERT INTO usuarios (nombre, email, password, rol, estado)
VALUES ('Alfonso', 'alfonso@email.com', '123456', 'User', 1);

SELECT * FROM usuarios;

SELECT * FROM usuarios
WHERE id_usuario > 0;

UPDATE usuarios
SET rol = 'Admin'
WHERE id_usuario = 3;

DELETE FROM usuarios
WHERE id_usuario = 1;

INSERT INTO productos
(nombre, marca, descripcion, precio, stock, imagen, categoria, estado)
VALUES
('Galaxy A55', 'Samsung', 'Smartphone Samsung Galaxy A55', 18999.99, 10, '/assets/Imagenes/Productos/galaxy_a55.jpg', 'Smartphone', 1),
('Galaxy S24 Ultra', 'Samsung', 'Smartphone Samsung Galaxy S24 Ultra', 54999.99, 8, '/assets/Imagenes/Productos/galaxy_s24_ultra.png', 'Smartphone', 1),
('Galaxy S25 Ultra', 'Samsung', 'Smartphone Samsung Galaxy S25 Ultra', 64999.99, 6, '/assets/Imagenes/Productos/galaxy_s25_ultra.png', 'Smartphone', 1),
('Galaxy Z Fold6', 'Samsung', 'Smartphone plegable Samsung Galaxy Z Fold6', 72999.99, 4, '/assets/Imagenes/Productos/galaxy_z_fold6.jpg', 'Smartphone', 1),
('Galaxy Z Fold7', 'Samsung', 'Smartphone plegable Samsung Galaxy Z Fold7', 82999.99, 3, '/assets/Imagenes/Productos/galaxy_z_fold7.png', 'Smartphone', 1),

('iPhone 14', 'Apple', 'Smartphone Apple iPhone 14', 32999.99, 9, '/assets/Imagenes/Productos/iphone-14.jpg', 'Smartphone', 1),
('iPhone SE 3', 'Apple', 'Smartphone Apple iPhone SE 3', 21999.99, 7, '/assets/Imagenes/Productos/iphone-se3.png', 'Smartphone', 1),
('iPhone 15 Pro Max', 'Apple', 'Smartphone Apple iPhone 15 Pro Max', 59999.99, 5, '/assets/Imagenes/Productos/iphone_15_pro_max.jpeg', 'Smartphone', 1),
('iPhone 16 Pro Max', 'Apple', 'Smartphone Apple iPhone 16 Pro Max', 74999.99, 5, '/assets/Imagenes/Productos/iphone_16_pro_max.png', 'Smartphone', 1),

('Redmi Note 13 Pro', 'Xiaomi', 'Smartphone Xiaomi Redmi Note 13 Pro', 19999.99, 10, '/assets/Imagenes/Productos/redmi_note_13_pro.jpg', 'Smartphone', 1),
('Xiaomi 13T Pro', 'Xiaomi', 'Smartphone Xiaomi 13T Pro', 28999.99, 6, '/assets/Imagenes/Productos/xiaomi_13t_pro.jpg', 'Smartphone', 1),
('Xiaomi 14 Ultra', 'Xiaomi', 'Smartphone Xiaomi 14 Ultra', 45999.99, 4, '/assets/Imagenes/Productos/xiaomi_14_ultra.png', 'Smartphone', 1);

SELECT * FROM productos
WHERE id_producto > 0; 

SELECT * FROM carrito
WHERE id_item > 0; 