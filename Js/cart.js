/**
 * Muestra el modal de detalles del producto y permite agregarlo al carrito.
 * @param {Object} producto - Producto seleccionado.
 */
function mostrarModalDeProducto(producto) {
  document.getElementById("modal-product-image").src = producto.image;
  document.getElementById("modal-product-title").textContent = producto.title;
  document.getElementById("modal-product-price").textContent = `$${producto.price.toFixed(2)}`;
  document.getElementById("modal-product-description").textContent = producto.description;

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();

  const botonAgregar = document.getElementById("add-to-cart-btn");
  if (botonAgregar) {
    const nuevoHandler = () => {
      agregarProductoAlCarrito(producto);
      modal.hide();
      botonAgregar.removeEventListener("click", nuevoHandler);
    };

    const nuevoBoton = botonAgregar.cloneNode(true);
    botonAgregar.parentNode.replaceChild(nuevoBoton, botonAgregar);
    nuevoBoton.addEventListener("click", nuevoHandler);
  }
}

/**
 * Agrega un producto al carrito. Si ya existe, incrementa la cantidad.
 * @param {Object} producto 
 */
function agregarProductoAlCarrito(producto) {
  const carrito = obtenerCarritoDesdeStorage();
  const index = carrito.findIndex(item => item.id === producto.id);

  if (index > -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarritoEnStorage(carrito);
  actualizarContadorCarrito();
}

/**
 * Obtiene el carrito desde localStorage.
 * @returns {Array}
 */
function obtenerCarritoDesdeStorage() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

/**
 * Guarda el carrito en localStorage.
 * @param {Array} carrito 
 */
function guardarCarritoEnStorage(carrito) {
  localStorage.setItem("cart", JSON.stringify(carrito));
}

/**
 * Actualiza el contador del carrito en la interfaz.
 */
function actualizarContadorCarrito() {
  const carrito = obtenerCarritoDesdeStorage();
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
  const badge = document.getElementById("cart-count-badge");
  if (badge) badge.textContent = cantidadTotal > 0 ? cantidadTotal : '';
}

/**
 * Muestra/Oculta el sidebar del carrito y actualiza contenido.
 */
document.addEventListener("DOMContentLoaded", () => {
  const botonToggle = document.getElementById("toggle-cart-btn");
  if (botonToggle) {
    botonToggle.addEventListener("click", () => {
      const sidebar = document.getElementById("cart-sidebar");
      if (sidebar) {
        sidebar.classList.toggle("d-none");
        renderizarSidebarCarrito();
      }
    });
  }

  actualizarContadorCarrito();
});

/**
 * Renderiza el contenido del carrito en el sidebar.
 */
function renderizarSidebarCarrito() {
  const sidebar = document.getElementById("cart-sidebar");
  if (!sidebar) {
    console.warn("🛑 No se encontró el elemento #cart-sidebar.");
    return;
  }

  const lista = sidebar.querySelector(".cart-list");
  if (!lista) {
    console.warn("⚠️ No se encontró el contenedor .cart-list dentro del sidebar.");
    return;
  }

  const carrito = obtenerCarritoDesdeStorage();

  lista.innerHTML = carrito.map(item => `
    <div class="cart-item d-flex justify-content-between mb-3">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" style="height: 50px; object-fit: contain;">
      <div class="cart-item-details">
        <p>${item.title}</p>
        <p>$${item.price}</p>
      </div>
      <button class="remove-item-btn btn btn-danger" data-id="${item.id}">Eliminar</button>
    </div>
  `).join("");

  lista.querySelectorAll(".remove-item-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      eliminarProductoDelCarrito(e.target.dataset.id);
      renderizarSidebarCarrito();
    });
  });
}

/**
 * Elimina un producto del carrito según su ID.
 * @param {string} idProducto 
 */
function eliminarProductoDelCarrito(idProducto) {
  const carrito = obtenerCarritoDesdeStorage();
  const actualizado = carrito.filter(item => item.id !== idProducto);
  guardarCarritoEnStorage(actualizado);
  actualizarContadorCarrito();
}
/**
 * Maneja los eventos de "Finalizar compra" y "Vaciar carrito".
 */
document.addEventListener("click", (e) => {
  // Finalizar compra
  if (e.target.id === "checkout-btn") {
    const carrito = obtenerCarritoDesdeStorage();

    if (carrito.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Carrito vacío",
        text: "Agregá productos antes de finalizar la compra.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "¡Gracias por tu compra!",
      text: "Recibirás un correo con los detalles del pedido.",
    });

    guardarCarritoEnStorage([]);
    actualizarContadorCarrito();
    renderizarSidebarCarrito();
  }

  // Vaciar carrito
  if (e.target.id === "clear-cart-btn") {
    Swal.fire({
      icon: "warning",
      title: "¿Vaciar carrito?",
      text: "Esta acción eliminará todos los productos del carrito.",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        guardarCarritoEnStorage([]);
        actualizarContadorCarrito();
        renderizarSidebarCarrito();
      }
    });
  }
});
