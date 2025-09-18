// js/buscar.js
const $q = document.getElementById('q');
const $clear = document.getElementById('clear');
const $results = document.getElementById('results');
const $prev = document.getElementById('prev');
const $next = document.getElementById('next');
const $pageInfo = document.getElementById('pageInfo');
const API = 'http://localhost:3003';


const PAGE_SIZE = 10;

const state = {
  q: '',
  page: 1,
  total: 0
};

// -------- Utilidades --------
function debounce(fn, ms = 350) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function setURL(q, page) {
  const url = new URL(window.location.href);
  if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
  if (page > 1) url.searchParams.set('page', String(page)); else url.searchParams.delete('page');
  history.replaceState(null, '', url);
}

function getURLState() {
  const url = new URL(window.location.href);
  const q = (url.searchParams.get('q') || '').trim();
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
  return { q, page };
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, m =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])
  );
}

// -------- Render --------
function renderSkeleton(n = 4) {
  $results.innerHTML = Array.from({ length: n }).map(() => `
    <div class="skel">
      <div class="thumb"></div>
      <div>
        <div class="box" style="width: 60%; height:16px;"></div>
        <div class="box" style="width: 40%; margin-top:8px;"></div>
        <div class="box" style="width: 30%; margin-top:8px;"></div>
      </div>
    </div>
  `).join('');
}

function renderEmpty() {
  $results.innerHTML = `<div class="empty">Empieza buscando una marca o modelo…</div>`;
  $prev.disabled = true;
  $next.disabled = true;
  $pageInfo.textContent = '';
}

function renderError(msg = 'Error al buscar. Intenta de nuevo.') {
  $results.innerHTML = `<div class="error">${escapeHtml(msg)}</div>`;
}

function render(items) {
  if (!items.length) {
    $results.innerHTML = `<div class="empty">No se encontraron resultados.</div>`;
    return;
  }
  $results.innerHTML = items.map(it => {
    const titulo = `${it.Modelo ?? ''} • ${it.Anio ?? ''}`.trim();
    const meta = `Estado: ${it.Estado ?? '-'} • Km: ${it.Km ?? '-'} • $${it.Precio_en_dolares ?? '-'}`;
    const url = `vehiculo.html?id=${encodeURIComponent(it.id)}`; // tu página de detalle
    return `
      <article class="card">
        <div class="thumb">Car</div>
        <div>
          <h3 class="title">${escapeHtml(titulo)}</h3>
          <div class="meta">${escapeHtml(meta)}</div>
          <div class="actions">
            <a href="${url}">Ver especificaciones →</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderPager() {
  const totalPages = Math.max(1, Math.ceil(state.total / PAGE_SIZE));
  $prev.disabled = state.page <= 1;
  $next.disabled = state.page >= totalPages || totalPages === 0;
  const totalTxt = state.total === 1 ? '1 resultado' : `${state.total} resultados`;
  $pageInfo.textContent = `Página ${state.page} de ${totalPages} — ${totalTxt}`;
}

// -------- Data --------
async function fetchData() {
  const q = state.q.trim();
  if (q.length < 2) { renderEmpty(); return; }

  const offset = (state.page - 1) * PAGE_SIZE;
  const params = new URLSearchParams({
    query: q,
    limit: PAGE_SIZE,
    offset
  });

  try {
    renderSkeleton();
const res = await fetch(`${API}/vehiculos/buscar?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.total = Number(data.total || 0);
    render(data.items || []);
    renderPager();
  } catch (err) {
    console.error(err);
    renderError();
  }
}

// -------- Eventos --------
const onInput = debounce((ev) => {
  state.q = ev.target.value;
  state.page = 1;
  setURL(state.q, state.page);
  fetchData();
}, 350);

$q.addEventListener('input', onInput);

$clear.addEventListener('click', () => {
  $q.value = '';
  state.q = '';
  state.page = 1;
  setURL('', 1);
  renderEmpty();
  $q.focus();
});

$prev.addEventListener('click', () => {
  if (state.page > 1) {
    state.page -= 1;
    setURL(state.q, state.page);
    fetchData();
  }
});

$next.addEventListener('click', () => {
  state.page += 1;
  setURL(state.q, state.page);
  fetchData();
});

// -------- Init --------
(function init() {
  const { q, page } = getURLState();
  state.q = q;
  state.page = page;
  if (q) $q.value = q;
  if (q.length >= 2) fetchData(); else renderEmpty();
})();
