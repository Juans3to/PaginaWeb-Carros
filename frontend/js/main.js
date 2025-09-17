// URLs de los microservicios
const MS_USUARIOS_URL = 'http://localhost:3001';

// Exportamos las variables para que otros archivos JS puedan usarlas
export { MS_USUARIOS_URL };

// Función para mostrar mensajes de exito o error
export function showMessage(message, type) {
    const messageArea = document.getElementById('message-area');
    if (messageArea) {
        messageArea.textContent = message;
        messageArea.className = 'message-text';
        if (type === 'success') {
            messageArea.classList.add('success-message');
        } else if (type === 'error') {
            messageArea.classList.add('error-message');
        }
    }
}

// Manejo del header dinámico y botones
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav-container");
    const exploreBtn = document.getElementById("explore-btn");
    const joinBtn = document.getElementById("join-btn");

    const currentUserName = localStorage.getItem("currentUserName");

    if (currentUserName) {
        // Mostrar saludo y logout
        nav.innerHTML = `
          <span>¡Hola, ${currentUserName}! 👋</span>
          <a href="#" id="logoutLink">Cerrar sesión</a>
        `;

        // Mostrar botón Explorar coches
        if (exploreBtn) exploreBtn.style.display = "inline-block";
        if (joinBtn) joinBtn.style.display = "none";

        // Logout
        document.getElementById("logoutLink").addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "index.html";
        });

    } else {
        // Mostrar botones de login y registro
        nav.innerHTML = `
          <a href="login.html">Iniciar Sesión</a>
          <a href="registro.html">Registrarse</a>
        `;

        // Esconder botón Explorar coches
        if (exploreBtn) exploreBtn.style.display = "none";
        if (joinBtn) joinBtn.style.display = "inline-block";
    }
});
