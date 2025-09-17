import { MS_USUARIOS_URL, showMessage } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('sign-in-form');
    if (signInForm) {
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${MS_USUARIOS_URL}/usuarios`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    showMessage('¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
                    window.location.href = 'login.html';
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
