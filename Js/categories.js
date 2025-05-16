/**
 * Renderiza los botones de filtro por categoría.
 * @param {Array} productos - Lista de productos con categorías.
 */
function renderizarFiltrosDeCategorias(productos) {
  const contenedor = document.getElementById("category-filters");
  if (!contenedor) return;

  const categoriasUnicas = [...new Set(productos.map(p => p.category))].sort();

  const botonesHTML = categoriasUnicas.map(categoria => `
    <button class="btn btn-sm btn-outline-dark category-filter" data-category="${categoria}">
      ${capitalizarPrimeraLetra(categoria)}
    </button>
  `).join("");

  contenedor.innerHTML = `
    <button class="btn btn-sm btn-outline-dark category-filter" data-category="all">Todos</button>
    ${botonesHTML}
  `;
}

/**
 * Capitaliza la primera letra de un string.
 * @param {string} texto 
 * @returns {string}
 */
function capitalizarPrimeraLetra(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
