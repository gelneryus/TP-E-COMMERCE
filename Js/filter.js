// Extrae las categorías únicas de la lista de productos
function getUniqueCategories(products) {
    const categories = products.map(p => p.category);
    return [...new Set(categories)]; // Elimina duplicados
  }
  
  // Filtra productos por categoría seleccionada
  function filterProductsByCategory(products, category) {
    return products.filter(p => p.category === category);
  }
  