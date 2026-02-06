const nistData = [
{
    id: 'gv', 
    title: 'Govern (GV)', 
    color: 'zinc',
    desc: 'The organization’s cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored',
    categories: [
        { 
            id: 'GV.OC', 
            name: 'Organizational Context', 
            items: [
                { code: 'GV.OC-01', text: 'The organizational mission is understood and informs cybersecurity risk management' },
                { code: 'GV.OC-02', text: 'Internal and external stakeholders are understood, and their needs and expectations regarding cybersecurity risk management are understood and considered' },
                { code: 'GV.OC-03', text: 'Legal, regulatory, and contractual requirements regarding cybersecurity — including privacy and civil liberties obligations — are understood and managed' },
                { code: 'GV.OC-04', text: 'Critical objectives, capabilities, and services that external stakeholders depend on or expect from the organization are understood and communicated' },
                { code: 'GV.OC-05', text: 'Outcomes, capabilities, and services that the organization depends on are understood and communicated' }
            ]
        },
        { 
            id: 'GV.RM', 
            name: 'Risk Management Strategy', 
            items: [
                { code: 'GV.RM-01', text: 'Risk management objectives are established and agreed to by organizational stakeholders' },
                { code: 'GV.RM-02', text: 'Risk appetite and risk tolerance statements are established, communicated, and maintained' },
                { code: 'GV.RM-03', text: 'Cybersecurity risk management activities and outcomes are included in enterprise risk management processes' },
                { code: 'GV.RM-04', text: 'Strategic direction that describes appropriate risk response options is established and communicated' },
                { code: 'GV.RM-05', text: 'Lines of communication across the organization are established for cybersecurity risks, including risks from suppliers and other third parties' },
                { code: 'GV.RM-06', text: 'A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated' },
                { code: 'GV.RM-07', text: 'Strategic opportunities (i.e., positive risks) are characterized and are included in organizational cybersecurity risk discussions' }
            ]
        },
        { 
            id: 'GV.RR', 
            name: 'Roles, Responsibilities, and Authorities', 
            items: [
                { code: 'GV.RR-01', text: 'Organizational leadership is responsible and accountable for cybersecurity risk and fosters a culture that is risk-aware, ethical, and continually improving' },
                { code: 'GV.RR-02', text: 'Roles, responsibilities, and authorities related to cybersecurity risk management are established, communicated, understood, and enforced' },
                { code: 'GV.RR-03', text: 'Adequate resources are allocated commensurate with the cybersecurity risk strategy, roles, responsibilities, and policies' },
                { code: 'GV.RR-04', text: 'Cybersecurity is included in human resources practices' }
            ]
        },
        { 
            id: 'GV.PO', 
            name: 'Policy', 
            items: [
                { code: 'GV.PO-01', text: 'Policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities and is communicated and enforced' },
                { code: 'GV.PO-02', text: 'Policy for managing cybersecurity risks is reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission' }
            ]
        },
        { 
            id: 'GV.OV', 
            name: 'Oversight', 
            items: [
                { code: 'GV.OV-01', text: 'Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction' },
                { code: 'GV.OV-02', text: 'The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks' },
                { code: 'GV.OV-03', text: 'Organizational cybersecurity risk management performance is evaluated and reviewed for adjustments needed' }
            ]
        },
        { 
            id: 'GV.SC', 
            name: 'Cybersecurity Supply Chain Risk Management', 
            items: [
                { code: 'GV.SC-01', text: 'A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders' },
                { code: 'GV.SC-02', text: 'Cybersecurity roles and responsibilities for suppliers, customers, and partners are established, communicated, and coordinated internally and externally' },
                { code: 'GV.SC-03', text: 'Cybersecurity supply chain risk management is integrated into cybersecurity and enterprise risk management, risk assessment, and improvement processes' },
                { code: 'GV.SC-04', text: 'Suppliers are known and prioritized by criticality' },
                { code: 'GV.SC-05', text: 'Requirements to address cybersecurity risks in supply chains are established, prioritized, and integrated into contracts and other types of agreements with suppliers and other relevant third parties' },
                { code: 'GV.SC-06', text: 'Planning and due diligence are performed to reduce risks before entering into formal supplier or other third-party relationships' },
                { code: 'GV.SC-07', text: 'The risks posed by a supplier, their products and services, and other third parties are understood, recorded, prioritized, assessed, responded to, and monitored over the course of the relationship' },
                { code: 'GV.SC-08', text: 'Relevant suppliers and other third parties are included in incident planning, response, and recovery activities' },
                { code: 'GV.SC-09', text: 'Supply chain security practices are integrated into cybersecurity and enterprise risk management programs, and their performance is monitored throughout the technology product and service life cycle' },
                { code: 'GV.SC-10', text: 'Cybersecurity supply chain risk management plans include provisions for activities that occur after the conclusion of a partnership or service agreement' }
            ]
        }
    ]
},


{
    id: 'id', 
    title: 'Identify (ID)', 
    color: 'blue',
    desc: 'The organization’s current cybersecurity risks are understood',
    categories: [
        { 
            id: 'ID.AM', 
            name: 'Asset Management', 
            items: [
                { code: 'ID.AM-01', text: 'Inventories of hardware managed by the organization are maintained' },
                { code: 'ID.AM-02', text: 'Inventories of software, services, and systems managed by the organization are maintained' },
                { code: 'ID.AM-03', text: 'Representations of the organization’s authorized network communication and internal and external network data flows are maintained' },
                { code: 'ID.AM-04', text: 'Inventories of services provided by suppliers are maintained' },
                { code: 'ID.AM-05', text: 'Assets are prioritized based on classification, criticality, resources, and impact on the mission' },
                { code: 'ID.AM-07', text: 'Inventories of data and corresponding metadata for designated data types are maintained' },
                { code: 'ID.AM-08', text: 'Systems, hardware, software, services, and data are managed throughout their life cycles' }
            ]
        },
        { 
            id: 'ID.RA', 
            name: 'Risk Assessment', 
            items: [
                { code: 'ID.RA-01', text: 'Vulnerabilities in assets are identified, validated, and recorded' },
                { code: 'ID.RA-02', text: 'Cyber threat intelligence is received from information sharing forums and sources' },
                { code: 'ID.RA-03', text: 'Internal and external threats to the organization are identified and recorded' },
                { code: 'ID.RA-04', text: 'Potential impacts and likelihoods of threats exploiting vulnerabilities are identified and recorded' },
                { code: 'ID.RA-05', text: 'Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization' },
                { code: 'ID.RA-06', text: 'Risk responses are chosen, prioritized, planned, tracked, and communicated' },
                { code: 'ID.RA-07', text: 'Changes and exceptions are managed, assessed for risk impact, recorded, and tracked' },
                { code: 'ID.RA-08', text: 'Processes for receiving, analyzing, and responding to vulnerability disclosures are established' },
                { code: 'ID.RA-09', text: 'The authenticity and integrity of hardware and software are assessed prior to acquisition and use' },
                { code: 'ID.RA-10', text: 'Critical suppliers are assessed prior to acquisition' }
            ]
        },
        { 
            id: 'ID.IM', 
            name: 'Improvement', 
            items: [
                { code: 'ID.IM-01', text: 'Improvements are identified from evaluations' },
                { code: 'ID.IM-02', text: 'Improvements are identified from security tests and exercises, including those done in coordination with suppliers and relevant third parties' },
                { code: 'ID.IM-03', text: 'Improvements are identified from execution of operational processes, procedures, and activities' },
                { code: 'ID.IM-04', text: 'Incident response plans and other cybersecurity plans that affect operations are established, communicated, maintained, and improved' }
            ]
        }
    ]
},

{
    id: 'pr', 
    title: 'Protect (PR)', 
    color: 'green',
    desc: 'Safeguards to manage the organization’s cybersecurity risks are used',
    categories: [
        { 
            id: 'PR.AA', 
            name: 'Identity Management, Authentication, and Access Control', 
            items: [
                { code: 'PR.AA-01', text: 'Identities and credentials for authorized users, services, and hardware are managed by the organization' },
                { code: 'PR.AA-02', text: 'Identities are proofed and bound to credentials based on the context of interactions' },
                { code: 'PR.AA-03', text: 'Users, services, and hardware are authenticated' },
                { code: 'PR.AA-04', text: 'Identity assertions are protected, conveyed, and verified' },
                { code: 'PR.AA-05', text: 'Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties' },
                { code: 'PR.AA-06', text: 'Physical access to assets is managed, monitored, and enforced commensurate with risk' }
            ]
        },
        { 
            id: 'PR.AT', 
            name: 'Awareness and Training', 
            items: [
                { code: 'PR.AT-01', text: 'Personnel are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with cybersecurity risks in mind' },
                { code: 'PR.AT-02', text: 'Individuals in specialized roles are provided with awareness and training so that they possess the knowledge and skills to perform relevant tasks with cybersecurity risks in mind' }
            ]
        },
        { 
            id: 'PR.DS', 
            name: 'Data Security', 
            items: [
                { code: 'PR.DS-01', text: 'The confidentiality, integrity, and availability of data-at-rest are protected' },
                { code: 'PR.DS-02', text: 'The confidentiality, integrity, and availability of data-in-transit are protected' },
                { code: 'PR.DS-10', text: 'The confidentiality, integrity, and availability of data-in-use are protected' },
                { code: 'PR.DS-11', text: 'Backups of data are created, protected, maintained, and tested' }
            ]
        },
        { 
            id: 'PR.PS', 
            name: 'Platform Security', 
            items: [
                { code: 'PR.PS-01', text: 'Configuration management practices are established and applied' },
                { code: 'PR.PS-02', text: 'Software is maintained, replaced, and removed commensurate with risk' },
                { code: 'PR.PS-03', text: 'Hardware is maintained, replaced, and removed commensurate with risk' },
                { code: 'PR.PS-04', text: 'Log records are generated and made available for continuous monitoring' },
                { code: 'PR.PS-05', text: 'Installation and execution of unauthorized software are prevented' },
                { code: 'PR.PS-06', text: 'Secure software development practices are integrated, and their performance is monitored throughout the software development life cycle' }
            ]
        },
        { 
            id: 'PR.IR', 
            name: 'Technology Infrastructure Resilience', 
            items: [
                { code: 'PR.IR-01', text: 'Networks and environments are protected from unauthorized logical access and usage' },
                { code: 'PR.IR-02', text: 'The organization’s technology assets are protected from environmental threats' },
                { code: 'PR.IR-03', text: 'Mechanisms are implemented to achieve resilience requirements in normal and adverse situations' },
                { code: 'PR.IR-04', text: 'Adequate resource capacity to ensure availability is maintained' }
            ]
        }
    ]
},

{
    id: 'de', 
    title: 'Detect (DE)', 
    color: 'yellow',
    desc: 'Possible cybersecurity attacks and compromises are found and analyzed',
    categories: [
        { 
            id: 'DE.CM', 
            name: 'Continuous Monitoring', 
            items: [
                { code: 'DE.CM-01', text: 'Networks and network services are monitored to find potentially adverse events' },
                { code: 'DE.CM-02', text: 'The physical environment is monitored to find potentially adverse events' },
                { code: 'DE.CM-03', text: 'Personnel activity and technology usage are monitored to find potentially adverse events' },
                { code: 'DE.CM-06', text: 'External service provider activities and services are monitored to find potentially adverse events' },
                { code: 'DE.CM-09', text: 'Computing hardware and software, runtime environments, and their data are monitored to find potentially adverse events' }
            ]
        },
        { 
            id: 'DE.AE', 
            name: 'Adverse Event Analysis', 
            items: [
                { code: 'DE.AE-02', text: 'Potentially adverse events are analyzed to better understand associated activities' },
                { code: 'DE.AE-03', text: 'Information is correlated from multiple sources' },
                { code: 'DE.AE-04', text: 'The estimated impact and scope of adverse events are understood' },
                { code: 'DE.AE-06', text: 'Information on adverse events is provided to authorized staff and tools' },
                { code: 'DE.AE-07', text: 'Cyber threat intelligence and other contextual information are integrated into the analysis' },
                { code: 'DE.AE-08', text: 'Incidents are declared when adverse events meet the defined incident criteria' }
            ]
        }
    ]
},

{
    id: 'rs', 
    title: 'Respond (RS)', 
    color: 'red',
    desc: 'Actions regarding a detected cybersecurity incident are taken',
    categories: [
        { 
            id: 'RS.MA', 
            name: 'Incident Management', 
            items: [
                { code: 'RS.MA-01', text: 'The incident response plan is executed in coordination with relevant third parties once an incident is declared' },
                { code: 'RS.MA-02', text: 'Incident reports are triaged and validated' },
                { code: 'RS.MA-03', text: 'Incidents are categorized and prioritized' },
                { code: 'RS.MA-04', text: 'Incidents are escalated or elevated as needed' },
                { code: 'RS.MA-05', text: 'The criteria for initiating incident recovery are applied' }
            ]
        },
        { 
            id: 'RS.AN', 
            name: 'Incident Analysis', 
            items: [
                { code: 'RS.AN-03', text: 'Analysis is performed to establish what has taken place during an incident and the root cause of the incident' },
                { code: 'RS.AN-06', text: 'Actions performed during an investigation are recorded, and the records’ integrity and provenance are preserved' },
                { code: 'RS.AN-07', text: 'Incident data and metadata are collected, and their integrity and provenance are preserved' },
                { code: 'RS.AN-08', text: 'An incident’s magnitude is estimated and validated' }
            ]
        },
        { 
            id: 'RS.CO', 
            name: 'Incident Response Reporting and Communication', 
            items: [
                { code: 'RS.CO-02', text: 'Internal and external stakeholders are notified of incidents' },
                { code: 'RS.CO-03', text: 'Information is shared with designated internal and external stakeholders' }
            ]
        },
        { 
            id: 'RS.MI', 
            name: 'Incident Mitigation', 
            items: [
                { code: 'RS.MI-01', text: 'Incidents are contained' },
                { code: 'RS.MI-02', text: 'Incidents are eradicated' }
            ]
        }
    ]
},

{
    id: 'rc', 
    title: 'Recover (RC)', 
    color: 'purple',
    desc: 'Assets and operations affected by a cybersecurity incident are restored',
    categories: [
        { 
            id: 'RC.RP', 
            name: 'Incident Recovery Plan Execution', 
            items: [
                { code: 'RC.RP-01', text: 'The recovery portion of the incident response plan is executed once initiated from the incident response process' },
                { code: 'RC.RP-02', text: 'Recovery actions are selected, scoped, prioritized, and performed' },
                { code: 'RC.RP-03', text: 'The integrity of backups and other restoration assets is verified before using them for restoration' },
                { code: 'RC.RP-04', text: 'Critical mission functions and cybersecurity risk management are considered to establish post-incident operational norms' },
                { code: 'RC.RP-05', text: 'The integrity of restored assets is verified, systems and services are restored, and normal operating status is confirmed' },
                { code: 'RC.RP-06', text: 'The end of incident recovery is declared based on criteria, and incident-related documentation is completed' }
            ]
        },
        { 
            id: 'RC.CO', 
            name: 'Incident Recovery Communication', 
            items: [
                { code: 'RC.CO-03', text: 'Recovery activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders' },
                { code: 'RC.CO-04', text: 'Public updates on incident recovery are shared using approved methods and messaging' }
            ]
        }
    ]
}

];

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

// 4. Lógica del Reporte Ejecutivo "Sentinel Smart"
function generateProfessionalReport() {
    const labels = nistData.map(p => p.id.toUpperCase());
    const values = nistData.map(pilar => {
        const all = pilar.categories.flatMap(c => c.items);
        const checked = all.filter(i => auditStatus.checks[i.code]).length;
        return Math.round((checked / all.length) * 100);
    });

    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(`
        <html>
        <head>
            <title>NIST-Sentinel_Audit_Report_${new Date().toISOString().split('T')[0]}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                body { font-family: 'Inter', sans-serif; color: #18181b; }
                @media print {
                    .no-print { display: none !important; }
                    body { background: white; padding: 0; }
                    .card-report { border: 1px solid #e4e4e7 !important; box-shadow: none !important; border-radius: 20px !important; }
                    .page-break { page-break-before: always; }
                }
                .status-tag { font-size: 9px; font-weight: 900; padding: 2px 8px; border-radius: 99px; text-transform: uppercase; }
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
                        <p class="text-zinc-900">Status: Internal Working Paper</p>
                    </div>
                </header>

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
                                    The Radar Chart visualizes the balance between the six NIST CSF functions. A symmetrical shape indicates a consistent security posture, while spikes reveal functional strengths or critical gaps in the cybersecurity lifecycle.
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
                    
                    ${nistData.map(pilar => {
                        const items = pilar.categories.flatMap(c => c.items);
                        return `
                        <div class="mb-12">
                            <div class="flex justify-between items-end mb-6 border-l-4 border-zinc-900 pl-4">
                                <div>
                                    <h3 class="text-2xl font-black uppercase tracking-tighter">${pilar.title}</h3>
                                    <p class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">${pilar.id} Function</p>
                                </div>
                                <div class="text-right">
                                    <span class="text-2xl font-black text-zinc-900">${values[labels.indexOf(pilar.id.toUpperCase())]}%</span>
                                </div>
                            </div>

                            <div class="space-y-3">
                                ${items.map(item => {
                                    const isChecked = auditStatus.checks[item.code];
                                    const note = auditStatus.notes[item.code];
                                    return `
                                    <div class="p-5 ${isChecked ? 'bg-white' : 'bg-zinc-50/50'} rounded-2xl border ${isChecked ? 'border-zinc-200' : 'border-zinc-100'}">
                                        <div class="flex flex-col md:flex-row justify-between gap-6">
                                            <div class="flex-1">
                                                <div class="flex items-center gap-3 mb-2">
                                                    <span class="font-black text-[10px] text-zinc-400">${item.code}</span>
                                                    <span class="status-tag ${isChecked ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-200 text-zinc-500'}">
                                                        ${isChecked ? 'Implemented' : 'Not Assessed'}
                                                    </span>
                                                </div>
                                                <p class="text-sm font-bold text-zinc-800 leading-snug">${item.text}</p>
                                            </div>
                                            <div class="md:w-1/3 ${note ? 'bg-zinc-100/50 p-4 border-l-2 border-zinc-300' : 'border-2 border-dashed border-zinc-100'} rounded-xl flex flex-col justify-center">
                                                ${note ? `
                                                    <span class="text-[9px] font-black uppercase text-zinc-400 block mb-1">Auditor Notes:</span>
                                                    <p class="text-[11px] italic text-zinc-600 leading-relaxed">"${note}"</p>
                                                ` : `
                                                    <span class="text-[9px] font-bold text-zinc-300 uppercase italic text-center px-4">No evidence provided</span>
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                    `;
                                }).join('')}
                            </div>
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

