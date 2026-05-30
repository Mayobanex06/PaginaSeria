# Base de datos

El proyecto utiliza MySQL como sistema de base de datos. La base de datos almacena la informacion principal relacionada con usuarios, productos y carrito de compras.

## Tablas principales

### usuarios

Almacena los usuarios registrados en el sistema.

Campos principales recomendados:

| Campo | Descripcion |
|---|---|
| id_usuario | Identificador unico del usuario |
| nombre | Nombre del usuario |
| email | Correo electronico |
| password | Contraseña cifrada |
| rol | Rol del usuario, por ejemplo Admin o User |
| estado | Indica si el usuario esta activo o inactivo |
| ultimo_login | Fecha del ultimo inicio de sesion |
| creado_hace | Fecha de creacion del usuario |

### productos

Almacena los productos disponibles en la tienda.

Campos principales recomendados:

| Campo | Descripcion |
|---|---|
| id_producto | Identificador unico del producto |
| nombre | Nombre del producto |
| marca | Marca del producto |
| descripcion | Descripcion del producto |
| precio | Precio del producto |
| stock | Cantidad disponible |
| imagen | Ruta o nombre de la imagen |
| categoria | Categoria del producto |
| estado | Indica si el producto esta activo o inactivo |
| creado_hace | Fecha de creacion |
| actualizado_hace | Fecha de ultima actualizacion |

### carrito_items

Almacena los productos agregados al carrito por cada usuario.

Campos principales recomendados:

| Campo | Descripcion |
|---|---|
| id_item | Identificador unico del registro |
| usuario_id | Usuario dueño del carrito |
| producto_id | Producto agregado al carrito |
| cantidad | Cantidad del producto |
| agregado_en | Fecha en que se agrego el producto |

## Relaciones

- Un usuario puede tener varios productos en el carrito.
- Un producto puede estar en el carrito de varios usuarios.
- La tabla `carrito_items` relaciona usuarios con productos.

## Reglas importantes

- No debe existir un producto con stock negativo.
- No se debe permitir agregar al carrito un producto inactivo.
- No se debe permitir agregar mas cantidad que el stock disponible.
- El correo del usuario debe ser unico.
- El nombre de usuario puede ser unico si asi se define en el sistema.
- Las contraseñas deben almacenarse cifradas, nunca en texto plano.

## Recomendacion de documentacion futura

Cuando la base de datos este mas estable, se debe agregar:

- Diagrama entidad-relacion.
- Script SQL final.
- Datos de prueba.
- Explicacion de llaves primarias.
- Explicacion de llaves foraneas.
- Restricciones importantes.
- Decisiones de diseño de la base de datos.
