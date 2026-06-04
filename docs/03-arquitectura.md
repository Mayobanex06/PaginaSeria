# Arquitectura del proyecto

El proyecto esta organizado en tres capas principales: frontend, backend y base de datos. Ademas, cuenta con una carpeta de pruebas automatizadas y una carpeta de documentacion.

## Vista general

```txt
Usuario
  ↓
Frontend HTML/CSS/JS
  ↓ fetch()
Backend Node.js + Express
  ↓ consultas SQL
Base de datos MySQL
```

## Frontend

El frontend contiene las paginas visibles del sistema. Esta construido con HTML, CSS y JavaScript.

Responsabilidades principales:

- Mostrar la interfaz del usuario.
- Renderizar productos.
- Mostrar informacion de sesion.
- Enviar formularios de login y registro.
- Enviar solicitudes al backend.
- Administrar eventos de botones, filtros, carrito y panel administrativo.

## Backend

El backend esta desarrollado con Node.js y Express.

Responsabilidades principales:

- Recibir solicitudes HTTP.
- Validar datos recibidos desde el frontend.
- Gestionar autenticacion y sesiones.
- Proteger rutas privadas.
- Comunicarse con la base de datos.
- Devolver respuestas en formato JSON.

## Base de datos

La base de datos utiliza MySQL.

Responsabilidades principales:

- Almacenar usuarios.
- Almacenar productos.
- Almacenar productos agregados al carrito.
- Mantener relaciones entre usuarios y productos.

## Pruebas

Las pruebas automatizadas se gestionan con Playwright.

Responsabilidades principales:

- Validar flujos importantes del sistema.
- Probar navegacion.
- Probar formularios.
- Probar funcionalidades visibles desde la interfaz.

## Estructura del repositorio

```txt
PaginaSeria/
│
├── Backend/              # Servidor, rutas, controladores, middlewares y conexion a BD
├── Database/             # Scripts SQL de la base de datos
├── FrontEnd/             # HTML, CSS, JavaScript e imagenes
├── docs/                 # Documentacion tecnica y manuales
├── tests/                # Pruebas automatizadas con Playwright
├── package.json          # Dependencias y scripts del proyecto
├── playwright.config.js  # Configuracion de Playwright
└── README.md             # Presentacion principal del proyecto
```

## Criterio de separacion

La separacion del proyecto debe seguir esta logica:

- El frontend no debe consultar directamente la base de datos.
- El backend debe centralizar la logica de validacion y acceso a datos.
- La base de datos solo debe almacenar informacion estructurada.
- Las pruebas deben estar separadas del codigo principal.
- La documentacion debe explicar decisiones, instalacion y uso del sistema.

## Riesgo actual

El mayor riesgo de arquitectura en este tipo de proyecto es mezclar responsabilidades. Por ejemplo, poner demasiada logica de negocio en el frontend o repetir validaciones solo del lado del cliente. Las validaciones importantes deben estar tambien en el backend.
