// URLs base de tus microservicios
const CARRO_ID = 3; // ID del carro que se mostrará en la página (pueden cambiarlo)
const MS_VEHICULOS_URL = 'http://localhost:3003'; // Puerto del MS de Vehículos
const MS_CALIFICACIONES_URL = 'http://localhost:3004'; // Puerto del MS de Calificaciones
const MS_RESENAS_URL = 'http://localhost:3002'; // Puerto del MS de Reseñas

// Función para obtener y mostrar los detalles del carro
async function getCarDetails() {
    try {
        const response = await fetch(`${MS_VEHICULOS_URL}/vehiculos/${CARRO_ID}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del carro');
        }
        const carro = await response.json();
        document.getElementById('car-details').innerHTML = `
            <h2>${carro.Modelo} ${carro.Anio}</h2>
            <p><strong>Kilometraje:</strong> ${carro.Km}</p>
            <p><strong>Precio(En USD):</strong> ${carro.Precio_en_dolares}</p>
        `;
    } catch (error) {
        document.getElementById('car-details').innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

// Función para obtener y mostrar las calificaciones
async function getRatings() {
    try {
        const response = await fetch(`${MS_CALIFICACIONES_URL}/calificaciones/${CARRO_ID}`);
        if (!response.ok) {
            throw new Error('No se pudieron obtener las calificaciones');
        }
        const calificaciones = await response.json();
        
        // Calcular el promedio
        if (calificaciones.length > 0) {
            const sum = calificaciones.reduce((total, cal) => total + cal.estrellas, 0);
            const avg = (sum / calificaciones.length).toFixed(1);
            document.getElementById('avg-rating').textContent = `${avg}`;
        } else {
            document.getElementById('avg-rating').textContent = 'Sin calificaciones aún';
        }

    } catch (error) {
        document.getElementById('avg-rating').textContent = 'Error';
    }
}

// Función para obtener y mostrar las reseñas
async function getReviews() {
    try {
        const response = await fetch(`${MS_RESENAS_URL}/resenas/${CARRO_ID}`);
        if (!response.ok) {
            throw new Error('No se pudieron obtener las reseñas');
        }
        const reseñas = await response.json();
        const reseñasList = document.getElementById('reseñas-list');
        reseñasList.innerHTML = ''; // Limpiar lista
        
        if (reseñas.length === 0) {
            reseñasList.innerHTML = '<p>No hay comentarios para este vehículo.</p>';
        } else {
            reseñas.forEach(reseña => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                reviewCard.innerHTML = `
                    <p><strong>Usuario ${reseña.idUsuario}:</strong></p>
                    <p>${reseña.comentario}</p>
                `;
                reseñasList.appendChild(reviewCard);
            });
        }
    } catch (error) {
        document.getElementById('reseñas-list').innerHTML = `<p style="color:red;">Error al cargar comentarios.</p>`;
    }
}

// Manejar el envío del formulario
document.getElementById('submit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('user-id').value;
    const rating = document.getElementById('rating').value;
    const comment = document.getElementById('comment').value;

    const ratingData = {
        idUsuario: parseInt(userId),
        idVehiculo: CARRO_ID,
        estrellas: parseInt(rating)
    };
    
    const reviewData = {
        idUsuario: parseInt(userId),
        idVehiculo: CARRO_ID,
        comentario: comment
    };

    try {
        // Enviar calificación
        const ratingResponse = await fetch(`${MS_CALIFICACIONES_URL}/calificaciones`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ratingData)
        });

        // Enviar reseña
        const reviewResponse = await fetch(`${MS_RESENAS_URL}/resenas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });

        if (ratingResponse.ok && reviewResponse.ok) {
            alert('¡Calificación y comentario enviados con éxito!');
            // Recargar la información para ver los cambios
            getRatings();
            getReviews();
        } else {
            throw new Error('Hubo un problema al enviar la información.');
        }

    } catch (error) {
        alert(error.message);
    }
});

// Cargar toda la información al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    getCarDetails();
    getRatings();
    getReviews();
});