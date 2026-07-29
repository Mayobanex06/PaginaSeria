function normalizarTexto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

function normalizarEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function normalizarTelefono(telefono) {
  if (typeof telefono !== "string") {
    return "";
  }

  return telefono.replace(/\D/g, "");
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordValida(password) {
  return typeof password === "string" && password.length >= 8;
}

function obtenerIdValido(valor) {
  const numero = Number(valor);

  if (!Number.isInteger(numero) || numero <= 0) {
    return null;
  }

  return numero;
}

function numeroMayorQueCero(valor) {
  const numero = Number(valor);

  return !Number.isNaN(numero) && numero > 0;
}

function enteroMayorOIgualACero(valor) {
  const numero = Number(valor);

  return Number.isInteger(numero) && numero >= 0;
}

function enteroMayorOIgualAUno(valor) {
  const numero = Number(valor);

  return Number.isInteger(numero) && numero >= 1;
}

function obtenerEstadoValido(valor) {
  const estado = Number(valor);

  if (![0, 1].includes(estado)) {
    return null;
  }

  return estado;
}

function valorPermitido(valor, valoresPermitidos) {
  return valoresPermitidos.includes(valor);
}

module.exports = {
  normalizarTexto,
  normalizarEmail,
  emailValido,
  passwordValida,
  obtenerIdValido,
  numeroMayorQueCero,
  enteroMayorOIgualACero,
  enteroMayorOIgualAUno,
  obtenerEstadoValido,
  valorPermitido,
};