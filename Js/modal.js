document.addEventListener("DOMContentLoaded", () => {
  configurarBotonCarrito();
  actualizarContadorCarrito();
});

/**
 * Configura el botón de abrir/cerrar el carrito.
 */
function configurarBotonCarrito() {
  const botonToggleCarrito = document.getElementById("toggle-cart-btn");
  const sidebarCarrito = document.getElementById("cart-sidebar");

  if (!botonToggleCarrito || !sidebarCarrito) return;

  botonToggleCarrito.addEventListener("click", () => {
    sidebarCarrito.classList.toggle("d-none");
    renderizarSidebarDelCarrito();
  });
}
