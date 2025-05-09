// Crea los botones de filtros por categoría en el HTML
function renderCategories(products) {
  const container = document.getElementById("category-filters");
  if (!container) return;

  // Obtener categorías únicas
  const categories = [...new Set(products.map(p => p.category))];
  categories.sort();

  // Agregar botón "Todos"
  container.innerHTML = `
    <button class="btn btn-sm btn-outline-dark category-filter" data-category="all">Todos</button>
    ${categories.map(cat => `
      <button class="btn btn-sm btn-outline-dark category-filter" data-category="${cat}">
        ${capitalize(cat)}
      </button>
    `).join("")}
  `;
}

// Capitaliza la primera letra de una cadena
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
