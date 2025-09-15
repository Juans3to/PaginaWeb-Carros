import { MS_USUARIOS_URL, showMessage } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    const logInForm = document.getElementById('log-in-form');
    if (logInForm) {
        logInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${MS_USUARIOS_URL}/usuarios/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('currentUserId', data.usuario.id);
                    localStorage.setItem('currentUserName', data.usuario.nombre);
                    showMessage('¡Inicio de sesión exitoso!', 'success');
                    window.location.href = 'buscar_carro.html';
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

