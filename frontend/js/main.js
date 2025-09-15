// URLs de los microservicios
const MS_USUARIOS_URL = 'http://localhost:3001';

// Exportamos las variables para que otros archivos JS puedan usarlas
export { MS_USUARIOS_URL };

// Función para mostrar mensajes de éxito o error en el HTML
export function showMessage(message, type) {
    const messageArea = document.getElementById('message-area');
    if (messageArea) {
        messageArea.textContent = message;
        messageArea.className = 'message-text'; // Reset classes
        if (type === 'success') {
            messageArea.classList.add('success-message');
        } else if (type === 'error') {
            messageArea.classList.add('error-message');
        }
    }
}