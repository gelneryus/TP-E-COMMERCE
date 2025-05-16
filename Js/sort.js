/**
 * Ordena productos según el criterio seleccionado.
 * @param {Array} productos 
 * @param {string} opcion 
 * @returns {Array}
 */
function ordenarProductos(productos, opcion) {
  const copia = [...productos]; // Para no mutar el array original

  switch (opcion) {
    case "price-asc":
      return copia.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copia.sort((a, b) => b.price - a.price);
    case "name-asc":
      return copia.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return copia.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return productos;
  }
}
