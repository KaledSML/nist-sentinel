
// 2. Estado (Audit Logs)
let auditStatus = JSON.parse(localStorage.getItem('nist_audit_v2')) || { checks: {}, notes: {} };

// 3. Renderizado de Tarjetas
function renderCards() {
    const colTodo = document.getElementById('col-todo');
    const colProgress = document.getElementById('col-progress');
    const colDone = document.getElementById('col-done');

    if (!colTodo || !colProgress || !colDone) return;

    colTodo.innerHTML = ''; 
    colProgress.innerHTML = '';
    colDone.innerHTML = '';

    nistData.forEach(pilar => {
        const allItems = pilar.categories.flatMap(c => c.items);
        const totalItems = allItems.length;
        const checkedItems = allItems.filter(item => auditStatus.checks[item.code]).length;
        const percent = Math.round((checkedItems / totalItems) * 100);

        const card = document.createElement('div');
        card.className = `card bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-md border-t-4 border-${pilar.color}-500 dark:border-zinc-800 transition-all duration-500`;
        card.dataset.id = pilar.id;
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="text-[10px] font-bold bg-${pilar.color}-100 text-${pilar.color}-700 dark:bg-${pilar.color}-900/30 dark:text-${pilar.color}-400 px-2 py-0.5 rounded uppercase">${pilar.id}</span>
                <button onclick="openPilar('${pilar.id}')" class="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl hover:text-blue-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </div>
            <h4 class="font-bold text-sm uppercase">${pilar.title}</h4>
            <p class="text-[11px] text-zinc-500 mt-1 mb-4">${pilar.desc}</p>
            <div class="space-y-2">
                <div class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                    <span class="text-zinc-400">Progress</span>
                    <span class="text-${pilar.color}-600 dark:text-${pilar.color}-400">${checkedItems} / ${totalItems} (${percent}%)</span>
                </div>
                <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-${pilar.color}-500 h-full transition-all duration-500" style="width: ${percent}%"></div>
                </div>
            </div>
        `;

        if (percent === 100) colDone.appendChild(card);
        else if (percent > 0) colProgress.appendChild(card);
        else colTodo.appendChild(card);
    });

    updateGlobalProgress();
}


// 5. Modal y Lógica de Checks (Tus funciones originales mejoradas)
function openPilar(id) {
    const pilar = nistData.find(p => p.id === id);
    document.getElementById('modal-title').innerText = pilar.title;
    document.getElementById('modal-cat-id').innerText = `Pilar ${pilar.id.toUpperCase()}`;
    const content = document.getElementById('modal-content');
    content.innerHTML = '';

    pilar.categories.forEach(cat => {
        const catTotal = cat.items.length;
        const catChecked = cat.items.filter(i => auditStatus.checks[i.code]).length;
        const catPercent = Math.round((catChecked / catTotal) * 100);

        const section = document.createElement('div');
        section.className = "mb-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden";
        section.innerHTML = `
            <button onclick="this.nextElementSibling.classList.toggle('hidden')" 
                class="w-full flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 transition-all">
                <div class="text-left">
                    <p class="text-[9px] font-black text-blue-600 uppercase tracking-widest">${cat.id}</p>
                    <h5 class="text-sm font-bold text-zinc-800 dark:text-zinc-100">${cat.name}</h5>
                </div>
                <span id="badge-${cat.id}" class="text-[10px] px-2 py-1 rounded-lg border ${catPercent === 100 ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}">
                    ${catPercent}%
                </span>
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
                        <textarea placeholder="Audit Notes..." class="w-full p-3 text-xs bg-zinc-50 dark:bg-zinc-800 border rounded-xl" oninput="saveNote('${item.code}', this.value)">${auditStatus.notes[item.code] || ''}</textarea>
                    </div>`;
                }).join('')}
            </div>
        `;
        content.appendChild(section);
    });
    document.getElementById('modal').classList.remove('hidden');
}

function toggleCheck(code, inputEl) {
    auditStatus.checks[code] = inputEl.checked;
    save();
}

function saveNote(code, value) {
    auditStatus.notes[code] = value;
    save();
}

function save() {
    localStorage.setItem('nist_audit_v2', JSON.stringify(auditStatus));
    renderCards();
}

function updateGlobalProgress() {
    const allItems = nistData.flatMap(p => p.categories.flatMap(c => c.items));
    const checked = allItems.filter(item => auditStatus.checks[item.code]).length;
    const percent = allItems.length > 0 ? Math.round((checked / allItems.length) * 100) : 0;
    
    const bar = document.getElementById('main-progress-bar');
    const text = document.getElementById('total-percent');
    if(bar) bar.style.width = percent + '%';
    if(text) text.innerText = percent + '%';
}

function closeModal() { document.getElementById('modal').classList.add('hidden'); }

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}


// Función para exportar los datos actuales a un archivo .json
function exportAuditSession() {
    const dataStr = JSON.stringify(auditStatus, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `Sentinel_Audit_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Función para importar datos desde un archivo .json
function importAuditSession(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Verificamos que el archivo tenga la estructura correcta
            if (importedData.checks && importedData.notes) {
                // Actualizamos el objeto global
                auditStatus = importedData;
                
                // Forzamos el guardado en LocalStorage y el refresco visual
                save(); 
                
                alert("✓ Auditoría cargada correctamente.");
            } else {
                alert("❌ Formato de archivo no reconocido.");
            }
        } catch (err) {
            console.error("Error al importar:", err);
            alert("❌ El archivo no es un JSON válido.");
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Limpiamos el input
}


// Inicialización
(function init() {
    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
    renderCards();
})();

