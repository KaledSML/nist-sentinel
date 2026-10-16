//  Descarga a Excel (Meta 5c)
//  Depende de ExcelJS (vendor/exceljs.min.js), data.js (nistData) y report.js
//  (collectReportData, REPORT_STATUS, NOT_SPECIFIED), además de app.js
//  (auditStatus, getStats, getStatus).
//  Lee los MISMOS datos que el reporte, así el Excel y el PDF nunca se contradicen.
//
//  Genera un libro con dos hojas:
//    "Checklist": un control por fila, con su estado y la nota del auditor.
//    "Summary"  : datos de la auditoría + conteo por función.
//  El archivo se arma en memoria y se descarga con un Blob (sin servidor, sin internet).

// ==========================================================
// 1. CONSTANTES (textos en inglés, colores del Excel)
// ==========================================================

// Texto de estado para los controles fuera del alcance
const EXCEL_OUT_OF_SCOPE = 'Out of Scope';

// Color de fondo (ARGB) de la celda de estado
const EXCEL_STATUS_FILL = {
    todo:     'FFF4F4F5',
    progress: 'FFDBEAFE',
    done:     'FFD1FAE5',
    na:       'FFFEF3C7',
    out:      'FFE4E4E7'
};

const EXCEL_HEADER_FILL = 'FF18181B';   // fondo de los encabezados (casi negro)
const EXCEL_HEADER_FONT = 'FFFFFFFF';   // texto de los encabezados (blanco)

// ==========================================================
// 2. AYUDAS
// ==========================================================

// Protección contra fórmulas: si un texto escrito por una persona empieza con
// = + - @ (o tabulador / salto de línea), le anteponemos un apóstrofe.
// ExcelJS ya guarda los textos como TEXTO (no como fórmula); esto es una
// protección extra por si el archivo se convierte luego a CSV u otro programa.
function excelSafeText(value) {
    const text = String(value == null ? '' : value);
    return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

// Nombre visible de una función o categoría de data.js.
// Prueba varios nombres de campo por si cambian; si no hay ninguno, usa el id.
function excelLabel(obj) {
    return String(obj.name || obj.title || obj.id || '');
}

// Pinta una fila de encabezado (fondo oscuro, texto blanco y en negrita)
function styleHeaderRow(row) {
    row.eachCell(cell => {
        cell.font = { bold: true, color: { argb: EXCEL_HEADER_FONT } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: EXCEL_HEADER_FILL } };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });
}

// Pone un color de fondo sólido a una celda
function fillCell(cell, argb) {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb } };
}

// ==========================================================
// 3. HOJA "CHECKLIST" (un control por fila)
// ==========================================================

function buildChecklistSheet(workbook) {
    const ws = workbook.addWorksheet('Checklist', {
        views: [{ state: 'frozen', ySplit: 1 }]   // el encabezado queda fijo al bajar
    });

    ws.columns = [
        { header: 'Function',      key: 'fn',     width: 16 },
        { header: 'Category',      key: 'cat',    width: 30 },
        { header: 'Code',          key: 'code',   width: 12 },
        { header: 'Control',       key: 'text',   width: 70 },
        { header: 'Status',        key: 'status', width: 16 },
        { header: 'Auditor Notes', key: 'notes',  width: 60 }
    ];
    styleHeaderRow(ws.getRow(1));

    nistData.forEach(pilar => {
        pilar.categories.forEach(cat => {
            cat.items.forEach(item => {
                const isOut = Boolean(auditStatus.excluded[item.code]);
                const st = getStatus(item.code);

                const row = ws.addRow({
                    fn:     excelLabel(pilar).toUpperCase(),
                    cat:    excelLabel(cat),
                    code:   item.code,
                    text:   item.text,
                    status: isOut ? EXCEL_OUT_OF_SCOPE : REPORT_STATUS[st].label,
                    notes:  excelSafeText(auditStatus.notes[item.code] || '')
                });

                // Color de la celda de estado
                fillCell(row.getCell('status'), EXCEL_STATUS_FILL[isOut ? 'out' : st]);

                // Texto largo: que se ajuste y se alinee arriba
                row.eachCell(cell => {
                    cell.alignment = { vertical: 'top', wrapText: true };
                });
            });
        });
    });

    // Filtros en el encabezado (para filtrar por estado, función, etc.)
    ws.autoFilter = { from: 'A1', to: { row: ws.rowCount, column: 6 } };
}

// ==========================================================
// 4. HOJA "SUMMARY" (datos de la auditoría + conteo por función)
// ==========================================================

function buildSummarySheet(workbook, data) {
    const ws = workbook.addWorksheet('Summary');
    ws.columns = [
        { width: 26 }, { width: 14 }, { width: 14 }, { width: 14 },
        { width: 16 }, { width: 14 }, { width: 12 }
    ];

    // Título
    ws.addRow(['NIST SENTINEL: NIST CSF Audit Assessment']).font = { bold: true, size: 14 };
    ws.addRow([]);

    // Datos de "Audit Details" (si están vacíos, igual que en el reporte)
    const detailRows = [
        ['Audited Area', data.meta.auditee.trim() ? excelSafeText(data.meta.auditee.trim()) : NOT_SPECIFIED],
        ['Auditor',      data.meta.auditor.trim() ? excelSafeText(data.meta.auditor.trim()) : NOT_SPECIFIED],
        ['Audit Date',   data.meta.date],
        ['Scope',        `${data.globalStats.scope} of ${data.allItems.length} controls`]
    ];
    detailRows.forEach(values => {
        const row = ws.addRow(values);
        row.getCell(1).font = { bold: true };
    });
    ws.addRow([]);

    // Tabla por función
    styleHeaderRow(ws.addRow([
        'Function', 'Implemented', 'In Progress', 'Not Started',
        'Not Applicable', 'Out of Scope', 'Progress'
    ]));

    nistData.forEach(pilar => {
        const items = pilar.categories.flatMap(c => c.items);
        const stats = getStats(items);
        const row = ws.addRow([
            excelLabel(pilar).toUpperCase(),
            stats.counts.done,
            stats.counts.progress,
            stats.counts.todo,
            stats.counts.na,
            items.length - stats.scope,
            stats.total ? stats.percent : 'N/A'   // sin controles que cuenten = N/A
        ]);
        row.getCell(7).numFmt = '0"%"';
    });

    // Fila de totales
    const totalRow = ws.addRow([
        'TOTAL',
        data.counts.done,
        data.counts.progress,
        data.counts.todo,
        data.counts.na,
        data.outOfScopeCount,
        data.globalStats.total ? data.globalStats.percent : 'N/A'
    ]);
    totalRow.font = { bold: true };
    totalRow.getCell(7).numFmt = '0"%"';
}

// ==========================================================
// 5. ACCIÓN (la llama app.js con data-action="export-excel")
// ==========================================================

// Arma el libro en memoria y lo descarga.
async function downloadExcel() {
    try {
        const data = collectReportData();   // los mismos datos que usa el reporte

        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'NIST Sentinel';
        buildChecklistSheet(workbook);
        buildSummarySheet(workbook, data);

        // Convertimos el libro en un archivo (Blob) y lo descargamos
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `NIST-Sentinel_Checklist_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);   // liberamos la memoria
    } catch (error) {
        console.error('Excel export failed:', error);
        alert('Could not generate the Excel file. Open the console (F12) for details.');
    }
}