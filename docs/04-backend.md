# Backend

El backend del proyecto esta desarrollado con Node.js y Express. Su funcion principal es actuar como intermediario entre el frontend y la base de datos.

## Responsabilidades principales

- Procesar solicitudes del frontend.
- Validar datos recibidos.
- Gestionar registro e inicio de sesion.
- Crear y verificar sesiones.
- Proteger rutas que requieren autenticacion.
- Proteger rutas que requieren rol de administrador.
- Gestionar productos.
- Gestionar usuarios.
- Gestionar carrito de compras.
- Enviar respuestas JSON al frontend.

## Organizacion recomendada

La estructura interna recomendada para el backend es:

```txt
Backend/
│
├── config/          # Configuracion general y conexion a base de datos
├── controllers/     # Logica de cada modulo
├── middlewares/     # Autenticacion, autorizacion y manejo de errores
├── routes/          # Definicion de rutas API
├── utils/           # Funciones auxiliares
└── server.js        # Archivo principal del servidor
```

Si el proyecto todavia no esta exactamente asi, la documentacion debe adaptarse a la estructura real.

## Autenticacion

El sistema utiliza autenticacion mediante correo y contraseña.

Flujo general:

1. El usuario envia sus credenciales desde el frontend.
2. El backend busca el usuario por correo.
3. El backend verifica que el usuario este activo.
4. El backend compara la contraseña enviada con la contraseña cifrada almacenada.
5. Si los datos son correctos, se crea una sesion.
6. El servidor envia una cookie al navegador.

## Sesiones

El sistema maneja sesiones mediante cookies. Cuando un usuario inicia sesion correctamente, el backend genera un identificador de sesion y lo asocia al usuario.

Cada vez que el frontend solicita informacion protegida, el backend revisa la cookie y valida si la sesion sigue activa.

## Middlewares importantes

### Middleware de autenticacion

Verifica si el usuario tiene una sesion valida.

Se usa en rutas como:

- Obtener usuario actual.
- Carrito de compras.
- Acciones privadas del usuario.

### Middleware de administrador

Verifica si el usuario autenticado tiene rol de administrador.

Se usa en rutas como:

- Gestion de productos.
- Gestion de usuarios.
- Panel administrativo.

## Validaciones recomendadas

El backend debe validar siempre:

- Campos vacios.
- Tipos de datos incorrectos.
- IDs invalidos.
- Correos con formato incorrecto.
- Contraseñas vacias o demasiado debiles.
- Productos inexistentes.
- Productos inactivos.
- Stock insuficiente.
- Usuarios inactivos.

## Respuestas JSON

Se recomienda mantener un formato consistente.

Respuesta exitosa:

```json
{
  "ok": true,
  "mensaje": "Operacion realizada correctamente"
}
```

Respuesta con error:

```json
{
  "ok": false,
  "mensaje": "Descripcion del error"
}
```

## Errores comunes que se deben evitar

- Confiar solo en validaciones del frontend.
- Exponer informacion sensible en errores.
- No verificar el rol del usuario en rutas administrativas.
- No usar consultas parametrizadas.
- Guardar contraseñas sin cifrar.
- Devolver datos innecesarios del usuario.
- No manejar correctamente sesiones expiradas.
