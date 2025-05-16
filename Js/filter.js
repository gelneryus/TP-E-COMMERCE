/**
 * Extrae las categorías únicas desde la lista de productos.
 * @param {Array} productos 
 * @returns {Array<string>}
 */
function obtenerCategoriasUnicas(productos) {
  const categorias = productos.map(p => p.category);
  return [...new Set(categorias)];
}

/**
 * Filtra productos por la categoría seleccionada.
 * @param {Array} productos 
 * @param {string} categoria 
 * @returns {Array}
 */
function filtrarProductosPorCategoria(productos, categoria) {
  return productos.filter(p => p.category === categoria);
}
