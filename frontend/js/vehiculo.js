const API_VEHICULOS = "http://localhost:3003";
const API_RESENAS = "http://localhost:3002";
const API_CALIFICACIONES = "http://localhost:3004"; // asumiendo este puerto

// Leer ID de la URL
const params = new URLSearchParams(window.location.search);
const idVehiculo = params.get("id");

// Elementos del DOM
const titleEl = document.getElementById("vehiculo-title");
const specsEl = document.getElementById("vehiculo-specs");
const ratingEl = document.getElementById("vehiculo-rating");
const reseñasList = document.getElementById("reseñas-list");
const reseñaForm = document.getElementById("reseña-form");

// Usuario actual
const username = localStorage.getItem("currentUserName");

// Cargar datos del vehículo
async function cargarVehiculo() {
  const res = await fetch(`${API_VEHICULOS}/vehiculos/${idVehiculo}`);
  const data = await res.json();
  titleEl.textContent = `${data.Modelo} (${data.Anio})`;
  specsEl.innerHTML = `
    <p><b>Estado:</b> ${data.Estado}</p>
    <p><b>Kilometraje:</b> ${data.Km} km</p>
    <p><b>Precio:</b> $${data.Precio_en_dolares}</p>
  `;
}

// Cargar calificación promedio
async function cargarCalificacion() {
  const res = await fetch(`${API_CALIFICACIONES}/calificaciones/${idVehiculo}`);
  const data = await res.json();
  ratingEl.innerHTML = `<p><b>Calificación promedio:</b> ${data.promedio ?? "Sin calificar"}</p>`;
}

// Cargar reseñas
async function cargarReseñas() {
  const res = await fetch(`${API_RESENAS}/resenas/vehiculo/${idVehiculo}`);
  const data = await res.json();
  reseñasList.innerHTML = data.map(r => `
    <div class="reseña">
      <p><b>${r.username}:</b> ${r.comentario}</p>
      <small>${new Date(r.fecha).toLocaleString()}</small>
    </div>
  `).join("");
}

// Enviar nueva reseña
reseñaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const comentario = document.getElementById("comentario").value;

  const res = await fetch(`${API_RESENAS}/resenas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, idVehiculo, comentario })
  });

  if (res.ok) {
    document.getElementById("comentario").value = "";
    cargarReseñas();
  } else {
    alert("Error al enviar reseña");
  }
});

// Init
cargarVehiculo();
cargarCalificacion();
cargarReseñas();
