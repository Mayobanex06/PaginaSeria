export function formatearPrecio(valor) {
  return `RD$${Number(valor).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
