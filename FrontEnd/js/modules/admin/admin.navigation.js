export async function mostrarSeccion({
  seccion,
  botones,
  secciones,
  OnProductos,
  OnUsuarios,
}) {
  botones.forEach((boton) => {
    boton.classList.remove("admin-opcion-activa");
  });

  const botonActivo = document.querySelector(
    `.admin-opcion[data-seccion="${seccion}"]`,
  );

  botonActivo?.classList.add("admin-opcion-activa");

  secciones.forEach((panel) => {
    panel.classList.add("oculto");
  });

  document.getElementById(`panel-${seccion}`).classList.remove("oculto");

  if (seccion === "productos") {
    await OnProductos();
  }

  if (seccion === "usuarios") {
    await OnUsuarios();
  }
}
