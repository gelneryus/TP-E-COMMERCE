/**
 * Renderiza el contenido del carrito en el sidebar derecho.
 */
function renderizarSidebarDelCarrito() {
  const carrito = obtenerCarritoDesdeStorage();
  const contenedorSidebar = document.getElementById("cart-sidebar");
  const mensajeVacio = `<p class="text-center">El carrito está vacío.</p>`;

  if (!contenedorSidebar) return;

  if (carrito.length === 0) {
    contenedorSidebar.innerHTML = mensajeVacio;
    return;
  }

  contenedorSidebar.innerHTML = carrito.map(producto => `
    <div class="d-flex align-items-center justify-content-between mb-2 border-bottom pb-2">
      <img src="${producto.image}" alt="${producto.title}" style="width: 50px; height: 50px; object-fit: contain;">
      <div class="flex-grow-1 mx-2">
        <h6 class="mb-1">${producto.title}</h6>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary me-1" data-id="${producto.id}" data-accion="disminuir" ${producto.cantidad === 1 ? "disabled" : ""}>-</button>
          <span class="mx-2">${producto.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary ms-1" data-id="${producto.id}" data-accion="aumentar">+</button>
        </div>
      </div>
      <div>
        <p class="mb-1">$${(producto.price * producto.cantidad).toFixed(2)}</p>
        <button class="btn btn-sm btn-danger" data-id="${producto.id}" data-accion="eliminar">Eliminar</button>
      </div>
    </div>
  `).join("");

  agregarManejadoresDeEventosCarrito();
}

/**
 * Agrega los eventos a los botones de acción dentro del carrito.
 */
function agregarManejadoresDeEventosCarrito() {
  const sidebar = document.getElementById("cart-sidebar");

  if (!sidebar) return;

  sidebar.querySelectorAll("button[data-accion]").forEach(boton => {
    boton.addEventListener("click", (e) => {
      const accion = e.currentTarget.getAttribute("data-accion");
      const idProducto = e.currentTarget.getAttribute("data-id");

      switch (accion) {
        case "aumentar":
          modificarCantidadProducto(idProducto, 1);
          break;
        case "disminuir":
          modificarCantidadProducto(idProducto, -1);
          break;
        case "eliminar":
          eliminarProductoDelCarrito(idProducto);
          break;
      }

      renderizarSidebarDelCarrito(); // Actualiza vista
    });
  });
}

/**
 * Modifica la cantidad de un producto en el carrito.
 * @param {string} idProducto 
 * @param {number} cambio 
 */
function modificarCantidadProducto(idProducto, cambio) {
  const carrito = obtenerCarritoDesdeStorage();
  const index = carrito.findIndex(p => p.id === idProducto);

  if (index !== -1) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }

    guardarCarritoEnStorage(carrito);
    actualizarContadorCarrito();
  }
}
