const CLASE_MODO_OSCURO = "dark-mode";
const CLAVE_STORAGE = "darkMode";
const VALOR_ACTIVADO = "enabled";
const VALOR_DESACTIVADO = "disabled";

/**
 * Cambia entre modo claro y oscuro, y guarda la preferencia.
 */
function alternarModoOscuro() {
  const body = document.body;
  const modoActual = localStorage.getItem(CLAVE_STORAGE);

  if (modoActual === VALOR_ACTIVADO) {
    body.classList.remove(CLASE_MODO_OSCURO);
    localStorage.setItem(CLAVE_STORAGE, VALOR_DESACTIVADO);
  } else {
    body.classList.add(CLASE_MODO_OSCURO);
    localStorage.setItem(CLAVE_STORAGE, VALOR_ACTIVADO);
  }
}

/**
 * Aplica el modo oscuro si el usuario lo tenía habilitado.
 */
function aplicarModoOscuroGuardado() {
  if (localStorage.getItem(CLAVE_STORAGE) === VALOR_ACTIVADO) {
    document.body.classList.add(CLASE_MODO_OSCURO);
  }
}

/**
 * Asocia el botón al comportamiento de alternar el modo oscuro.
 */
function configurarBotonModoOscuro() {
  const botonModo = document.getElementById("dark-mode-btn");
  if (botonModo) {
    botonModo.addEventListener("click", alternarModoOscuro);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  aplicarModoOscuroGuardado();
  configurarBotonModoOscuro();
});
