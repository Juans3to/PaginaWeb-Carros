import { MS_USUARIOS_URL, showMessage } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    const logInForm = document.getElementById('log-in-form');
    if (logInForm) {
        logInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const identifier = document.getElementById('identifier').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${MS_USUARIOS_URL}/usuarios/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier, password })
                });

                const data = await response.json();
                if (response.ok) {
                    // Guardamos datos del usuario en localStorage
                    localStorage.setItem('currentUserId', data.usuario.id); 
                    localStorage.setItem('currentUserName', data.usuario.username); 
                    
                    showMessage('¡Inicio de sesión exitoso!', 'success');
                    window.location.href = 'index.html';
                } else {
                    showMessage(data.mensaje, 'error');
                }
            } catch (error) {
                // Mensaje de error si la conexión al servidor falla
                showMessage('Error al conectar con el servidor. Inténtalo de nuevo más tarde.', 'error');
            }
        });
    }
});


