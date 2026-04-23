console.log("API >>> ", API);

let carrito = [];

function formatearPrecio(valor) {
  return `RD$${valor.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  })}`;
}

function crearTarjetaCarrito(carritoItem) {
  return `<div class="carrito-item" data-producto-id="${carritoItem.producto_id}">
  
  <div class="carrito-item-img">
    <img src="${carritoItem.imagen}" alt="${carritoItem.nombre}">
  </div>

  <div class="carrito-item-info">
    <p class="carrito-item-marca">${carritoItem.marca}</p>
    <h3 class="carrito-item-nombre">${carritoItem.nombre}</h3>
    <p class="carrito-item-precio">${formatearPrecio(carritoItem.precio)}</p>
  </div>

  <div class="carrito-item-actions">
    
    <div class="cantidad-control">
      <button class="btn-cantidad btn-restar" data-producto-id="${carritoItem.producto_id}">-</button>
      <span class="cantidad">${carritoItem.cantidad}</span>
      <button class="btn-cantidad btn-sumar" data-producto-id="${carritoItem.producto_id}">+</button>
    </div>

    <p class="carrito-item-subtotal">
      RD$${formatearPrecio(carritoItem.precio * carritoItem.cantidad)}
    </p>

    <button class="btn-eliminar" data-producto-id="${carritoItem.producto_id}">Eliminar</button>

  </div>

</div>`;
}

const carritoLista = document.getElementById("carritoLista");
const carritoVacio = document.getElementById("carritoVacio");
const resumen = {
  cantidad: document.getElementById("resumenCantidad"),
  subtotal: document.getElementById("resumenSubtotal"),
  envio: document.getElementById("resumenEnvio"),
  total: document.getElementById("resumenTotal"),
};

function renderCarrito(lista) {
  if (!carritoLista) {
    return console.error("No se encontró el contenedor del carrito");
  }

  if (!lista || lista.length === 0) {
    carritoLista.innerHTML = "";
    carritoVacio.classList.remove("oculto");
    resumen.cantidad.textContent = "0";
    resumen.subtotal.textContent = "RD$0.00";
    resumen.envio.textContent = "RD$0.00";
    resumen.total.textContent = "RD$0.00";
    return;
  }

  carritoVacio.classList.add("oculto");

  carritoLista.innerHTML = lista
    .map((item) => crearTarjetaCarrito(item))
    .join("");

  let totalCantidad = 0;
  let totalSubtotal = 0;
  let totalEnvio;
  let totalTotal;

  lista.forEach((item) => {
    totalCantidad += item.cantidad;
    totalSubtotal += item.precio * item.cantidad;
  });

  totalEnvio = totalSubtotal * 0.01;
  totalTotal = totalSubtotal + totalEnvio;

  resumen.cantidad.textContent = totalCantidad;
  resumen.subtotal.textContent = formatearPrecio(totalSubtotal);
  resumen.envio.textContent = formatearPrecio(totalEnvio);
  resumen.total.textContent = formatearPrecio(totalTotal);
}

async function cargarCarrito() {
  try {
    const response = await fetch(API + "/api/carrito/obtener", {
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(
        data.error || "No se pudieron obtener productos al carrito",
      );
    }

    carrito = data.carrito;

    renderCarrito(data.carrito);
    registrarEventosCarrito();
  } catch (error) {
    console.error("No se pudieron cargar los productos al carrito >>>", error);
  }
}

function registrarEventosCarrito() {
  const btnEliminar = document.querySelectorAll(".btn-eliminar");

  btnEliminar.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productoId = btn.dataset.productoId;
      try {
        const response = await fetch(
          `${API}/api/carrito/eliminar/${productoId}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "Error al eliminar producto del carrito >>>",
            errorData.error,
          );
          return;
        }

        cargarCarrito();
      } catch (error) {
        console.error("Error al eliminar producto del carrito >>>", error);
      }
    });
  });

  const btnSumar = document.querySelectorAll(".btn-sumar");

  btnSumar.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productoId = btn.dataset.productoId;
      try {
        const response = await fetch(API + "/api/carrito/agregar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            producto_id: productoId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "Error al agregar un producto mas al carrito >>>",
            errorData.error,
          );
          return;
        }

        cargarCarrito();
      } catch (error) {
        console.error("Error al agregar un producto mas al carrito >>>", error);
      }
    });
  });

  const btnRestar = document.querySelectorAll(".btn-restar");

  btnRestar.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productoId = btn.dataset.productoId;

      const item = carrito.find((i) => i.producto_id == productoId);

      if (!item) {
        console.error("El item no existe");
        return;
      }

      if (item.cantidad > 1) {
        try {
          const itemResponse = await fetch(
            API + `/api/carrito/actualizar-cantidad/${productoId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                cantidad: item.cantidad - 1,
              }),
            },
          );

          if (!itemResponse.ok) {
            const errorData = await itemResponse.json();
            console.error("Error en la respuesta", errorData.error);
            return;
          }

          cargarCarrito();
        } catch (error) {
          console.error("Error al restar producto", error);
        }
      } else {
        try {
          const itemResponse = await fetch(
            API + `/api/carrito/eliminar/${productoId}`,
            {
              method: "DELETE",
              credentials: "include",
            },
          );

          if (!itemResponse.ok) {
            const errorData = await itemResponse.json();
            console.error("Error en la respuesta", errorData.error);
            return;
          }

          cargarCarrito();
        } catch (error) {
          console.error("Error al eliminar producto", error);
        }
      }
    });
  });
}

cargarCarrito();
