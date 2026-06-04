export function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const IMAGEN_RESPALDO = "imagen-no-disponible.png";

const NOMBRE_IMAGEN_VALIDO =
  /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i;

function construirRutaImagen(nombreArchivo) {
  return new URL(
    `../../assets/Imagenes/Productos/${nombreArchivo}`,
    import.meta.url,
  ).href;
}

export function obtenerRutaImagenSegura(imagen) {
  const nombreArchivo = String(imagen ?? "").trim();

  if (!NOMBRE_IMAGEN_VALIDO.test(nombreArchivo)) {
    return construirRutaImagen(IMAGEN_RESPALDO);
  }

  return construirRutaImagen(nombreArchivo);
}

export function obtenerRutaImagenRespaldo() {
  return construirRutaImagen(IMAGEN_RESPALDO);
}