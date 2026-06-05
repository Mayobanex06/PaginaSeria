# Frontend

El frontend del proyecto esta construido con HTML, CSS y JavaScript. Es la parte visible del sistema y permite que el usuario interactue con la tienda.

## Responsabilidades principales

- Mostrar las paginas del sistema.
- Renderizar productos y datos recibidos del backend.
- Capturar eventos del usuario.
- Solicitar datos al backend mediante una capa de servicios.
- Centralizar las peticiones HTTP en el archivo `api.js`.
- Mostrar mensajes de exito o error.
- Actualizar dinamicamente la interfaz.
- Controlar la visibilidad de opciones segun la sesion y el rol del usuario.

## Paginas principales

Las paginas principales del sistema son:

- Pagina de inicio.
- Pagina de tienda o catalogo.
- Pagina de carrito.
- Pagina de login.
- Pagina de registro.
- Pagina de administracion.

Los nombres exactos de los archivos deben documentarse segun esten definidos en la carpeta `FrontEnd`.

## Comunicacion con el backend

El frontend no deberia repetir directamente la logica de `fetch` en cada archivo. Para mantener el codigo organizado, la comunicacion con el backend se maneja mediante una capa centralizada.

La estructura correcta es la siguiente:

```txt
api.js = funciones genericas para realizar peticiones HTTP
services = funciones especificas que usan api.js
modules = logica visual, eventos, filtros y manejo del DOM
archivo principal = coordina la ejecucion de cada pagina
```

El archivo `api.js` es el encargado de realizar las peticiones reales al backend. Alli se definen funciones reutilizables como:

- `apiGet()`
- `apiPost()`
- `apiPut()`
- `apiPatch()`
- `apiDelete()`

Estas funciones contienen la logica general del `fetch`, como la URL base, el metodo HTTP, los headers, las credenciales y el manejo de la respuesta.

Ejemplo general de una funcion dentro de `api.js`:

```js
export async function apiGet(ruta) {
  const respuesta = await fetch(`${API_BASE}${ruta}`, {
    method: "GET",
    credentials: "include",
  });

  return await respuesta.json();
}
```

Cuando se usan cookies de sesion, es importante mantener:

```js
credentials: "include"
```

Esto permite que el navegador envie las cookies de sesion junto con la peticion al backend.

## Services

Los archivos dentro de `services/` no deben realizar directamente los `fetch`. Su funcion es crear metodos especificos y mas legibles para cada parte del sistema, utilizando las funciones genericas importadas desde `api.js`.

Ejemplo:

```js
import { apiGet } from "../api.js";

export async function obtenerProductos() {
  return apiGet("/admin/productos/obtener");
}
```

De esta forma, el resto del frontend no necesita conocer la logica interna del `fetch`. Solo utiliza funciones claras como:

- `obtenerProductos()`
- `obtenerUsuarios()`
- `agregarProductoCarrito()`
- `eliminarProductoCarrito()`
- `obtenerSesionActual()`

Esta separacion evita repetir codigo, centraliza la comunicacion con el backend y facilita cambios futuros. Por ejemplo, si luego cambia la forma de manejar errores o headers, se modifica principalmente `api.js`, no todos los archivos del frontend.

## Organizacion recomendada de JavaScript

Para evitar archivos demasiado grandes, se recomienda dividir el JavaScript por responsabilidad.

```txt
FrontEnd/
│
├── js/
│   ├── api.js
│   │   └── Funciones genericas para peticiones HTTP.
│   │
│   ├── services/
│   │   └── Funciones especificas que consumen api.js.
│   │
│   ├── modules/
│   │   └── Logica dividida por pagina o funcionalidad.
│   │
│   ├── utils/
│   │   └── Funciones auxiliares reutilizables.
│   │
│   └── archivo-principal.js
│       └── Archivo que se enlaza al HTML y coordina la pagina.
```

Una estructura mas especifica puede ser:

```txt
FrontEnd/
│
├── pages/
│   └── archivos HTML
│
├── styles/
│   └── archivos CSS
│
└── js/
    ├── api.js
    │
    ├── services/
    │   ├── admin.services.js
    │   ├── carrito.services.js
    │   ├── tienda.services.js
    │   └── user.services.js
    │
    ├── modules/
    │   ├── admin/
    │   ├── carrito/
    │   ├── tienda/
    │   └── user/
    │
    └── archivos principales por página
```

## Separacion recomendada

### `api.js`

Archivo encargado de centralizar los `fetch`.

Ejemplo:

```js
export async function apiPost(ruta, datos) {
  const respuesta = await fetch(`${API_BASE}${ruta}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(datos),
  });

  return await respuesta.json();
}
```

### Services

Archivos encargados de definir funciones específicas para cada recurso o módulo del sistema.

Ejemplo:

```js
import { apiGet, apiPost } from "../api.js";

export async function obtenerCarrito() {
  return apiGet("/carrito/obtener");
}

export async function agregarProductoCarrito(productoId, cantidad) {
  return apiPost("/carrito/agregar", {
    producto_id: productoId,
    cantidad,
  });
}
```

### UI

Archivos encargados de generar HTML o modificar la interfaz.

Ejemplo:

```js
export function crearCardProducto(producto) {
  return `<article class="producto-card">${producto.nombre}</article>`;
}
```

### Events

Archivos encargados de registrar eventos del DOM.

Ejemplo:

```js
export function registrarEventosCarrito() {
  // eventos de sumar, restar o eliminar productos
}
```

### Archivo principal

El archivo principal de cada pagina debe importar las funciones necesarias y coordinar la ejecucion.

Ejemplo:

```js
import { obtenerProductos } from "./services/admin.services.js";
import { listarTablaProductos } from "./modules/admin/admin.productos.ui.js";

async function iniciarAdmin() {
  const data = await obtenerProductos();

  if (data.ok) {
    listarTablaProductos(data.productos);
  }
}

iniciarAdmin();
```

## Buenas practicas

- No repetir codigo de `fetch` en distintos archivos.
- Mantener las peticiones HTTP centralizadas en `api.js`.
- Usar `services/` para funciones especificas y legibles.
- No mezclar demasiada logica en un solo archivo.
- Usar nombres claros para funciones y variables.
- Mantener las clases CSS coherentes con el HTML generado desde JavaScript.
- Validar datos en el frontend, pero no depender solo de esas validaciones.
- Mostrar mensajes claros al usuario.
- Evitar IDs duplicados en el HTML.
- Separar la logica visual, los eventos y las peticiones al backend.

## Riesgo actual

El principal riesgo del frontend es que crezca de forma desordenada. Si cada nueva funcionalidad se agrega directamente a un archivo grande, luego sera dificil corregir errores.

Otro riesgo seria usar `fetch` directamente en muchos archivos. Eso haria que cualquier cambio en la comunicacion con el backend tenga que repetirse en varias partes del proyecto. Por eso, la estructura mas conveniente es mantener `api.js` como punto central de las peticiones y usar `services/` como capa intermedia para funciones especificas.

La regla principal debe ser:

```txt
No llamar fetch directamente desde modules ni desde archivos principales.
Usar api.js para fetch.
Usar services para funciones especificas.
Usar modules para interfaz, eventos y logica del DOM.
```