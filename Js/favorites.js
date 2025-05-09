// Devuelve los IDs de productos marcados como favoritos desde localStorage
function getFavorites() {
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
}

// Guarda la lista de favoritos en localStorage
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Alterna el estado de favorito de un producto (agrega o elimina)
function toggleFavorite(productId) {
  let favorites = getFavorites();
  const exists = favorites.includes(productId);

  if (exists) {
    favorites = favorites.filter(id => id !== productId); // Eliminar si ya existe
  } else {
    favorites.push(productId); // Agregar si no existe
  }

  saveFavorites(favorites);
}

// Devuelve true si el producto está marcado como favorito
function isFavorite(productId) {
  const favorites = getFavorites();
  return favorites.includes(productId);
}
