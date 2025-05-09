// Muestra el modal con los detalles del producto seleccionado
function showProductModal(product) {
  const modalContainer = document.getElementById("product-modal");

  if (!modalContainer) return;

  // Contenido HTML del modal con información del producto
  modalContainer.innerHTML = `
    <div class="modal fade" id="productDetailModal" tabindex="-1" aria-labelledby="productDetailLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productDetailLabel">${product.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body row">
            <div class="col-md-5">
              <!-- Imagen con posibilidad de hacer zoom -->
              <img src="${product.image}" alt="${product.title}" class="img-fluid" id="zoom-image" style="cursor: zoom-in;" />
            </div>
            <div class="col-md-7">
              <p class="mb-2">${product.description}</p>
              <p><strong>Precio:</strong> $${product.price}</p>
              <p><strong>Categoría:</strong> ${product.category}</p>
              <!-- Botones para agregar al carrito o favoritos -->
              <button class="btn btn-primary me-2" data-id="${product.id}" id="modal-add-cart">Agregar al carrito</button>
              <button class="btn btn-outline-danger" data-id="${product.id}" id="modal-add-fav">❤️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Mostrar el modal
  const bsModal = new bootstrap.Modal(document.getElementById("productDetailModal"));
  bsModal.show();

  // Zoom de imagen al hacer click
  const zoomImage = document.getElementById("zoom-image");
  zoomImage.addEventListener("click", () => {
    zoomImage.classList.toggle("zoomed");
    if (zoomImage.classList.contains("zoomed")) {
      zoomImage.style.transform = "scale(2)";
      zoomImage.style.cursor = "zoom-out";
    } else {
      zoomImage.style.transform = "scale(1)";
      zoomImage.style.cursor = "zoom-in";
    }
  });

  // Eventos para botones dentro del modal
  document.getElementById("modal-add-cart").addEventListener("click", () => {
    addToCart(product);
  });

  document.getElementById("modal-add-fav").addEventListener("click", () => {
    toggleFavorite(product.id);
  });
}
