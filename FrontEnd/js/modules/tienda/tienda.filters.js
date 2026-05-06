export function filtrarProductosPorCategoria(productos, categoria) {
  if (categoria === "all") {
    return productos;
  }

  return productos.filter((producto) => producto.marca === categoria);
}
