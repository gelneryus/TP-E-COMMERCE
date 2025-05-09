// Esta función obtiene todos los productos desde la Fake Store API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Error al obtener los productos");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al hacer fetch:", error);
    throw error;
  }
}
