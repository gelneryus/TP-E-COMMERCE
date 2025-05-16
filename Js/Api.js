/**
 * Obtiene la lista de productos desde la Fake Store API.
 * @returns {Promise<Array>} Array de productos.
 */
async function obtenerProductosDesdeAPI() {
  const apiUrl = "https://fakestoreapi.com/products";

  try {
    const respuesta = await fetch(apiUrl);

    if (!respuesta.ok) {
      throw new Error(`Fallo al obtener productos. Código: ${respuesta.status}`);
    }

    const productos = await respuesta.json();
    return productos;

  } catch (error) {
    console.error("📡 Error al consultar la API de productos:", error.message);
    throw error;
  }
}
