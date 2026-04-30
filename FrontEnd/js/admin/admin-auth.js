async function verificarAdmin() {
  try {
    const response = await fetch(API2 + "/api/me", {
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    if (!data.ok || data.user.rol !== "Admin") {
      return false;
    }

    console.log("Acceso permitido, ande tranquilo");
    return true;
  } catch (error) {
    console.error("Error al validar rol del usuario", error);
    return false;
  }
}
