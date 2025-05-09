document.addEventListener("DOMContentLoaded", () => {
  // Botón para alternar el carrito
  const toggleBtn = document.getElementById("toggle-cart-btn");

  // Si se encuentra el botón del carrito, agregamos el evento para abrir/cerrar el sidebar
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const cartSidebar = document.getElementById("cart-sidebar");

      if (cartSidebar) {
        // Alternar visibilidad del carrito
        cartSidebar.classList.toggle("d-none"); 
        renderCartSidebar(); // Actualizar contenido del carrito
      }
    });
  }

  // Actualiza el contador del carrito al cargar la página
  updateCartCountBadge();
});
