// Renderiza una lista de productos como tarjetas en el DOM
function renderProductCards(products) {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="col-md-4">
      <div class="card h-100 shadow-sm animate__animated animate__fadeIn">
        <img src="${product.image}" class="card-img-top" alt="${product.title}" style="height: 250px; object-fit: contain; cursor: pointer;" data-id="${product.id}">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$${product.price}</p>
          <div class="d-flex justify-content-between mt-auto">
            <button class="btn btn-sm btn-primary" data-id="${product.id}" data-action="add-cart">Agregar</button>
            <button class="btn btn-sm btn-outline-danger" data-id="${product.id}" data-action="fav">
              ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  // Evento para abrir el modal al hacer clic en la imagen del producto
  container.querySelectorAll("img[data-id]").forEach(img => {
    img.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const product = products.find(p => p.id == id);
      if (product) {
        showProductModal(product); // ✅ Llama al modal.js
      }
    });
  });

  // Eventos para los botones de "Agregar" y "Favorito"
  container.querySelectorAll("button").forEach(btn => {
    const id = btn.dataset.id;
    const action = btn.dataset.action;

    btn.addEventListener("click", () => {
      const product = products.find(p => p.id == id);
      if (!product) return;

      if (action === "add-cart") {
        addToCart(product); // ✅ Llama a cart.js
      } else if (action === "fav") {
        toggleFavorite(product.id); // ✅ Llama a favorites.js
      }
    });
  });
}
