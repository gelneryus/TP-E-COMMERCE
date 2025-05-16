const CLAVE_STORAGE_FAVORITOS = "favorites";

/**
 * Obtiene los IDs de productos marcados como favoritos desde localStorage.
 * @returns {Array<string>}
 */
function obtenerFavoritos() {
  const datos = localStorage.getItem(CLAVE_STORAGE_FAVORITOS);
  return datos ? JSON.parse(datos) : [];
}

/**
 * Guarda la lista de favoritos en localStorage.
 * @param {Array<string>} favoritos 
 */
function guardarFavoritos(favoritos) {
  localStorage.setItem(CLAVE_STORAGE_FAVORITOS, JSON.stringify(favoritos));
}

/**
 * Alterna el estado de favorito para un producto.
 * @param {string} idProducto 
 */
function alternarFavorito(idProducto) {
  let favoritos = obtenerFavoritos();

  if (favoritos.includes(idProducto)) {
    favoritos = favoritos.filter(id => id !== idProducto); // Lo elimina
  } else {
    favoritos.push(idProducto); // Lo agrega
  }

  guardarFavoritos(favoritos);
}

/**
 * Verifica si un producto está marcado como favorito.
 * @param {string} idProducto 
 * @returns {boolean}
 */
function esFavorito(idProducto) {
  return obtenerFavoritos().includes(idProducto);
}
