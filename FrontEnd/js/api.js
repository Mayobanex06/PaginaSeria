window.API_BASE = "http://localhost:3000";

// Módulo de funciones para interactuar con la API del backend

// Función generica para hacer solicitudes a la API

async function solicitud(url, options = {}) {
  try {
    const response = await fetch(`${window.API_BASE}${url}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },

      ...options,
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Error en la solicitud");
    }

    return data;
  } catch (error) {
    console.error("API ERROR >>>", error);
    throw error;
  }
}

export async function apiGet(url) {
  return solicitud(url, { method: "GET" });
}

export async function apiPost(url, body) {
  return solicitud(url, { method: "POST", body: JSON.stringify(body) });
}

export async function apiPatch(url, body) {
  return solicitud(url, { method: "PATCH", body: JSON.stringify(body) });
}

export async function apiDelete(url) {
  return solicitud(url, { method: "DELETE" });
}

export async function apiPut(url, body) {
  return solicitud(url, { method: "PUT", body: JSON.stringify(body) });
}
