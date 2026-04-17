INSERT INTO usuarios (nombre, email, password, rol, estado)
VALUES ('Alfonso', 'alfonso@email.com', '123456', 'User', 1);

SELECT * FROM usuarios;

SELECT * FROM usuarios
WHERE id_usuario = 1;

UPDATE usuarios
SET nombre = 'Alfonso Uribe',
    email = 'alfonsouribe@email.com',
    rol = 'Admin',
    estado = 1
WHERE id_usuario = 1;

DELETE FROM usuarios
WHERE id_usuario = 1;