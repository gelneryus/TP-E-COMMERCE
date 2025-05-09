// Muestra los productos del carrito dentro del sidebar
function renderCartSidebar() {
  const cart = getCart();  // Obtener el carrito
  const container = document.getElementById("cart-sidebar");  // Contenedor donde se mostrará el carrito
  const emptyMessage = `<p class="text-center">El carrito está vacío.</p>`;

  if (!container) return;  // Si no existe el contenedor, no hace nada.

  if (cart.length === 0) {
    container.innerHTML = emptyMessage;  // Si el carrito está vacío
    return;
  }

  // Mostrar los productos del carrito
  container.innerHTML = cart.map(product => `
    <div class="d-flex align-items-center justify-content-between mb-2 border-bottom pb-2">
      <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: contain;">
      <div class="flex-grow-1 mx-2">
        <h6 class="mb-1">${product.title}</h6>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary me-1" data-id="${product.id}" data-action="decrease" ${product.quantity === 1 ? "disabled" : ""}>-</button>
          <span class="mx-2">${product.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary ms-1" data-id="${product.id}" data-action="increase">+</button>
        </div>
      </div>
      <div>
        <p class="mb-1">$${(product.price * product.quantity).toFixed(2)}</p>
        <button class="btn btn-sm btn-danger" data-id="${product.id}" data-action="remove">Eliminar</button>
      </div>
    </div>
  `).join("");

  // Eventos para botones del carrito
  container.querySelectorAll("button").forEach(btn => {
    const id = btn.dataset.id;
    const action = btn.dataset.action;

    btn.addEventListener("click", () => {
      if (action === "increase") {
        updateQuantity(id, 1);
      } else if (action === "decrease") {
        updateQuantity(id, -1);
      } else if (action === "remove") {
        removeFromCart(id);
      }
    });
  });
}

// Función para actualizar la cantidad de un producto en el carrito
function updateQuantity(productId, delta) {
  const cart = getCart();
  const productIndex = cart.findIndex(item => item.id === productId);

  if (productIndex !== -1) {
    const product = cart[productIndex];
    product.quantity += delta; // Incrementa o decrementa la cantidad

    // Evitar que la cantidad sea menor que 1
    if (product.quantity < 1) product.quantity = 1;

    saveCart(cart); // Guarda el carrito actualizado
    renderCartSidebar(); // Vuelve a renderizar el carrito
  }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId); // Elimina el producto por ID

  saveCart(updatedCart); // Guarda el carrito actualizado
  renderCartSidebar(); // Vuelve a renderizar el carrito
}

// Función para obtener el carrito desde el almacenamiento local (localStorage)
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Función para guardar el carrito en el almacenamiento local
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
