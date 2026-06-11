# Instalacion del proyecto

Este documento explica como preparar el proyecto CoreTech / PaginaSeria en un entorno local.

## Requisitos previos

Antes de iniciar, se recomienda tener instalado:

- Git
- Node.js
- npm
- MySQL
- Visual Studio Code
- Extension Live Server, si se desea abrir el frontend desde VS Code

## 1. Clonar el repositorio

```bash
git clone https://github.com/Mayobanex06/PaginaSeria.git
```

## 2. Entrar a la carpeta del proyecto

```bash
cd PaginaSeria
```

## 3. Instalar dependencias

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json` y crea la carpeta `node_modules` localmente.

## 4. Configurar variables de entorno

El backend debe tener un archivo `.env` con las variables necesarias para conectarse a la base de datos y configurar el servidor.

Ejemplo de estructura:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=nombre_base_datos
COOKIE_SECRET=clave_secreta
```

El archivo `.env` real no debe subirse a GitHub. En su lugar, se recomienda crear un archivo `.env.example` con valores de ejemplo.

## 5. Configurar la base de datos

1. Abrir MySQL.
2. Crear la base de datos del proyecto.
3. Importar el script SQL ubicado en la carpeta `Database`.
4. Verificar que las tablas principales existan correctamente.

Tablas esperadas:

- `usuarios`
- `productos`
- `carrito_items`

## 6. Ejecutar el backend

El comando exacto depende de los scripts definidos en el proyecto. Si existe un script como `dev`, se puede ejecutar:

```bash
npm run dev
```

Si no existe, se debe ejecutar directamente el archivo principal del backend. Ejemplo:

```bash
node Backend/server.js
```

Ajustar el comando segun el nombre real del archivo principal.

## 7. Ejecutar el frontend

El frontend se puede abrir desde la carpeta `FrontEnd` usando Live Server o abriendo directamente los archivos HTML en el navegador.

Recomendacion: usar Live Server para evitar problemas de rutas relativas y carga de recursos.

## 8. Ejecutar pruebas con Playwright

```bash
npx playwright test
```

Para abrir el reporte:

```bash
npx playwright show-report
```

## Problemas comunes

### Error de conexion con la base de datos

Revisar:

- Usuario de MySQL.
- Contraseña.
- Nombre de la base de datos.
- Puerto de MySQL.
- Archivo `.env`.

### El frontend no conecta con el backend

Revisar:

- Que el backend este ejecutandose.
- Que el puerto sea correcto.
- Que la URL base del frontend apunte al backend correcto.
- Que las peticiones `fetch` usen `credentials: "include"` cuando se trabaje con cookies.

### Error con `node_modules`

No se debe copiar ni subir `node_modules`. Si faltan dependencias, ejecutar:

```bash
npm install
```
