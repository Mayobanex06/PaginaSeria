# Pruebas automatizadas con Playwright

El proyecto utiliza Playwright para realizar pruebas automatizadas sobre la interfaz web.

## Objetivo

El objetivo de las pruebas es verificar que las funcionalidades principales del sistema funcionen correctamente desde la perspectiva del usuario.

## Configuracion actual

El proyecto cuenta con el archivo:

```txt
playwright.config.js
```

La carpeta de pruebas es:

```txt
tests/
```

## Comandos principales

Ejecutar todas las pruebas:

```bash
npx playwright test
```

Ejecutar pruebas en modo visible:

```bash
npx playwright test --headed
```

Abrir la interfaz de Playwright:

```bash
npx playwright test --ui
```

Ver el reporte HTML:

```bash
npx playwright show-report
```

## Flujos recomendados para probar

### Pagina principal

- Verificar que la pagina carga correctamente.
- Verificar que el logo o nombre de la tienda aparece.
- Verificar que los enlaces principales funcionan.

### Tienda

- Verificar que la tienda carga.
- Verificar que aparecen productos.
- Verificar que los botones principales existen.
- Verificar que los filtros funcionan, si estan implementados.

### Registro

- Verificar que el formulario de registro aparece.
- Verificar validaciones de campos vacios.
- Verificar registro con datos validos.

### Login

- Verificar inicio de sesion con datos correctos.
- Verificar error con credenciales incorrectas.
- Verificar redireccion despues del login.

### Carrito

- Verificar que un usuario autenticado pueda agregar productos.
- Verificar que se pueda aumentar cantidad.
- Verificar que se pueda disminuir cantidad.
- Verificar que se pueda eliminar un producto.
- Verificar que el resumen del carrito se actualiza.

### Panel administrativo

- Verificar que solo un administrador pueda acceder.
- Verificar listado de productos.
- Verificar listado de usuarios.
- Verificar botones de editar y eliminar.

## Recomendaciones

- No probar todo de una vez.
- Crear pruebas pequeñas por funcionalidad.
- Mantener nombres claros en los archivos de prueba.
- Evitar depender de datos que cambian demasiado.
- Usar datos de prueba controlados cuando sea posible.
- No mezclar pruebas de usuario normal con pruebas de administrador en el mismo archivo si se vuelve confuso.

## Estructura recomendada

```txt
tests/
│
├── home.spec.js
├── auth.spec.js
├── tienda.spec.js
├── carrito.spec.js
└── admin.spec.js
```

## Riesgo actual

Si las pruebas se escriben sin preparar datos estables, pueden fallar aunque el sistema funcione. Por eso conviene tener usuarios de prueba y productos de prueba claramente definidos.
