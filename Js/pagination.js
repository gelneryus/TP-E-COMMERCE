/**
 * Devuelve un subconjunto de productos según la página y cantidad deseada.
 * @param {Array} productos 
 * @param {number} pagina 
 * @param {number} porPagina 
 * @returns {Array}
 */
function paginar(productos, pagina = 1, porPagina = CANTIDAD_PRODUCTOS_POR_PAGINA) {
  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  return productos.slice(inicio, fin);
}

/**
 * Actualiza el texto del indicador de página.
 * @param {number} paginaActual 
 * @param {number} totalProductos 
 * @param {number} porPagina 
 */
function actualizarIndicadorDePagina(paginaActual, totalProductos, porPagina) {
  const totalPaginas = Math.ceil(totalProductos / porPagina);
  const indicador = document.getElementById("page-indicator");
  if (indicador) {
    indicador.textContent = `Página ${paginaActual} de ${totalPaginas}`;
  }
}
