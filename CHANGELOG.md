## Formato para proximos cambios

## AAAA-MM-DD

### Agregado

- Nueva funcionalidad o documento agregado.
  -Css arreglado nuevo estilo del proyecto

### Cambiado

- Modificacion importante realizada.
- El archivo Finalizar.js fue arreglado de un error que no dejaba vaciar el carrito

### Corregido

- Error corregido.

### Pendiente

- Algo que falta por completar.

# Historial de cambios

Todos los cambios importantes del proyecto deben registrarse en este archivo.

El formato recomendado es separar los avances por fecha y clasificarlos como agregado, cambiado, corregido o pendiente.

## 2026-06-04

### Agregado

- Protección de cabeceras HTTP mediante `Helmet`.
- Límite de intentos para inicio de sesión mediante `express-rate-limit`.
- Límite de intentos para registro de usuarios.
- Archivo `.env.example` para documentar las variables de entorno requeridas sin exponer credenciales reales.
- Tabla `sesiones` en MySQL para persistir sesiones de usuarios.
- Llave foránea entre `sesiones.usuario_id` y `usuarios.id_usuario`.
- Índices `idx_sesiones_usuarios` e `idx_sesiones_expiracion`.
- Validación de imágenes locales mediante `obtenerRutaImagenSegura()`.
- Imagen de respaldo para productos con archivos inexistentes o rutas inválidas.
- Función para vaciar completamente el carrito desde la interfaz.
- Validación adicional del estado activo del usuario en rutas protegidas.
- Revocación de sesiones cuando el usuario cierra sesión, cuando la sesión expira o cuando la cuenta queda inactiva.

### Cambiado

- Las sesiones dejaron de almacenarse temporalmente en memoria y ahora se guardan en MySQL.
- El login ahora normaliza el correo electrónico con `trim()` y `toLowerCase()`.
- El registro ahora valida el formato del correo electrónico y exige contraseñas de al menos 8 caracteres.
- La creación de usuarios desde el panel administrativo exige contraseñas de al menos 8 caracteres.
- Las cookies de sesión ahora utilizan `httpOnly`, `sameSite`, `path` y `secure` según el entorno.
- Los errores internos del backend dejaron de enviarse al cliente.
- El endpoint de salud dejó de exponer detalles técnicos de la conexión a la base de datos.
- Las rutas administrativas validan autenticación, estado activo y rol `Admin`.
- Las rutas del carrito validan autenticación antes de consultar o modificar datos.
- Los IDs, cantidades, precios, stock y estados se convierten y validan según su tipo.
- Los textos dinámicos del frontend se escapan antes de insertarse mediante `innerHTML`.
- La base de datos almacena solamente el nombre del archivo de imagen del producto, no rutas completas dependientes del entorno.
- El frontend construye las URLs de imágenes mediante `import.meta.url` para funcionar tanto en desarrollo como en producción.

### Corregido

- Se eliminó el seguimiento accidental del archivo `.env` en Git.
- Se corrigió la inclusión accidental de carpetas `node_modules`.
- Se corrigió la posibilidad de enviar cantidades decimales al carrito.
- Se corrigió la posibilidad de utilizar IDs decimales o inválidos.
- Se corrigió la exposición del estado de una cuenta antes de validar la contraseña.
- Se corrigió la pérdida de sesiones al reiniciar el backend.
- Se corrigieron rutas de imágenes que dependían de la carpeta utilizada por Live Server.
- Se corrigió la carga de imágenes inexistentes mediante una imagen de respaldo.
- Se agregó soporte funcional para vaciar el carrito completo.
- Se limito el tamaño máximo de los cuerpos JSON y formularios recibidos por Express.
- Se agrego validación del origen de solicitudes sensibles como medida adicional contra CSRF.
- Ya esta definida la configuración definitiva de CORS para el entorno de producción.

### Pendiente

- Automatizar pruebas de autenticación, autorización y seguridad con Playwright.
- Ejecutar `npm audit` y revisar vulnerabilidades de dependencias antes del merge.
- Documentar despliegue cuando se defina el hosting final.

## 2026-05-21

### Agregado

- Documentacion inicial del proyecto.
- README principal del repositorio.
- Documentacion de instalacion.
- Documentacion de arquitectura.
- Documentacion basica del backend.
- Documentacion basica del frontend.
- Documentacion basica de base de datos.
- Documentacion de endpoints API.
- Documentacion de pruebas con Playwright.
- Manual basico de usuario.
- Manual basico de administrador.
- Guia de documentacion futura.

### Cambiado

- Se organiza la documentacion dentro de la carpeta `docs`.
- Se define una estructura clara para explicar el proyecto desde lo general hasta lo tecnico.

### Pendiente

- Completar endpoints reales segun el estado final del backend.
- Añadir capturas de pantalla del sistema.
- Añadir diagrama entidad-relacion final.
- Añadir ejemplos reales de respuestas API.
- Documentar despliegue cuando el proyecto este publicado.
- Documentar flujo completo de compra cuando este terminado.
