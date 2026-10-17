//  Lógica del Reporte Ejecutivo "Sentinel Smart"
//  Depende de data.js (nistData) y app.js (auditStatus, getStats, getStatus, STATUS, escapeHtml).
//  Todos los porcentajes salen de getStats(), el mismo cálculo del tablero,
//  así el reporte siempre respeta el alcance y los estados de la auditoría.
//
//  El reporte se dibuja DENTRO de la página (#report-content), sin ventana emergente
//  y sin scripts internos, para poder activar la CSP.
//  Los estilos propios del reporte viven en report.css.
//
//  Regla de seguridad: TODO texto que se inserta en el HTML pasa por escapeHtml,
//  venga de lo que escribió la persona o de data.js (así, si algún día los datos
//  vienen de fuera, no se abre un hueco).

// ==========================================================
// 1. TEXTOS Y ESTADO DEL REPORTE
// ==========================================================

// Textos del reporte (en inglés) y la clase de color de cada estado (ver report.css).
const REPORT_STATUS = {
    todo:     { label: 'Not Started',    css: 'status-todo' },
    progress: { label: 'In Progress',    css: 'status-progress' },
    done:     { label: 'Implemented',    css: 'status-done' },
    na:       { label: 'Not Applicable', css: 'status-na' }
};

// Grupos de la sección 02, en el orden en que aparecen en el reporte.
// status  : estado que reúne el grupo (clave de REPORT_STATUS)
// hint    : frase corta debajo del título, para quien lee el reporte
// compact : true = fila compacta; false = tarjeta completa con nota del auditor
const DETAIL_GROUPS = [
    { status: 'done',     hint: 'Controls already in place',                      compact: true  },
    { status: 'progress', hint: 'Work under way: review the auditor notes',       compact: false },
    { status: 'todo',     hint: 'Still to be audited: evidence to request',       compact: true  },
    { status: 'na',       hint: 'Excluded from the percentages',                  compact: true  }
];

// Texto que se muestra cuando un dato de "Audit Details" quedó vacío.
const NOT_SPECIFIED = 'Not specified';

// Gráficos activos. Se guardan para destruirlos antes de dibujar otros nuevos
// (si no, Chart.js se queja al abrir el reporte por segunda vez).
let reportCharts = [];

// Título original de la página, para restaurarlo después de imprimir.
let originalTitle = document.title;

// ==========================================================
// 2. CÁLCULO DE DATOS (un solo lugar, lo usan todas las secciones)
// ==========================================================

// Convierte una fecha guardada (AAAA-MM-DD) en texto legible para el reporte.
// Se le agrega la hora a propósito ("T00:00:00"): sin eso, el navegador la
// interpreta en horario UTC y en algunos países mostraría el día anterior.
// Si no hay fecha guardada, usa la de hoy.
function formatReportDate(isoDate) {
    const date = isoDate ? new Date(isoDate + 'T00:00:00') : new Date();
    return date.toLocaleDateString('en-US');
}

// Fecha de HOY en horario local (AAAA-MM-DD), para el nombre del PDF.
// toISOString() usa horario UTC y, de noche, mostraría el día siguiente.
function reportTodayStamp() {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function collectReportData() {
    const labels = nistData.map(p => p.id.toUpperCase());

    // Porcentaje por función, calculado solo sobre los controles que cuentan.
    // Si no hay ninguno (todo fuera de alcance o todo "No aplica"), el valor es null (no se grafica).
    const values = nistData.map(pilar => {
        const stats = getStats(pilar.categories.flatMap(c => c.items));
        return stats.total ? stats.percent : null;
    });

    // Resumen general para el encabezado: alcance y conteo por estado.
    const allItems = nistData.flatMap(p => p.categories.flatMap(c => c.items));
    const globalStats = getStats(allItems);

    return {
        labels,
        values,
        allItems,
        globalStats,
        counts: globalStats.counts,
        outOfScopeCount: allItems.length - globalStats.scope,
        // Datos de "Audit Details" (vienen de app.js, ya validados)
        meta: {
            auditee: auditStatus.meta.auditee,
            auditor: auditStatus.meta.auditor,
            date: formatReportDate(auditStatus.meta.date)
        }
    };
}

// ==========================================================
// 3. SECCIONES DEL REPORTE (cada función devuelve un trozo de HTML)
//    Para añadir una sección nueva: crea otra función aquí
//    y añádela a la lista de buildReportHtml().
// ==========================================================

// Una línea del encabezado: etiqueta en gris + valor en negro.
// El valor viene de lo que escribió la persona, así que SIEMPRE pasa por escapeHtml.
// Si está vacío, se muestra "Not specified" en gris.
function buildHeaderLine(label, value) {
    const text = value && value.trim() ? escapeHtml(value.trim()) : '';
    return text
        ? `<p>${label}: <span class="text-zinc-900">${text}</span></p>`
        : `<p>${label}: ${NOT_SPECIFIED}</p>`;
}

// Encabezado con título, datos de la auditoría y alcance
function buildHeader(data) {
    return `
        <header class="flex justify-between items-start border-b-8 border-zinc-900 pb-10 mb-12">
            <div>
                <h1 class="text-6xl font-black tracking-tighter text-zinc-900 italic uppercase">NIST SENTINEL</h1>
                <p class="text-xl font-bold text-zinc-500 uppercase tracking-[0.2em] mt-2">NIST CSF Audit Assessment</p>
            </div>
            <div class="text-right font-bold text-zinc-400 text-[10px] uppercase space-y-1 max-w-xs">
                ${buildHeaderLine('Audited Area', data.meta.auditee)}
                ${buildHeaderLine('Auditor', data.meta.auditor)}
                <p>Audit Date: ${escapeHtml(data.meta.date)}</p>
                <p>Scope: ${data.globalStats.scope} of ${data.allItems.length} controls</p>
                <p class="text-zinc-900">Status: Internal Working Paper</p>
            </div>
        </header>`;
}

// Conteo por estado (solo controles dentro del alcance)
function buildSummary(data) {
    const c = data.counts;
    return `
        <div class="summary-row">
            <div class="summary-box"><div class="num">${c.done}</div><div class="lbl">Implemented</div></div>
            <div class="summary-box"><div class="num">${c.progress}</div><div class="lbl">In Progress</div></div>
            <div class="summary-box"><div class="num">${c.todo}</div><div class="lbl">Not Started</div></div>
            <div class="summary-box"><div class="num">${c.na}</div><div class="lbl">Not Applicable</div></div>
            <div class="summary-box"><div class="num">${data.outOfScopeCount}</div><div class="lbl">Out of Scope</div></div>
        </div>`;
}

// Sección 01: los dos gráficos (los canvas se llenan después, en drawReportCharts)
function buildChartsSection() {
    return `
        <section class="mb-16">
            <h2 class="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 border-b border-zinc-100 pb-4 mb-10 italic">01. Maturity Analysis Overview</h2>

            <div class="mb-12">
                <div class="flex flex-col md:flex-row gap-10 items-center bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100">
                    <div class="w-full md:w-1/2">
                        <canvas id="radarChart"></canvas>
                    </div>
                    <div class="w-full md:w-1/2 space-y-4">
                        <h3 class="text-xs font-black uppercase tracking-widest text-zinc-900">Maturity Fingerprint</h3>
                        <p class="text-xs text-zinc-500 leading-relaxed italic">
                            The Radar Chart visualizes the balance between the six NIST CSF functions. A symmetrical shape indicates a consistent security posture, while spikes reveal functional strengths or critical gaps in the cybersecurity lifecycle. Percentages are calculated only over the controls included in the audit scope; controls marked Not Applicable are excluded from the total, and only Implemented controls count toward progress.
                        </p>
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 bg-zinc-900 rounded-sm"></span>
                            <span class="text-[10px] font-bold uppercase text-zinc-400">Current Functional Coverage (%)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-12">
                <div class="flex flex-col md:flex-row-reverse gap-10 items-center bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100">
                    <div class="w-full md:w-1/2">
                        <canvas id="barChart"></canvas>
                    </div>
                    <div class="w-full md:w-1/2 space-y-4">
                        <h3 class="text-xs font-black uppercase tracking-widest text-zinc-900">Compliance Benchmark</h3>
                        <p class="text-xs text-zinc-500 leading-relaxed italic">
                            This metric represents the percentage of implemented controls per function. It serves as a quantitative baseline to measure progress against the NIST Cybersecurity Framework 2.0 core outcomes.
                        </p>
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 bg-blue-600 rounded-sm"></span>
                            <span class="text-[10px] font-bold uppercase text-zinc-400">Implementation Percentage</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="page-break"></div>`;
}

// Una tarjeta COMPLETA de control (código, estado, texto y notas del auditor).
// Se usa en el grupo "In Progress", donde las notas son lo más importante.
function buildControlRow(item) {
    const st = getStatus(item.code);
    const tag = REPORT_STATUS[st];
    const isDone = st === STATUS.DONE;
    const note = auditStatus.notes[item.code];

    return `
        <div class="p-5 ${isDone ? 'bg-white' : 'bg-zinc-50/50'} rounded-2xl border ${isDone ? 'border-zinc-200' : 'border-zinc-100'}">
            <div class="flex flex-col md:flex-row justify-between gap-6">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="font-black text-[10px] text-zinc-400">${escapeHtml(item.code)}</span>
                        <span class="status-tag ${escapeHtml(tag.css)}">${escapeHtml(tag.label)}</span>
                    </div>
                    <p class="text-sm font-bold text-zinc-800 leading-snug">${escapeHtml(item.text)}</p>
                </div>
                <div class="md:w-1/3 ${note ? 'bg-zinc-100/50 p-4 border-l-2 border-zinc-300' : 'border-2 border-dashed border-zinc-100'} rounded-xl flex flex-col justify-center">
                    ${note ? `
                        <span class="text-[9px] font-black uppercase text-zinc-400 block mb-1">Auditor Notes:</span>
                        <p class="text-[11px] italic text-zinc-600 leading-relaxed">"${escapeHtml(note)}"</p>
                    ` : `
                        <span class="text-[9px] font-bold text-zinc-300 uppercase italic text-center px-4">No evidence provided</span>
                    `}
                </div>
            </div>
        </div>`;
}

// Una fila COMPACTA de control: código + texto en una línea.
// Si el auditor dejó una nota, se muestra debajo (así no se pierde información).
function buildCompactRow(item) {
    const note = auditStatus.notes[item.code];
    return `
        <div class="p-4 bg-white rounded-2xl border border-zinc-200">
            <div class="flex items-center gap-3">
                <span class="font-black text-[10px] text-zinc-400">${escapeHtml(item.code)}</span>
                <div class="flex-1">
                    <p class="text-sm font-bold text-zinc-800 leading-snug">${escapeHtml(item.text)}</p>
                    ${note ? `<p class="text-[11px] italic text-zinc-600 leading-relaxed">Note: "${escapeHtml(note)}"</p>` : ''}
                </div>
            </div>
        </div>`;
}

// Un grupo de la sección 02: título con cantidad + la lista de controles.
// Si el grupo no tiene controles, muestra "None".
function buildStatusGroup(group, items) {
    const tag = REPORT_STATUS[group.status];
    const rowBuilder = group.compact ? buildCompactRow : buildControlRow;

    return `
        <div class="mb-12">
            <div class="flex justify-between items-end mb-6 border-l-4 border-zinc-900 pl-4">
                <div>
                    <h3 class="text-2xl font-black uppercase tracking-tighter">${escapeHtml(tag.label)}</h3>
                    <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">${escapeHtml(group.hint)}</p>
                </div>
                <div class="text-right">
                    <span class="text-2xl font-black text-zinc-900">${items.length}</span>
                </div>
            </div>

            ${items.length
                ? `<div class="space-y-3">${items.map(rowBuilder).join('')}</div>`
                : `<p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">None</p>`}
        </div>`;
}

// Sección 02: los controles en alcance, agrupados por estado.
// Dentro de cada grupo se respeta el orden de las funciones NIST (el de data.js).
function buildDetailSection(data) {
    const inScope = data.allItems.filter(i => !auditStatus.excluded[i.code]);
    const outItems = data.allItems.filter(i => auditStatus.excluded[i.code]);

    const groupsHtml = DETAIL_GROUPS
        .map(group => {
            const items = inScope.filter(i => getStatus(i.code) === group.status);
            // "Not Applicable" solo aparece si hay controles así; los otros grupos siempre.
            if (group.status === 'na' && items.length === 0) return '';
            return buildStatusGroup(group, items);
        })
        .join('');

    return `
        <section class="space-y-12">
            <h2 class="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 border-b border-zinc-100 pb-4 mb-8 italic">02. Control Status Log &amp; Evidence</h2>
            ${groupsHtml}
            ${outItems.length ? `
            <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-4 italic">
                Out of scope (${outItems.length}): ${outItems.map(i => escapeHtml(i.code)).join(', ')}
            </p>` : ''}
        </section>`;
}

// Pie con aviso y línea de firma
function buildFooter() {
    return `
        <footer class="mt-20 pt-10 border-t border-zinc-900 flex justify-between items-start italic">
            <div class="max-w-xs">
                <p class="text-[10px] leading-relaxed text-zinc-400 font-medium">
                    This report is a technical working document generated by NIST Sentinel. Findings must be validated by a certified Information Security Auditor.
                </p>
            </div>
            <div class="text-right">
                <div class="w-48 h-px bg-zinc-900 mb-2 ml-auto"></div>
                <p class="text-[10px] font-black text-zinc-900 uppercase">Authorized Auditor Signature</p>
            </div>
        </footer>`;
}

// Junta todas las secciones en el orden en que aparecen en el reporte
function buildReportHtml(data) {
    return `
        <div class="max-w-5xl mx-auto bg-white p-12 rounded-[3.5rem] shadow-2xl card-report border border-zinc-200">
            ${buildHeader(data)}
            ${buildSummary(data)}
            ${buildChartsSection()}
            ${buildDetailSection(data)}
            ${buildFooter()}
        </div>`;
}

// ==========================================================
// 4. GRÁFICOS (Chart.js, cargado desde vendor/ en index.html)
// ==========================================================

function drawReportCharts(labels, values) {
    // Destruimos los gráficos anteriores (si los hay)
    reportCharts.forEach(chart => chart.destroy());
    reportCharts = [];

    // Radar: balance entre las funciones
    reportCharts.push(new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Coverage Profile',
                data: values,
                backgroundColor: 'rgba(24, 24, 27, 0.1)',
                borderColor: '#18181b',
                borderWidth: 2,
                pointBackgroundColor: '#18181b',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            animation: false,   // sin animación: así el gráfico ya está completo al imprimir
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { display: false, stepSize: 20 },
                    grid: { color: '#e4e4e7' },
                    angleLines: { color: '#e4e4e7' },
                    pointLabels: { font: { weight: '900', size: 10 } }
                }
            },
            plugins: { legend: { display: false } }
        }
    }));

    // Barras: porcentaje implementado por función
    reportCharts.push(new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: '#2563eb',
                borderRadius: 6,
                barThickness: 20
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: '#f4f4f5' },
                    border: { display: false },
                    ticks: { font: { size: 9, weight: 'bold' } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 9, weight: '900' } }
                }
            },
            plugins: { legend: { display: false } }
        }
    }));
}

// ==========================================================
// 5. ACCIONES (las llama app.js desde sus tablas de eventos)
// ==========================================================

// Abre el reporte: lo escribe en la página, muestra la vista y dibuja los gráficos.
// (Mantiene el nombre de siempre, así "export-report" sigue funcionando igual.)
function generateProfessionalReport() {
    const data = collectReportData();

    document.getElementById('report-content').innerHTML = buildReportHtml(data);

    // Primero mostramos la vista y DESPUÉS dibujamos: Chart.js necesita
    // que el canvas sea visible para calcular su tamaño.
    document.body.classList.add('report-open');
    window.scrollTo(0, 0);
    drawReportCharts(data.labels, data.values);
}

// Cierra el reporte y vuelve al tablero
function closeReport() {
    document.body.classList.remove('report-open');
    reportCharts.forEach(chart => chart.destroy());
    reportCharts = [];
    document.getElementById('report-content').innerHTML = '';
}

// Imprime / guarda como PDF. El título de la página se convierte en el nombre
// sugerido del archivo, y se restaura al terminar.
function printReport() {
    originalTitle = document.title;
    document.title = `NIST-Sentinel_Audit_Report_${reportTodayStamp()}`;
    window.addEventListener('afterprint', () => { document.title = originalTitle; }, { once: true });
    window.print();
}
