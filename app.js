/* =========================================================
   NIST Sentinel - lógica principal

   Este archivo se carga DESPUÉS de:
     - data.js    -> define la lista `nistData` (los controles NIST)
     - report.js  -> define `generateProfessionalReport()`
   Orden de las secciones:
     1. Utilidades de seguridad
     2. Estado (carga y guardado)
     3. Tarjetas del tablero
     4. Ventana modal (checks y notas)
     5. Progreso global y tema
     6. Inicio
   ========================================================= */

const STORAGE_KEY = 'nist_audit_v2';
const MAX_NOTE_LENGTH = 5000;

/* ---------- 1. UTILIDADES DE SEGURIDAD ---------- */

// Convierte texto del usuario en texto "inofensivo" para HTML.
// Sin esto, una nota como  </textarea><img src=x onerror=...>  se ejecutaría
// como código. Se usa SIEMPRE que un texto escrito por alguien se pinta con innerHTML.
function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

/* ---------- 2. ESTADO ---------- */

// Lista de códigos válidos (GV.OC-01, ID.AM-01...). Solo estos se aceptan al cargar.
const VALID_CODES = new Set(
    nistData.flatMap(p => p.categories.flatMap(c => c.items.map(i => i.code)))
);

// Lee lo guardado y lo "limpia": si faltan datos, está corrupto o fue manipulado,
// se ignora lo raro en lugar de romper la app.
function loadAudit() {
    const clean = { checks: {}, notes: {} };
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!raw || typeof raw !== 'object') return clean;
        VALID_CODES.forEach(code => {
            if (raw.checks && raw.checks[code] === true) clean.checks[code] = true;
            if (raw.notes && typeof raw.notes[code] === 'string') {
                clean.notes[code] = raw.notes[code].slice(0, MAX_NOTE_LENGTH);
            }
        });
    } catch (err) {
        console.warn('Datos guardados ilegibles, se inicia vacío:', err);
    }
    return clean;
}

let auditStatus = loadAudit();

// Guarda en el navegador (sin redibujar nada).
function persist() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(auditStatus));
    } catch (err) {
        alert('No se pudo guardar (almacenamiento lleno o bloqueado por el navegador).');
    }
}

// Guarda y redibuja las tarjetas.
function save() {
    persist();
    renderCards();
}

// Cuenta controles marcados de una lista de items -> { checked, total, percent }
function getStats(items) {
    const checked = items.filter(i => auditStatus.checks[i.code]).length;
    const percent = items.length ? Math.round((checked / items.length) * 100) : 0;
    return { checked, total: items.length, percent };
}

/* ---------- 2b. COLORES DE LAS TARJETAS ----------
   Tailwind compila solo las clases que aparecen ESCRITAS COMPLETAS en el código.
   Una clase armada como `border-${color}-500` no se detecta y quedaría sin estilo.
   Por eso cada color se escribe completo aquí. Para agregar un color: copia un bloque. */
const COLOR_CLASSES = {
    zinc:   { border: 'border-zinc-500',   badge: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-400',     text: 'text-zinc-600 dark:text-zinc-400',     bar: 'bg-zinc-500' },
    blue:   { border: 'border-blue-500',   badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',     text: 'text-blue-600 dark:text-blue-400',     bar: 'bg-blue-500' },
    green:  { border: 'border-green-500',  badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', text: 'text-green-600 dark:text-green-400',   bar: 'bg-green-500' },
    yellow: { border: 'border-yellow-500', badge: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', text: 'text-yellow-600 dark:text-yellow-400', bar: 'bg-yellow-500' },
    red:    { border: 'border-red-500',    badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',         text: 'text-red-600 dark:text-red-400',       bar: 'bg-red-500' },
    purple: { border: 'border-purple-500', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', text: 'text-purple-600 dark:text-purple-400', bar: 'bg-purple-500' }
};

/* ---------- 3. TARJETAS DEL TABLERO ---------- */

// Cada función NIST es una tarjeta. La columna se decide por su avance:
// 0% -> Backlog, 1-99% -> In Progress, 100% -> Assessed.
function renderCards() {
    const colTodo = document.getElementById('col-todo');
    const colProgress = document.getElementById('col-progress');
    const colDone = document.getElementById('col-done');
    if (!colTodo || !colProgress || !colDone) return;

    colTodo.innerHTML = '';
    colProgress.innerHTML = '';
    colDone.innerHTML = '';

    nistData.forEach(pilar => {
        const { checked, total, percent } = getStats(pilar.categories.flatMap(c => c.items));

        const col = COLOR_CLASSES[pilar.color] || COLOR_CLASSES.zinc;
        const card = document.createElement('div');
        card.className = `card bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-md border-t-4 ${col.border} dark:border-zinc-800 transition-all duration-500`;
        card.dataset.id = pilar.id;

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="text-[10px] font-bold ${col.badge} px-2 py-0.5 rounded uppercase">${pilar.id}</span>
                <button onclick="openPilar('${pilar.id}')" class="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl hover:text-blue-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </div>
            <h4 class="font-bold text-sm uppercase">${pilar.title}</h4>
            <p class="text-[11px] text-zinc-500 mt-1 mb-4">${pilar.desc}</p>
            <div class="space-y-2">
                <div class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                    <span class="text-zinc-400">Progress</span>
                    <span class="${col.text}">${checked} / ${total} (${percent}%)</span>
                </div>
                <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div class="${col.bar} h-full transition-all duration-500" style="width: ${percent}%"></div>
                </div>
            </div>
        `;

        if (percent === 100) colDone.appendChild(card);
        else if (percent > 0) colProgress.appendChild(card);
        else colTodo.appendChild(card);
    });

    updateGlobalProgress();
}

/* ---------- 4. VENTANA MODAL (checks y notas) ---------- */

// Abre el detalle de una función: categorías desplegables con sus controles.
function openPilar(id) {
    const pilar = nistData.find(p => p.id === id);
    if (!pilar) return;

    document.getElementById('modal-title').innerText = pilar.title;
    document.getElementById('modal-cat-id').innerText = `Pilar ${pilar.id.toUpperCase()}`;
    const content = document.getElementById('modal-content');
    content.innerHTML = '';

    pilar.categories.forEach(cat => {
        const { percent } = getStats(cat.items);

        const section = document.createElement('div');
        section.className = 'mb-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden';
        section.innerHTML = `
            <button onclick="this.nextElementSibling.classList.toggle('hidden')"
                class="w-full flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 transition-all">
                <div class="text-left">
                    <p class="text-[9px] font-black text-blue-600 uppercase tracking-widest">${cat.id}</p>
                    <h5 class="text-sm font-bold text-zinc-800 dark:text-zinc-100">${cat.name}</h5>
                </div>
                <span id="badge-${cat.id}" class="text-[10px] px-2 py-1 rounded-lg border ${percent === 100 ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}">${percent}%</span>
            </button>
            <div class="hidden p-6 space-y-6 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                ${cat.items.map(item => {
                    const isChecked = auditStatus.checks[item.code];
                    return `
                    <div class="space-y-3">
                        <label class="flex items-start gap-4 cursor-pointer group">
                            <input type="checkbox" class="w-5 h-5 mt-1 rounded-lg accent-emerald-500"
                                ${isChecked ? 'checked' : ''}
                                onchange="toggleCheck('${item.code}', this)">
                            <div class="flex-1">
                                <p class="text-[10px] font-bold text-zinc-400">${item.code}</p>
                                <p class="item-text text-sm font-semibold ${isChecked ? 'line-through opacity-50' : ''}">${item.text}</p>
                            </div>
                        </label>
                        <textarea placeholder="Audit Notes..." maxlength="${MAX_NOTE_LENGTH}" class="w-full p-3 text-xs bg-zinc-50 dark:bg-zinc-800 border rounded-xl" oninput="saveNote('${item.code}', this.value)">${escapeHtml(auditStatus.notes[item.code] || '')}</textarea>
                    </div>`;
                }).join('')}
            </div>
        `;
        content.appendChild(section);
    });

    document.getElementById('modal').classList.remove('hidden');
}

// Marca/desmarca un control. Actualiza el tachado y el % de su categoría al instante.
function toggleCheck(code, inputEl) {
    auditStatus.checks[code] = inputEl.checked;

    const label = inputEl.closest('label');
    label.querySelector('.item-text').classList.toggle('line-through', inputEl.checked);
    label.querySelector('.item-text').classList.toggle('opacity-50', inputEl.checked);

    const cat = nistData.flatMap(p => p.categories).find(c => c.items.some(i => i.code === code));
    const badge = document.getElementById(`badge-${cat.id}`);
    const { percent } = getStats(cat.items);
    badge.innerText = `${percent}%`;
    badge.classList.toggle('bg-emerald-500', percent === 100);
    badge.classList.toggle('text-white', percent === 100);

    save();
}

// Guarda una nota. No redibuja tarjetas en cada tecla (antes lo hacía y era lento).
function saveNote(code, value) {
    auditStatus.notes[code] = value.slice(0, MAX_NOTE_LENGTH);
    persist();
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    renderCards(); // refresca el tablero al cerrar, por si hubo notas nuevas
}

/* ---------- 5. PROGRESO GLOBAL Y TEMA ---------- */

function updateGlobalProgress() {
    const { percent } = getStats(nistData.flatMap(p => p.categories.flatMap(c => c.items)));
    const bar = document.getElementById('main-progress-bar');
    const text = document.getElementById('total-percent');
    if (bar) bar.style.width = percent + '%';
    if (text) text.innerText = percent + '%';
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

/* ---------- 6. INICIO ---------- */

(function init() {
    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');

    // Arrastrar tarjetas (SortableJS). OJO: hoy arrastrar es solo visual,
    // porque la columna se calcula por avance y se recalcula al guardar.
    if (typeof Sortable !== 'undefined') {
        ['col-todo', 'col-progress', 'col-done'].forEach(id => {
            new Sortable(document.getElementById(id), {
                group: 'nist-kanban', animation: 300, ghostClass: 'bg-blue-500/10'
            });
        });
    }

    renderCards();
})();
