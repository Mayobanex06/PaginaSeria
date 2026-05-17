export function filtrarLista(lista, filtros = {}) {
  return lista.filter((item) =>
    Object.entries(filtros).every(([clave, valor]) => {
      if (
        valor === "" ||
        valor === null ||
        valor === undefined ||
        valor === "todos"
      ) {
        return true;
      }

      const itemValor = item[clave];

      if (typeof itemValor === "string") {
        return itemValor.toLowerCase().includes(String(valor).toLowerCase());
      }

      return String(itemValor) === String(valor);
    }),
  );
}
