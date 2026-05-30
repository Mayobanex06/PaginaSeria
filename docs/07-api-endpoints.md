# Endpoints de la API

Este documento registra los endpoints principales del backend. Debe actualizarse cada vez que se agregue, elimine o cambie una ruta.

## Formato recomendado

Cada endpoint debe documentarse con:

- Metodo HTTP.
- Ruta.
- Descripcion.
- Body esperado, si aplica.
- Respuesta exitosa.
- Posibles errores.
- Indicacion de si requiere autenticacion.
- Indicacion de si requiere rol administrador.

---

# Autenticacion

## POST /api/auth/login

Permite iniciar sesion en el sistema.

### Requiere autenticacion

No.

### Body esperado

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

### Respuesta exitosa

```json
{
  "ok": true,
  "mensaje": "Login exitoso"
}
```

### Posibles errores

```json
{
  "ok": false,
  "mensaje": "Credenciales incorrectas"
}
```

## POST /api/auth/register

Permite registrar un nuevo usuario.

### Requiere autenticacion

No.

### Body esperado

```json
{
  "nombre": "Usuario",
  "email": "usuario@email.com",
  "password": "123456"
}
```

### Respuesta exitosa

```json
{
  "ok": true,
  "mensaje": "Usuario registrado correctamente"
}
```

## POST /api/auth/logout

Permite cerrar la sesion actual.

### Requiere autenticacion

Si.

### Respuesta exitosa

```json
{
  "ok": true,
  "mensaje": "Sesion cerrada correctamente"
}
```

## GET /api/me

Devuelve la informacion del usuario autenticado.

### Requiere autenticacion

Si.

### Respuesta exitosa

```json
{
  "ok": true,
  "user": {
    "id_usuario": 1,
    "nombre": "Usuario",
    "email": "usuario@email.com",
    "rol": "User"
  }
}
```

---

# Productos

## GET /api/productos

Devuelve la lista de productos activos disponibles para la tienda.

### Requiere autenticacion

No necesariamente. Depende de la regla final del proyecto.

### Respuesta exitosa

```json
{
  "ok": true,
  "productos": []
}
```

---

# Carrito

## GET /api/carrito/obtener

Devuelve los productos agregados al carrito del usuario autenticado.

### Requiere autenticacion

Si.

### Respuesta exitosa

```json
{
  "ok": true,
  "carrito": []
}
```

## POST /api/carrito/agregar

Agrega un producto al carrito.

### Requiere autenticacion

Si.

### Body esperado

```json
{
  "producto_id": 1,
  "cantidad": 1
}
```

### Respuesta exitosa

```json
{
  "ok": true,
  "mensaje": "Producto agregado al carrito"
}
```

## PATCH /api/carrito/actualizar-cantidad/:productoId

Actualiza la cantidad de un producto en el carrito.

### Requiere autenticacion

Si.

### Body esperado

```json
{
  "cantidad": 2
}
```

## DELETE /api/carrito/eliminar/:productoId

Elimina un producto del carrito.

### Requiere autenticacion

Si.

---

# Administracion de productos

## GET /api/admin/productos

Devuelve los productos para el panel administrativo.

### Requiere autenticacion

Si.

### Requiere administrador

Si.

## POST /api/admin/productos

Crea un nuevo producto.

### Requiere autenticacion

Si.

### Requiere administrador

Si.

### Body esperado

```json
{
  "nombre": "iPhone 15",
  "marca": "Apple",
  "descripcion": "Celular Apple",
  "precio": 50000,
  "stock": 5,
  "imagen": "iphone15.jpg",
  "categoria": "Smartphone"
}
```

## PUT /api/admin/productos/:id

Edita la informacion de un producto existente.

### Requiere autenticacion

Si.

### Requiere administrador

Si.

## PATCH /api/admin/producto/:id/inactivar

Inactiva un producto sin eliminarlo fisicamente de la base de datos.

### Requiere autenticacion

Si.

### Requiere administrador

Si.

---

# Administracion de usuarios

## GET /api/admin/usuarios

Devuelve los usuarios registrados para el panel administrativo.

### Requiere autenticacion

Si.

### Requiere administrador

Si.

## POST /api/admin/usuarios/agregar

Crea un usuario desde el panel administrativo.

### Requiere autenticacion

Si.

### Requiere administrador

Si.

## PUT /api/admin/usuarios/:id

Actualiza los datos de un usuario.

### Requiere autenticacion

Si.

### Requiere administrador

Si.

## PATCH /api/admin/usuarios/eliminar/:id

Inactiva o elimina logicamente un usuario.

### Requiere autenticacion

Si.

### Requiere administrador

Si.

---

# Nota importante

Este documento debe corregirse con los nombres exactos de las rutas reales del backend. No debe convertirse en una lista inventada. Si una ruta cambia en el codigo, tambien debe cambiar aqui.
