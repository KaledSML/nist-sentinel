/* =========================================================
   NIST Sentinel - lógica principal

   Este archivo se carga DESPUÉS de:
     - data.js    -> define la lista `nistData` (los controles NIST)
     - report.js  -> define `generateProfessionalReport()`
   Orden de las secciones:
     1. Utilidades de seguridad
     2. Estados y carga/guardado
     3. Colores de las tarjetas
     4. Tarjetas del tablero
     5. Ventana modal (estados, notas y alcance)
     6. Datos de la auditoría (área auditada, auditor, fecha)
     7. Progreso global y tema
     8. Eventos (un solo "oyente" para toda la página)
     9. Inicio

   NOTA: los textos que ve el usuario están en inglés.
   Los comentarios del código se quedan en español.
   ========================================================= */

const STORAGE_KEY = 'nist_audit_v2';
const MAX_NOTE_LENGTH = 5000;
const MAX_META_LENGTH = 200;   // largo máximo de "área auditada" y "auditor"

/* ---------- 1. UTILIDADES DE SEGURIDAD ---------- */

// Convierte texto del usuario en texto "inofensivo" para HTML.
// Sin esto, una nota como  </textarea><img src=x onerror=...>  se ejecutaría
// como código. Se usa SIEMPRE que un texto escrito por alguien se pinta con innerHTML.
function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

/* ---------- 2. ESTADOS Y CARGA/GUARDADO ---------- */

// Los cuatro estados posibles de un control.
// El valor (izquierda) es lo que se guarda; el texto (derecha) es lo que se ve.
// "todo" (Not Started) es el estado por defecto y NO se guarda (ahorra espacio).
const STATUS = {
    TODO: 'todo',          // Not Started
    PROGRESS: 'progress',  // In Progress
    DONE: 'done',          // Implemented
    NA: 'na'               // Not Applicable
};

// Textos visibles de cada estado (en inglés, iguales a los del reporte).
const STATUS_LABELS = {
    todo: 'Not Started',
    progress: 'In Progress',
    done: 'Implemented',
    na: 'Not Applicable'
};

const VALID_STATUSES = new Set(Object.values(STATUS));

// Lista de códigos válidos (GV.OC-01, ID.AM-01...). Solo estos se aceptan al cargar.
const VALID_CODES = new Set(
    nistData.flatMap(p => p.categories.flatMap(c => c.items.map(i => i.code)))
);

// Campos de texto permitidos en `meta` (área auditada y auditor).
// La fecha se valida aparte porque tiene un formato especial.
const META_TEXT_FIELDS = ['auditee', 'auditor'];

// Limpia un texto de `meta`: solo acepta texto, quita espacios sobrantes
// y lo corta al largo máximo. Si no es texto, devuelve vacío.
function cleanMetaText(value) {
    return typeof value === 'string' ? value.trim().slice(0, MAX_META_LENGTH) : '';
}

// Valida una fecha en formato AAAA-MM-DD. Devuelve la fecha si es real
// (por ejemplo rechaza 2026-02-31) o '' si no lo es.
function cleanMetaDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
    const d = new Date(value + 'T00:00:00Z');
    return !isNaN(d) && d.toISOString().slice(0, 10) === value ? value : '';
}

// Lee lo guardado y lo "limpia": si faltan datos, está corrupto o fue manipulado,
// se ignora lo raro en lugar de romper la app.
//   status   = estado de cada control (solo los que NO son "Not Started")
//   notes    = notas del auditor
//   excluded = controles fuera del alcance (vacío = todo entra)
//   meta     = datos de la auditoría { auditee, auditor, date } (todo opcional)
//
// MIGRACIÓN: la versión anterior guardaba `checks` (true = revisado).
// Si no existe `status` pero sí `checks`, cada control marcado pasa a "Implemented".
// Los datos guardados sin `meta` se leen como vacíos (no se rompe nada).
function loadAudit() {
    const clean = {
        status: {}, notes: {}, excluded: {},
        meta: { auditee: '', auditor: '', date: '' }
    };
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!raw || typeof raw !== 'object') return clean;
        const isOldFormat = !raw.status && raw.checks;

        VALID_CODES.forEach(code => {
            // Estado (formato nuevo)
            const st = raw.status && raw.status[code];
            if (VALID_STATUSES.has(st) && st !== STATUS.TODO) {
                clean.status[code] = st;
            }
            // Estado (migración desde el formato anterior)
            else if (isOldFormat && raw.checks[code] === true) {
                clean.status[code] = STATUS.DONE;
            }

            if (raw.excluded && raw.excluded[code] === true) clean.excluded[code] = true;

            if (raw.notes && typeof raw.notes[code] === 'string') {
                clean.notes[code] = raw.notes[code].slice(0, MAX_NOTE_LENGTH);
            }
        });

        // Datos de la auditoría (si no existen, se quedan vacíos)
        if (raw.meta && typeof raw.meta === 'object') {
            META_TEXT_FIELDS.forEach(field => {
                clean.meta[field] = cleanMetaText(raw.meta[field]);
            });
            clean.meta.date = cleanMetaDate(raw.meta.date);
        }
    } catch (err) {
        console.warn('Datos guardados ilegibles, se inicia vacío:', err);
    }
    return clean;
}

let auditStatus = loadAudit();

// Devuelve el estado de un control. Si no tiene ninguno guardado, es "Not Started".
function getStatus(code) {
    return auditStatus.status[code] || STATUS.TODO;
}

// Guarda en el navegador (sin redibujar nada).
function persist() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(auditStatus));
    } catch (err) {
        alert('Could not save (storage is full or blocked by the browser).');
    }
}

// Guarda y redibuja las tarjetas.
function save() {
    persist();
    renderCards();
}

// Calcula los números de un grupo de controles (una categoría, una función o todo).
// Reglas:
//   - Fuera de alcance: no cuenta para nada.
//   - "Not Applicable": está en alcance, pero sale del total (no baja ni sube el %).
//   - Solo "Implemented" suma al avance (Opción A: "In Progress" no suma).
// Devuelve:
//   done    = controles implementados
//   total   = controles que cuentan para el % (en alcance y que aplican)
//   percent = done / total, redondeado
//   scope   = controles en alcance (incluye "Not Applicable")
//   counts  = conteo por estado { todo, progress, done, na } (solo en alcance)
function getStats(items) {
    const counts = { todo: 0, progress: 0, done: 0, na: 0 };
    let scope = 0;

    items.forEach(item => {
        if (auditStatus.excluded[item.code]) return;
        scope++;
        counts[getStatus(item.code)]++;
    });

    const total = scope - counts.na;
    const percent = total ? Math.round((counts.done / total) * 100) : 0;
    return { done: counts.done, total, percent, scope, counts };
}

/* ---------- 3. COLORES DE LAS TARJETAS ----------
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

/* ---------- 4. TARJETAS DEL TABLERO ---------- */

// Cada función NIST es una tarjeta. La columna se decide así:
//   100% (y con controles que cuentan)  -> Assessed
//   algún avance o algún "In Progress"  -> In Progress
//   nada                                -> Backlog
function renderCards() {
    const colTodo = document.getElementById('col-todo');
    const colProgress = document.getElementById('col-progress');
    const colDone = document.getElementById('col-done');
    if (!colTodo || !colProgress || !colDone) return;

    colTodo.innerHTML = '';
    colProgress.innerHTML = '';
    colDone.innerHTML = '';

    nistData.forEach(pilar => {
        const { done, total, percent, scope, counts } = getStats(pilar.categories.flatMap(c => c.items));

        // Texto de la tarjeta según la situación de la función
        let progressLabel;
        if (scope === 0) progressLabel = 'Out of scope';              // todo excluido
        else if (total === 0) progressLabel = 'Not applicable';       // todo en alcance es "Not Applicable"
        else progressLabel = `${done} / ${total} (${percent}%)`;

        const col = COLOR_CLASSES[pilar.color] || COLOR_CLASSES.zinc;
        const card = document.createElement('div');
        card.className = `card bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-md border-t-4 ${col.border} dark:border-zinc-800 transition-all duration-500`;
        card.dataset.id = pilar.id;

        // El botón NO lleva código dentro: solo una etiqueta (data-action) que dice
        // qué hacer y un dato (data-id) que dice con qué función. El "oyente" de la
        // sección 8 se encarga del resto.
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="text-[10px] font-bold ${col.badge} px-2 py-0.5 rounded uppercase">${pilar.id}</span>
                <button data-action="open-pilar" data-id="${escapeHtml(pilar.id)}" aria-label="Open ${escapeHtml(pilar.title)}" class="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl hover:text-blue-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </div>
            <h4 class="font-bold text-sm uppercase">${pilar.title}</h4>
            <p class="text-[11px] text-zinc-500 mt-1 mb-4">${pilar.desc}</p>
            <div class="space-y-2">
                <div class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                    <span class="text-zinc-400">Progress</span>
                    <span class="${col.text}">${progressLabel}</span>
                </div>
                <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div class="${col.bar} h-full transition-all duration-500" style="width: ${percent}%"></div>
                </div>
            </div>
        `;

        if (total > 0 && percent === 100) colDone.appendChild(card);
        else if (percent > 0 || counts.progress > 0) colProgress.appendChild(card);
        else colTodo.appendChild(card);
    });

    updateGlobalProgress();
}

/* ---------- 5. VENTANA MODAL (estados, notas y alcance) ---------- */

// Clases del texto de un control según su estado.
// Implemented -> tachado y atenuado | Not Applicable -> solo atenuado.
// (Se escriben completas a propósito, por Tailwind.)
function itemTextClass(status) {
    if (status === STATUS.DONE) return 'line-through opacity-50';
    if (status === STATUS.NA) return 'opacity-50';
    return '';
}

// Crea las <option> del selector, dejando marcada la del estado actual.
function statusOptionsHtml(current) {
    return Object.values(STATUS).map(value =>
        `<option value="${value}" ${value === current ? 'selected' : ''}>${STATUS_LABELS[value]}</option>`
    ).join('');
}

// Abre el detalle de una función: categorías desplegables con sus controles.
// Igual que en las tarjetas, ningún elemento lleva código dentro:
// solo data-action (qué hacer) y data-code / data-cat (con qué control o categoría).
function openPilar(id) {
    const pilar = nistData.find(p => p.id === id);
    if (!pilar) return;

    document.getElementById('modal-title').innerText = pilar.title;
    document.getElementById('modal-cat-id').innerText = `Function ${pilar.id.toUpperCase()}`;
    const content = document.getElementById('modal-content');
    content.innerHTML = '';

    pilar.categories.forEach(cat => {
        const { percent } = getStats(cat.items);
        const allInScope = cat.items.every(i => !auditStatus.excluded[i.code]);

        const section = document.createElement('div');
        section.className = 'mb-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden';
        section.innerHTML = `
            <button data-action="toggle-category"
                class="w-full flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 transition-all">
                <div class="text-left">
                    <p class="text-[9px] font-black text-blue-600 uppercase tracking-widest">${cat.id}</p>
                    <h5 class="text-sm font-bold text-zinc-800 dark:text-zinc-100">${cat.name}</h5>
                </div>
                <span id="badge-${cat.id}" class="text-[10px] px-2 py-1 rounded-lg border ${percent === 100 ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}">${percent}%</span>
            </button>
            <div class="hidden p-6 space-y-6 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                <label class="flex items-center gap-4 cursor-pointer">
                    <input type="checkbox" id="master-${cat.id}" class="w-4 h-4 rounded accent-emerald-500"
                        ${allInScope ? 'checked' : ''}
                        data-action="toggle-category-scope" data-cat="${escapeHtml(cat.id)}">
                    <span class="text-[10px] font-bold uppercase text-zinc-500">Include whole category in scope</span>
                </label>
                ${cat.items.map(item => {
                    const status = getStatus(item.code);
                    const isOut = auditStatus.excluded[item.code];
                    const code = escapeHtml(item.code);
                    return `
                    <div id="item-${item.code}" class="space-y-3 ${isOut ? 'opacity-50' : ''}">
                        <div>
                            <p class="text-[10px] font-bold text-zinc-400">${item.code}</p>
                            <p class="item-text text-sm font-semibold ${itemTextClass(status)}">${item.text}</p>
                        </div>
                        <select aria-label="Status of ${code}" class="w-full p-3 text-xs bg-zinc-50 dark:bg-zinc-800 border rounded-xl"
                            data-action="set-status" data-code="${code}">
                            ${statusOptionsHtml(status)}
                        </select>
                        <textarea placeholder="Audit Notes..." maxlength="${MAX_NOTE_LENGTH}" class="w-full p-3 text-xs bg-zinc-50 dark:bg-zinc-800 border rounded-xl" data-action="save-note" data-code="${code}">${escapeHtml(auditStatus.notes[item.code] || '')}</textarea>
                        <label class="flex items-center gap-4 cursor-pointer">
                            <input type="checkbox" class="scope-box w-4 h-4 rounded accent-emerald-500"
                                ${isOut ? '' : 'checked'}
                                data-action="toggle-scope" data-code="${code}">
                            <span class="text-[10px] font-bold uppercase text-zinc-500">In scope</span>
                        </label>
                    </div>`;
                }).join('')}
            </div>
        `;
        content.appendChild(section);
    });

    document.getElementById('modal').classList.remove('hidden');
}

// Cambia el estado de un control desde el selector.
// "Not Started" no se guarda (es el valor por defecto), así el archivo queda más limpio.
function setStatus(code, value) {
    if (!VALID_CODES.has(code) || !VALID_STATUSES.has(value)) return;

    if (value === STATUS.TODO) delete auditStatus.status[code];
    else auditStatus.status[code] = value;

    refreshModal();
    save();
}

// Guarda una nota. No redibuja tarjetas en cada tecla (antes lo hacía y era lento).
function saveNote(code, value) {
    if (!VALID_CODES.has(code)) return;
    auditStatus.notes[code] = value.slice(0, MAX_NOTE_LENGTH);
    persist();
}

// Refresca lo que se ve dentro de la ventana abierta, sin volver a dibujarla:
// el % de cada categoría, la casilla maestra, el atenuado/tachado de cada control.
function refreshModal() {
    nistData.flatMap(p => p.categories).forEach(cat => {
        const badge = document.getElementById(`badge-${cat.id}`);
        if (!badge) return; // esta categoría no está en la ventana abierta

        // Porcentaje de la categoría
        const { percent } = getStats(cat.items);
        badge.innerText = `${percent}%`;
        badge.classList.toggle('bg-emerald-500', percent === 100);
        badge.classList.toggle('text-white', percent === 100);

        // Casilla maestra: marcada solo si TODOS los controles están en alcance
        const master = document.getElementById(`master-${cat.id}`);
        if (master) master.checked = cat.items.every(i => !auditStatus.excluded[i.code]);

        // Cada control: atenuado si está fuera de alcance, estilo del texto según estado
        cat.items.forEach(item => {
            const row = document.getElementById(`item-${item.code}`);
            if (!row) return;

            const out = !!auditStatus.excluded[item.code];
            row.classList.toggle('opacity-50', out);

            const scopeBox = row.querySelector('.scope-box');
            if (scopeBox) scopeBox.checked = !out;

            const text = row.querySelector('.item-text');
            if (text) text.className = `item-text text-sm font-semibold ${itemTextClass(getStatus(item.code))}`;
        });
    });
}

// Incluye o excluye UN control del alcance. checked = true significa "entra en la auditoría".
function toggleScope(code, inputEl) {
    if (!VALID_CODES.has(code)) return;
    if (inputEl.checked) delete auditStatus.excluded[code];
    else auditStatus.excluded[code] = true;
    refreshModal();
    save();
}

// Incluye o excluye TODOS los controles de una categoría de una sola vez.
function toggleCategoryScope(catId, inputEl) {
    const cat = nistData.flatMap(p => p.categories).find(c => c.id === catId);
    if (!cat) return;
    cat.items.forEach(item => {
        if (inputEl.checked) delete auditStatus.excluded[item.code];
        else auditStatus.excluded[item.code] = true;
    });
    refreshModal();
    save();
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    renderCards(); // refresca el tablero al cerrar, por si hubo notas nuevas
}

/* ---------- 6. DATOS DE LA AUDITORÍA (área auditada, auditor, fecha) ----------
   Una ventanita con tres campos. Todo es opcional.
   Los valores se guardan en auditStatus.meta y el reporte los leerá desde ahí.
   Cada campo del HTML lleva  data-action="save-meta"  y  data-field="auditee|auditor|date".
   IDs que debe tener el HTML:  meta-modal, meta-auditee, meta-auditor, meta-date. */

// Abre la ventanita y rellena los campos con lo que ya está guardado.
function openMeta() {
    const modal = document.getElementById('meta-modal');
    if (!modal) return;

    ['auditee', 'auditor', 'date'].forEach(field => {
        const input = document.getElementById(`meta-${field}`);
        if (input) input.value = auditStatus.meta[field];
    });
    modal.classList.remove('hidden');
}

function closeMeta() {
    const modal = document.getElementById('meta-modal');
    if (modal) modal.classList.add('hidden');
}

// Guarda un campo de los datos de la auditoría mientras se escribe.
// Valida igual que loadAudit(): solo campos conocidos, texto limpio y fecha real.
function saveMeta(field, value) {
    if (field === 'date') {
        auditStatus.meta.date = cleanMetaDate(value);
    } else if (META_TEXT_FIELDS.includes(field)) {
        // Aquí NO se usa trim(): si no, no se podría escribir un espacio entre palabras.
        auditStatus.meta[field] = String(value).slice(0, MAX_META_LENGTH);
    } else {
        return; // campo desconocido: se ignora
    }
    persist();
}

/* ---------- 7. PROGRESO GLOBAL Y TEMA ---------- */

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

/* ---------- 8. EVENTOS (un solo "oyente" para toda la página) ----------
   En vez de poner onclick="..." dentro de cada botón, cada elemento lleva una etiqueta
   data-action="nombre". Aquí hay una tabla que dice qué función corresponde a cada nombre,
   y UN solo oyente por tipo de evento que busca la etiqueta y llama a la función.

   Ventajas:
     - El HTML ya no contiene código (requisito para una CSP estricta).
     - Funciona aunque las tarjetas y la ventana se redibujen, porque el oyente
       está en `document`, que nunca se redibuja.
     - Para agregar un botón nuevo: ponle data-action y añade una línea en la tabla.
   Cada función recibe el elemento que disparó el evento (el `el`). */

// Al hacer clic (botones)
const CLICK_ACTIONS = {
    'open-pilar':      el => openPilar(el.dataset.id),
    'toggle-category': el => el.nextElementSibling.classList.toggle('hidden'),
    'close-modal':     () => closeModal(),
    'toggle-theme':    () => toggleTheme(),
    'open-meta':       () => openMeta(),      //  abre "Audit Details"
    'close-meta':      () => closeMeta(),     //  cierra "Audit Details"
    'export-report':   () => generateProfessionalReport(),
    'close-report':    () => closeReport(),   //  vuelve al tablero
    'print-report':    () => printReport(),   //  imprime / guarda como PDF
    'export-excel':    () => downloadExcel() //  NUEVO 5c: descarga el checklist en Excel
};

// Al cambiar un valor (selectores y casillas)
const CHANGE_ACTIONS = {
    'set-status':            el => setStatus(el.dataset.code, el.value),
    'toggle-scope':          el => toggleScope(el.dataset.code, el),
    'toggle-category-scope': el => toggleCategoryScope(el.dataset.cat, el)
};

// Al escribir (cajas de texto)
const INPUT_ACTIONS = {
    'save-note': el => saveNote(el.dataset.code, el.value),
    'save-meta': el => saveMeta(el.dataset.field, el.value)
};

// Crea un oyente que busca la etiqueta data-action más cercana al elemento tocado.
function listenFor(eventName, actions) {
    document.addEventListener(eventName, event => {
        const el = event.target.closest('[data-action]');
        if (!el) return;
        const action = actions[el.dataset.action];
        if (action) action(el);
    });
}

/* ---------- 9. INICIO ---------- */

(function init() {
    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');

    listenFor('click', CLICK_ACTIONS);
    listenFor('change', CHANGE_ACTIONS);
    listenFor('input', INPUT_ACTIONS);

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
