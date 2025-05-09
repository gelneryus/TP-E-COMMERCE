// Variables globales de estado
let currentPage = 1;
const itemsPerPage = 6;
let products = [];         // Todos los productos traídos de la API
let filteredProducts = []; // Productos tras aplicar filtros o búsquedas

// Función principal: carga todo lo necesario al inicio
async function init() {
  try {
    products = await fetchProducts(); // Cargar productos desde la API
    filteredProducts = [...products]; // Inicialmente todos
    renderCategories(products);       // Cargar categorías en filtros
    renderProductsByPage();           // Mostrar productos paginados
    setupPagination();                // Activar botones de paginación
    setupSearch();                    // Activar búsqueda
    setupSort();                      // Activar ordenamiento
    setupDarkModeToggle();            // Activar modo oscuro
  } catch (error) {
    console.error("Error al cargar productos:", error);
    showErrorMessage("No se pudieron cargar los productos.");
  }
}

// Renderiza productos para la página actual
function renderProductsByPage() {
  const paginated = paginate(filteredProducts, currentPage, itemsPerPage);
  renderProductCards(paginated);
  updatePageIndicator(currentPage, filteredProducts.length, itemsPerPage);
}

// Búsqueda por texto en tiempo real
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredProducts = products.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderProductsByPage();
  });
}

// Ordenar productos por precio o nombre
function setupSort() {
  const sortSelect = document.getElementById("sort-select");
  if (!sortSelect) return;

  sortSelect.addEventListener("change", (e) => {
    const option = e.target.value;
    filteredProducts = sortProducts(filteredProducts, option);
    currentPage = 1;
    renderProductsByPage();
  });
}

// Filtros por categoría
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-filter")) {
    const selectedCategory = e.target.dataset.category;
    filteredProducts = selectedCategory === "all"
      ? [...products]
      : products.filter(p => p.category === selectedCategory);
    currentPage = 1; // Reiniciar paginación al cambiar el filtro
    renderProductsByPage();
  }
});

// Paginación
document.getElementById("prev-page-btn")?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProductsByPage();
  }
});

document.getElementById("next-page-btn")?.addEventListener("click", () => {
  const maxPage = Math.ceil(filteredProducts.length / itemsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderProductsByPage();
  }
});

// Mostrar mensaje de error (opcional)
function showErrorMessage(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
}

// Función que alterna la visibilidad del carrito
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

// Función para actualizar el contador de productos en el carrito
function updateCartCountBadge() {
  const cartCount = getCart().reduce((total, item) => total + item.quantity, 0);
  const cartCountBadge = document.getElementById("cart-count-badge");
  if (cartCountBadge) {
    cartCountBadge.textContent = cartCount > 0 ? cartCount : '';
  }
}

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", init);

