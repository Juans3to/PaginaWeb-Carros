const API_VEHICULOS = "http://localhost:3003";
const API_RESENAS   = "http://localhost:3002";
const API_CALIFICACIONES = "http://localhost:3004"; // calificaciones en 3004

// ID del vehículo desde la URL
const params = new URLSearchParams(window.location.search);
const idVehiculo = Number(params.get("id"));

// DOM
const titleEl = document.getElementById("vehiculo-title");
const specsEl = document.getElementById("vehiculo-specs");

// rating (promedio + form)
const ratingNumEl = document.getElementById("rating-number");
const ratingCountEl = document.getElementById("rating-count");
const rateForm = document.getElementById("calificar-form");
const ratingMsg = document.getElementById("rating-msg");
const scoreInput = document.getElementById("score");

// reseñas
const reseñasList = document.getElementById("reseñas-list");
const reseñaForm = document.getElementById("reseña-form");

// usuario actual
const username = localStorage.getItem("currentUserName") || "anónimo";

/* =================== VEHÍCULO =================== */
async function cargarVehiculo() {
  const r = await fetch(`${API_VEHICULOS}/vehiculos/${idVehiculo}`);
  if (!r.ok) throw new Error(`Vehículo HTTP ${r.status}`);
  const d = await r.json();
  titleEl.textContent = `${d.Modelo} (${d.Anio})`;
  specsEl.innerHTML = `
    <p><b>Estado:</b> ${d.Estado}</p>
    <p><b>Kilometraje:</b> ${d.Km} km</p>
    <p><b>Precio en USD:</b> $${d.Precio_en_dolares}</p>
  `;
}

/* ================= CALIFICACIONES ================= */
async function cargarPromedio() {
  try {
    const r = await fetch(`${API_CALIFICACIONES}/calificaciones/promedio/${idVehiculo}`);
    if (!r.ok) throw new Error(`Promedio HTTP ${r.status}`);
    const { promedio = 0, cantidad = 0 } = await r.json();
    ratingNumEl.textContent = Number(promedio).toFixed(1);
    ratingCountEl.textContent = `(${cantidad})`;
  } catch (e) {
    ratingNumEl.textContent = "0.0";
    ratingCountEl.textContent = "(0)";
  }
}

// Enviar calificación numérica (1–5)
rateForm?.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const estrellas = Number(scoreInput.value);
  if (!Number.isInteger(estrellas) || estrellas < 1 || estrellas > 5) {
    ratingMsg.textContent = "La calificación debe ser un número entero entre 1 y 5";
    ratingMsg.className = "rating-msg error";
    return;
  }

  try {
    const r = await fetch(`${API_CALIFICACIONES}/calificaciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carroId: idVehiculo, estrellas }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(err.mensaje || "No se pudo calificar");
    }

    ratingMsg.textContent = "¡Gracias por tu calificación!";
    ratingMsg.className = "rating-msg ok";
    await cargarPromedio();
    rateForm.reset();
  } catch (e) {
    ratingMsg.textContent = e.message;
    ratingMsg.className = "rating-msg error";
  }
});

/* ==================== RESEÑAS ==================== */
async function cargarReseñas() {
  try {
    const r = await fetch(`${API_RESENAS}/resenas/vehiculo/${idVehiculo}`);
    if (!r.ok) throw new Error(`Reseñas HTTP ${r.status}`);
    const data = await r.json();

    if (!Array.isArray(data) || data.length === 0) {
      reseñasList.innerHTML = '<div class="reseña"><small>Aún no hay reseñas.</small></div>';
      return;
    }

    reseñasList.innerHTML = data
      .map((res) => {
        // soporte a distintos nombres de ID que pueda retornar tu backend (id_resena o id)
        const idRes = res.id_resena ?? res.id;
        const puedeBorrar = (res.username || "anónimo") === username;

        return `
          <div class="reseña">
            <p><b>${res.username || "anónimo"}:</b> ${res.comentario}</p>
            <small>${new Date(res.fecha).toLocaleString()}</small>
            ${puedeBorrar ? `<button class="btn btn-small btn-danger" data-del="${idRes}">Borrar</button>` : ""}
          </div>
        `;
      })
      .join("");

    // delegación de eventos para borrar (un listener para todos los botones)
    reseñasList.querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id_resena = btn.getAttribute("data-del");
        await borrarResena(id_resena);
      });
    });
  } catch {
    reseñasList.innerHTML = '<div class="reseña"><small>Error cargando reseñas.</small></div>';
  }
}

// Crear reseña
reseñaForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const comentario = document.getElementById("comentario").value.trim();
  if (!comentario) return;

  try {
    const r = await fetch(`${API_RESENAS}/resenas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, idVehiculo, comentario }),
    });
    if (!r.ok) throw new Error("No se pudo crear la reseña");
    document.getElementById("comentario").value = "";
    await cargarReseñas();
  } catch (e) {
    alert(e.message);
  }
});

// Borrar reseña (solo propia)
async function borrarResena(id_resena) {
  try {
    const r = await fetch(`${API_RESENAS}/resenas/${id_resena}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }), // el backend valida que sea el autor
    });
    if (!r.ok) throw new Error("No se pudo borrar la reseña");
    await cargarReseñas();
  } catch (e) {
    alert(e.message);
  }
}

/* ===================== INIT ===================== */
(async () => {
  await cargarVehiculo();
  await cargarPromedio();
  await cargarReseñas();
})();