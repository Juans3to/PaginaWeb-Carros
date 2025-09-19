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
    const searchBtn = document.getElementById("search-btn"); // 👈 añadimos la lupa

    const currentUserName = localStorage.getItem("currentUserName");

    if (currentUserName) {
        // Mostrar saludo y logout
        nav.innerHTML = `
          <span>¡Hola, ${currentUserName}! 👋</span>
          <a href="#" id="logoutLink">Cerrar sesión</a>
        `;

        // Mostrar botón Explorar coches y lupa
        if (exploreBtn) exploreBtn.style.display = "inline-block";
        if (joinBtn) joinBtn.style.display = "none";
        if (searchBtn) searchBtn.style.display = "inline-flex"; // 👈 ahora sí se ve la lupa

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

        // Esconder botón Explorar coches y lupa
        if (exploreBtn) exploreBtn.style.display = "none";
        if (joinBtn) joinBtn.style.display = "inline-block";
        if (searchBtn) searchBtn.style.display = "none"; // 👈 ocultamos la lupa
    }
});

// ================== TOP CARS (Home) ==================
const MS_AUTOS_URL = 'http://localhost:3003'; // microservicio de autos

// Helpers
const money = (n) => (n == null ? '' : Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }));
const km = (n) => (n == null ? '' : `${Number(n).toLocaleString('es-CO')} km`);

// Tarjeta SIN calificaciones
const carCard = (car) => {
  const { id, Modelo, Anio, Estado, Km, Precio_en_dolares, MSRP } = car;
  const IMG = './images/delorian.jpg'; // imagen

  return `
    <article class="car-card">
      <div class="car-thumb"><img src="${IMG}" alt="${Modelo ?? 'Auto'}"></div>
      <div class="car-body">
        <h3 class="car-title">${Modelo ?? 'Modelo'} <span class="year">${Anio ?? ''}</span></h3>
        <div class="car-meta">
          <span class="badge">${Estado ?? ''}</span>
          <span class="dot">•</span>
          <span>${km(Km)}</span>
        </div>
        <div class="car-price">${money(Precio_en_dolares || MSRP)}</div>
        <a class="btn btn-small" href="vehiculo.html?id=${id}">Ver detalles</a>
      </div>
    </article>`;
};

// Skeleton
const skeleton = () => `
  <article class="car-card skeleton">
    <div class="car-thumb"></div>
    <div class="car-body">
      <div class="sk-line sk-title"></div>
      <div class="sk-line sk-sub"></div>
      <div class="sk-line sk-sub"></div>
      <div class="sk-line sk-price"></div>
    </div>
  </article>
`;

async function loadSomeCars({ limit = 8 } = {}) {
  const container = document.getElementById('topCarsContainer');
  if (!container) return;

  container.innerHTML = Array.from({ length: limit }, () => skeleton()).join('');

  try {
    // 👇 AHORA se llama a /vehiculos/ocho
    const resp = await fetch(`${MS_AUTOS_URL}/vehiculos/ocho`, { headers: { 'Accept': 'application/json' } });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const items = Array.isArray(data.items) ? data.items : [];

    if (items.length === 0) {
      container.innerHTML = `<div class="empty">No hay vehículos para mostrar.</div>`;
      return;
    }
    container.innerHTML = items.map(carCard).join('');
  } catch (err) {
    console.error('Error cargando vehículos:', err);
    container.innerHTML = `<div class="error-callout">No pudimos cargar los vehículos. Intenta nuevamente.</div>`;
  }
}

// Ejecuta al cargar la home
document.addEventListener('DOMContentLoaded', () => {
  console.log('Front: usando /vehiculos/ocho'); // debug
  loadSomeCars({ limit: 8 });
});