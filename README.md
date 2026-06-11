# CoreTech / PaginaSeria

CoreTech es una plataforma web de comercio electronico orientada a la venta de celulares. El proyecto esta desarrollado con frontend en HTML, CSS y JavaScript, backend en Node.js con Express, base de datos MySQL y pruebas automatizadas con Playwright.

El objetivo principal del sistema es permitir que los usuarios puedan consultar productos, registrarse, iniciar sesion, agregar productos al carrito y que los administradores puedan gestionar productos y usuarios desde un panel administrativo.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MySQL
- Playwright
- Git y GitHub

## Estructura general del proyecto

```txt
PaginaSeria/
│
├── .github/workflows/
├── .vscode/
├── Backend/
├── Database/
├── FrontEnd/
├── docs/
├── tests/
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

## Funcionalidades principales

- Registro de usuarios.
- Inicio de sesion.
- Manejo de sesion mediante cookies.
- Visualizacion de productos.
- Filtrado y navegacion del catalogo.
- Carrito de compras.
- Panel administrativo.
- Gestion de productos.
- Gestion de usuarios.
- Pruebas automatizadas con Playwright.

## Requisitos previos

Antes de ejecutar el proyecto, se recomienda tener instalado:

- Node.js
- npm
- MySQL
- Git
- Visual Studio Code
- Extension Live Server, si se ejecuta el frontend localmente desde archivos HTML.

## Instalacion rapida

1. Clonar el repositorio:

git clone https://github.com/Mayobanex06/PaginaSeria.git

2. Entrar a la carpeta del proyecto:

```bash
cd PaginaSeria
```

3. Instalar las dependencias principales:

```bash
npm install
```

4. Configurar las variables de entorno necesarias para el backend (.env).

5. Importar la base de datos desde la carpeta `Database`.

6. Ejecutar el backend segun el script definido en el proyecto.

7. Abrir el frontend desde la carpeta `FrontEnd`.

## Pruebas automatizadas

El proyecto utiliza Playwright para realizar pruebas automatizadas. Para ejecutar las pruebas:

```bash
npx playwright test
```

Para abrir el reporte generado por Playwright:

```bash
npx playwright show-report
```

## Documentacion

La documentacion tecnica del proyecto se encuentra en la carpeta `docs`.

Documentos principales:

- `docs/01-descripcion-general.md`
- `docs/02-instalacion.md`
- `docs/03-arquitectura.md`
- `docs/04-backend.md`
- `docs/05-frontend.md`
- `docs/06-base-de-datos.md`
- `docs/07-api-endpoints.md`
- `docs/08-pruebas-playwright.md`
- `docs/09-seguridad.md`
- `docs/10-pendientes.md`
- `docs/manual-usuario.md`
- `docs/manual-admin.md`

## Estado actual

El proyecto se encuentra en desarrollo. Actualmente cuenta con estructura frontend, backend, base de datos, panel administrativo, carrito de compras y configuracion inicial de pruebas automatizadas.

## Nota importante

No se debe subir la carpeta `node_modules` al repositorio. Las dependencias deben instalarse localmente con `npm install`.
