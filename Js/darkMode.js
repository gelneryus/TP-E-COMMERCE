// Activa o desactiva el modo oscuro según preferencia
function toggleDarkMode() {
  const body = document.body;
  const currentMode = localStorage.getItem("darkMode");

  if (currentMode === "enabled") {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  } else {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  }
}

// Aplica el modo oscuro si estaba activado previamente
function applySavedDarkMode() {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
  }
}

// Configura el botón de dark mode
function setupDarkModeToggle() {
  const darkModeBtn = document.getElementById("dark-mode-btn");
  if (!darkModeBtn) return;

  darkModeBtn.addEventListener("click", toggleDarkMode);
}

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  applySavedDarkMode();
  setupDarkModeToggle();
});
