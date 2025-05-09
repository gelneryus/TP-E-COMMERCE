const productsPerPage = 6; // Se mantiene constante

// Devuelve los productos paginados
function paginate(products, page = currentPage, perPage = productsPerPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return products.slice(start, end);
}

// Activa los botones de paginación
function setupPagination() {
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");

  prevBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProductsByPage();
    }
  });

  nextBtn?.addEventListener("click", () => {
    const maxPage = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      renderProductsByPage();
    }
  });
}

// Actualiza el texto del indicador
function updatePageIndicator(page, totalItems, perPage) {
  const totalPages = Math.ceil(totalItems / perPage);
  const indicator = document.getElementById("page-indicator");
  if (indicator) {
    indicator.textContent = `Página ${page} de ${totalPages}`;
  }
}
