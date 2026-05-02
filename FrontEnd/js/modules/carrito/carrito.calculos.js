export function calcularTotales(lista) {
  if (!lista || lista.length === 0) {
    return {
      cantidad: 0,
      subtotal: 0,
      envio: 0,
      total: 0,
    };
  }

  let cantidad = 0;
  let subtotal = 0;

  lista.forEach((item) => {
    cantidad += Number(item.cantidad);
    subtotal += Number(item.precio) * Number(item.cantidad);
  });

  const envio = subtotal * 0.01;
  const total = subtotal + envio;

  return {
    cantidad,
    subtotal,
    envio,
    total,
  };
}
