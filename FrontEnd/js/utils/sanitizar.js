export function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function obtenerRutaImagenSegura(imagen) {
  const ruta = String(imagen ?? "").trim();

  const rutaPermitida =
    /^\/assets\/Imagenes\/Productos\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i;

  if (!rutaPermitida.test(ruta)) {
    return "/assets/Imagenes/Productos/imagen-no-disponible.png";
  }

  return ruta;
}
