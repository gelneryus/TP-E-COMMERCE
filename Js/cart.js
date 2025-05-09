// Función para abrir el modal y cargar los detalles del producto
function openProductModal(product) {
  // Asignar los valores del producto al modal
  document.getElementById("modal-product-image").src = product.image;
  document.getElementById("modal-product-title").textContent = product.title;
  document.getElementById("modal-product-price").textContent = `$${product.price.toFixed(2)}`;
  document.getElementById("modal-product-description").textContent = product.description;

  // Mostrar el modal de Bootstrap
  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();

  // Eliminar event listeners anteriores para evitar múltiples bindings
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.removeEventListener("click", handleAddToCart);
    addToCartBtn.addEventListener("click", handleAddToCart);
  }

  // Función interna para agregar el producto al carrito
  function handleAddToCart() {
    addToCart(product); // Llamada a la función que agrega el producto al carrito
    modal.hide(); // Cerrar el modal después de agregar al carrito
  }
}

// Función para agregar el producto al carrito
function addToCart(product) {
  const cart = getCart(); // Obtener el carrito actual
  const productIndex = cart.findIndex(item => item.id === product.id);

  if (productIndex > -1) {
    cart[productIndex].quantity += 1; // Si el producto ya está en el carrito, incrementar la cantidad
  } else {
    cart.push({...product, quantity: 1}); // Agregar el producto al carrito si no está
  }

  saveCart(cart); // Guardar el carrito actualizado
  updateCartCountBadge(); // Actualizar el contador del carrito en el navbar
}

// Función para obtener el carrito del almacenamiento (localStorage)
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Función para guardar el carrito en el almacenamiento
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para actualizar el contador del carrito en el navbar
function updateCartCountBadge() {
  const cart = getCart();
  const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
  const cartCountBadge = document.getElementById("cart-count-badge");

  if (cartCountBadge) {
    cartCountBadge.textContent = cartCount > 0 ? cartCount : ''; // Mostrar el contador solo si es mayor que 0
  }
}

// Función para alternar la visibilidad del carrito
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-cart-btn");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const cartSidebar = document.getElementById("cart-sidebar");
      if (cartSidebar) {
        // Alterna la clase 'd-none' para mostrar u ocultar el carrito
        cartSidebar.classList.toggle("d-none");
        renderCartSidebar(); // Actualiza el contenido del carrito
      }
    });
  }

  // Función para actualizar el contador del carrito
  updateCartCountBadge();
});

// Renderiza el contenido del carrito dentro del sidebar
function renderCartSidebar() {
  const cartSidebar = document.getElementById("cart-sidebar");
  if (!cartSidebar) return;

  const cartItems = getCart(); // Obtén los productos del carrito
  const cartList = cartSidebar.querySelector(".cart-list");

  // Limpia el contenido actual del carrito
  cartList.innerHTML = cartItems.map(item => `
    <div class="cart-item d-flex justify-content-between mb-3">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" style="height: 50px; object-fit: contain;">
      <div class="cart-item-details">
        <p>${item.title}</p>
        <p>$${item.price}</p>
      </div>
      <button class="remove-item-btn btn btn-danger" data-id="${item.id}">Eliminar</button>
    </div>
  `).join("");

  // Añadir evento para eliminar productos
  cartSidebar.querySelectorAll(".remove-item-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      removeFromCart(productId); // Elimina el producto del carrito
      renderCartSidebar(); // Vuelve a renderizar el carrito actualizado
    });
  });
}

// Eliminar un producto del carrito
function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId); // Filtra el producto por ID
  saveCart(updatedCart); // Guarda el carrito actualizado
  updateCartCountBadge(); // Actualiza el contador
}
