// Variables globales
let paginaActual = 1;
const productosPorPagina = 6;
let productosOriginales = [];
let productosFiltrados = [];

/**
 * Inicializa la app: carga productos, filtros, paginación y demás componentes.
 */
async function iniciarAplicacion() {
  try {
    productosOriginales = await obtenerProductosDesdeAPI();
    productosFiltrados = [...productosOriginales];

    renderizarFiltrosDeCategorias(productosOriginales);
    renderizarProductosPorPagina();
    configurarPaginacion();
    configurarBusqueda();
    configurarOrdenamiento();
    configurarBotonModoOscuro();
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
    mostrarMensajeDeError("No se pudieron cargar los productos.");
  }
}

/**
 * Renderiza los productos correspondientes a la página actual.
 */
function renderizarProductosPorPagina() {
  const paginados = paginar(productosFiltrados, paginaActual, productosPorPagina);
  renderizarTarjetasDeProducto(paginados);
  actualizarIndicadorDePagina(paginaActual, productosFiltrados.length, productosPorPagina);
}

/**
 * Configura la búsqueda en tiempo real.
 */
function configurarBusqueda() {
  const inputBusqueda = document.getElementById("search-input");
  if (!inputBusqueda) return;

  inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    productosFiltrados = productosOriginales.filter(producto =>
      producto.title.toLowerCase().includes(texto) ||
      producto.description.toLowerCase().includes(texto)
    );
    paginaActual = 1;
    renderizarProductosPorPagina();
  });
}

/**
 * Configura el ordenamiento de productos.
 */
function configurarOrdenamiento() {
  const selectorOrden = document.getElementById("sort-select");
  if (!selectorOrden) return;

  selectorOrden.addEventListener("change", (e) => {
    productosFiltrados = ordenarProductos(productosFiltrados, e.target.value);
    paginaActual = 1;
    renderizarProductosPorPagina();
  });
}

/**
 * Maneja el cambio de categoría por clic.
 */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-filter")) {
    const categoriaSeleccionada = e.target.dataset.category;
    productosFiltrados = categoriaSeleccionada === "all"
      ? [...productosOriginales]
      : productosOriginales.filter(p => p.category === categoriaSeleccionada);

    paginaActual = 1;
    renderizarProductosPorPagina();
  }
});

/**
 * Configura la paginación básica.
 */
function configurarPaginacion() {
  document.getElementById("prev-page-btn")?.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderizarProductosPorPagina();
    }
  });

  document.getElementById("next-page-btn")?.addEventListener("click", () => {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderizarProductosPorPagina();
    }
  });
}

/**
 * Muestra un mensaje de error en pantalla.
 * @param {string} mensaje 
 */
function mostrarMensajeDeError(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje,
  });
}

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", iniciarAplicacion);
