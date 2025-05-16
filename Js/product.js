/**
 * Renderiza una lista de productos como tarjetas en el DOM.
 * @param {Array} productos 
 */
function renderizarTarjetasDeProducto(productos) {
  const contenedor = document.getElementById("product-list");
  if (!contenedor) return;

  contenedor.innerHTML = productos.map(producto => `
    <div class="col-md-4">
      <div class="card h-100 shadow-sm animate__animated animate__fadeIn">
        <img src="${producto.image}" class="card-img-top" alt="${producto.title}" style="height: 250px; object-fit: contain; cursor: pointer;" data-id="${producto.id}" data-action="ver">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${producto.title}</h5>
          <p class="card-text">$${producto.price}</p>
          <div class="d-flex justify-content-between mt-auto">
            <button class="btn btn-sm btn-primary" data-id="${producto.id}" data-action="carrito">Agregar</button>
            <button class="btn btn-sm btn-outline-danger" data-id="${producto.id}" data-action="favorito">❤️</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");

  contenedor.querySelectorAll("[data-action]").forEach(elem => {
    elem.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const accion = e.target.dataset.action;
      const producto = productos.find(p => p.id == id);
      if (!producto) return;

      switch (accion) {
        case "ver":
          mostrarModalProductoConDetalle(producto);
          break;
        case "carrito":
          agregarProductoAlCarrito(producto);
          break;
        case "favorito":
          alternarFavorito(producto.id);
          break;
      }
    });
  });
}
