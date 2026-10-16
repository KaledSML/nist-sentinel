//  Lógica del Reporte Ejecutivo "Sentinel Smart"
//  Depende de data.js (nistData) y app.js (auditStatus, getStats, getStatus, STATUS, escapeHtml).
//  Todos los porcentajes salen de getStats(), el mismo cálculo del tablero,
//  así el reporte siempre respeta el alcance y los estados de la auditoría.

// Textos del reporte (en inglés) y la clase de color de cada estado.
// Los colores están definidos en el <style> del reporte (no usan Tailwind),
// así no hace falta recompilar tailwind.css.
const REPORT_STATUS = {
    todo:     { label: 'Not Started',   css: 'status-todo' },
    progress: { label: 'In Progress',   css: 'status-progress' },
    done:     { label: 'Implemented',   css: 'status-done' },
    na:       { label: 'Not Applicable', css: 'status-na' }
};

function generateProfessionalReport() {
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
    const outOfScopeCount = allItems.length - globalStats.scope;
    const c = globalStats.counts;

    const reportWindow = window.open('', '_blank');

    // Ruta de la carpeta actual: permite que la ventana del reporte
    // encuentre tailwind.css y vendor/chart.umd.min.js sin internet.
    const base = new URL('.', location.href).href;

    reportWindow.document.write(`
        <html>
        <head>
            <title>NIST-Sentinel_Audit_Report_${new Date().toISOString().split('T')[0]}</title>
            <base href="${base}">
            <link rel="stylesheet" href="tailwind.css">
            <script src="vendor/chart.umd.min.js"></script>
            <style>
                body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; color: #18181b; }
                @media print {
                    .no-print { display: none !important; }
                    body { background: white; padding: 0; }
                    .card-report { border: 1px solid #e4e4e7 !important; box-shadow: none !important; border-radius: 20px !important; }
                    .page-break { page-break-before: always; }
                    /* Para que los colores de los estados salgan también al imprimir */
                    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }

                /* Etiquetas de estado (colores propios, sin depender de Tailwind) */
                .status-tag { font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 99px; text-transform: uppercase; }
                .status-done     { background: #d1fae5; color: #047857; }
                .status-progress { background: #fef3c7; color: #b45309; }
                .status-todo     { background: #e4e4e7; color: #71717a; }
                .status-na       { background: #e0e7ff; color: #4338ca; }

                /* Resumen por estado del encabezado */
                .summary-row { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 48px; }
                .summary-box { flex: 1; min-width: 120px; padding: 14px 16px; border: 1px solid #e4e4e7; border-radius: 16px; background: #fafafa; }
                .summary-box .num { font-size: 24px; font-weight: 900; color: #18181b; }
                .summary-box .lbl { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #a1a1aa; }
            </style>
        </head>
        <body class="bg-zinc-100 p-8">
            <div class="max-w-5xl mx-auto mb-6 flex justify-end no-print">
                <button onclick="window.print()" class="bg-zinc-900 hover:bg-black text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95">
                    🖨️ Export Official PDF
                </button>
            </div>

            <div class="max-w-5xl mx-auto bg-white p-12 rounded-[3.5rem] shadow-2xl card-report border border-zinc-200">
                <header class="flex justify-between items-start border-b-8 border-zinc-900 pb-10 mb-12">
                    <div>
                        <h1 class="text-6xl font-black tracking-tighter text-zinc-900 italic uppercase">NIST SENTINEL</h1>
                        <p class="text-xl font-bold text-zinc-500 uppercase tracking-[0.2em] mt-2">NIST CSF Audit Assessment</p>
                    </div>
                    <div class="text-right font-bold text-zinc-400 text-[10px] uppercase space-y-1">
                        <p>Report ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        <p>Audit Date: ${new Date().toLocaleDateString('en-US')}</p>
                        <p>Scope: ${globalStats.scope} of ${allItems.length} controls</p>
                        <p class="text-zinc-900">Status: Internal Working Paper</p>
                    </div>
                </header>

                <!-- Conteo por estado (solo controles dentro del alcance) -->
                <div class="summary-row">
                    <div class="summary-box"><div class="num">${c.done}</div><div class="lbl">Implemented</div></div>
                    <div class="summary-box"><div class="num">${c.progress}</div><div class="lbl">In Progress</div></div>
                    <div class="summary-box"><div class="num">${c.todo}</div><div class="lbl">Not Started</div></div>
                    <div class="summary-box"><div class="num">${c.na}</div><div class="lbl">Not Applicable</div></div>
                    <div class="summary-box"><div class="num">${outOfScopeCount}</div><div class="lbl">Out of Scope</div></div>
                </div>

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

                <div class="page-break"></div>

                <section class="space-y-12">
                    <h2 class="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 border-b border-zinc-100 pb-4 mb-8 italic">02. Detailed Control Log & Evidence</h2>
                    
                    ${nistData.map((pilar, index) => {
                        const items = pilar.categories.flatMap(c => c.items);
                        // Separamos los controles según el alcance
                        const inScopeItems = items.filter(i => !auditStatus.excluded[i.code]);
                        const outItems = items.filter(i => auditStatus.excluded[i.code]);
                        const pilarValue = values[index];

                        // Texto grande de la derecha: % o la razón por la que no hay %
                        let pilarLabel;
                        if (inScopeItems.length === 0) pilarLabel = 'Out of Scope';
                        else if (pilarValue === null) pilarLabel = 'Not Applicable';
                        else pilarLabel = pilarValue + '%';

                        return `
                        <div class="mb-12">
                            <div class="flex justify-between items-end mb-6 border-l-4 border-zinc-900 pl-4">
                                <div>
                                    <h3 class="text-2xl font-black uppercase tracking-tighter">${pilar.title}</h3>
                                    <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">${pilar.id} Function</p>
                                </div>
                                <div class="text-right">
                                    <span class="text-2xl font-black text-zinc-900">${pilarLabel}</span>
                                </div>
                            </div>

                            <div class="space-y-3">
                                ${inScopeItems.map(item => {
                                    const st = getStatus(item.code);
                                    const tag = REPORT_STATUS[st];
                                    const isDone = st === STATUS.DONE;
                                    const note = auditStatus.notes[item.code];
                                    return `
                                    <div class="p-5 ${isDone ? 'bg-white' : 'bg-zinc-50/50'} rounded-2xl border ${isDone ? 'border-zinc-200' : 'border-zinc-100'}">
                                        <div class="flex flex-col md:flex-row justify-between gap-6">
                                            <div class="flex-1">
                                                <div class="flex items-center gap-3 mb-2">
                                                    <span class="font-black text-[10px] text-zinc-400">${item.code}</span>
                                                    <span class="status-tag ${tag.css}">${tag.label}</span>
                                                </div>
                                                <p class="text-sm font-bold text-zinc-800 leading-snug">${item.text}</p>
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
                                    </div>
                                    `;
                                }).join('')}
                            </div>

                            ${outItems.length ? `
                            <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-4 italic">
                                Out of scope (${outItems.length}): ${outItems.map(i => i.code).join(', ')}
                            </p>` : ''}
                        </div>`;
                    }).join('')}
                </section>

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
                </footer>
            </div>

            <script>
                const labels = ${JSON.stringify(labels)};
                const dataValues = ${JSON.stringify(values)};

                // Radar Chart configuration
                new Chart(document.getElementById('radarChart'), {
                    type: 'radar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Coverage Profile',
                            data: dataValues,
                            backgroundColor: 'rgba(24, 24, 27, 0.1)',
                            borderColor: '#18181b',
                            borderWidth: 2,
                            pointBackgroundColor: '#18181b',
                            pointRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
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
                });

                // Bar Chart configuration
                new Chart(document.getElementById('barChart'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: dataValues,
                            backgroundColor: '#2563eb', // A slight blue touch for progress
                            borderRadius: 6,
                            barThickness: 20
                        }]
                    },
                    options: {
                        responsive: true,
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
                });
            </script>
        </body>
        </html>
    `);
}
