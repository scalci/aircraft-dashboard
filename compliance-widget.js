// FlyWatch Compliance Widget — Clean Light Theme

const DOC_TYPES = [
    'Certificate of Insurance','Certificate of Registration','Release to Service',
    'Airworthiness Certificate','Weight & Balance','Noise Certificate','Radio License',
    'MEL','TREND','Fire Extinguishers','First Aid Kit','Data Plate',
    'Flight Manual','RVSM','Account Status'
];

const CREW_DOC_TYPES = [
    'Pilot License','Medical Certificate','Passport','Visa','Type Rating',
    'Instrument Rating','Night Rating','Multi-Engine Rating','Dangerous Goods',
    'Security Training','CRM Training','First Aid','SEP Training',
    'Background Check','Employment Contract'
];

function daysTo(expiry) {
    if (!expiry) return 9999;
    return Math.ceil((new Date(expiry) - new Date()) / 86400000);
}

function cellClass(doc) {
    if (!doc) return 'cell-none';
    if (doc.permanent) return 'cell-perm';
    const d = daysTo(doc.expiryDate);
    if (d <= 0) return 'cell-expired';
    if (d <= 10) return 'cell-10';
    if (d <= 30) return 'cell-30';
    if (d <= 60) return 'cell-60';
    return 'cell-ok';
}

function cellText(doc) {
    if (!doc) return 'not listed';
    if (doc.permanent) return 'Permanent';
    return doc.expiryDate || 'not listed';
}

// ---- AIRCRAFT COMPLIANCE ----
function initComplianceWidget(orgName, showAll) {
    let aircraft = [];
    if (showAll) {
        aircraft = [
            ...getOrgAircraft('barrick'),
            ...getOrgAircraft('highveld'),
            ...getOrgAircraft('mccormick')
        ];
    } else {
        aircraft = getOrgAircraft(orgName);
    }

    let compData = {};
    const orgs = showAll ? ['barrick','highveld','mccormick'] : [orgName];
    orgs.forEach(o => {
        const s = localStorage.getItem('compliance_' + o);
        if (s) Object.assign(compData, JSON.parse(s));
    });

    if (!aircraft || aircraft.length === 0) {
        document.getElementById('complianceWidget').innerHTML = '<p style="color:#94A3B8;padding:16px;">No aircraft configured.</p>';
        return;
    }

    let html = '<div class="table-scroll"><table class="comp-table"><thead><tr>';
    html += '<th class="col-left">Org (Base)</th><th class="col-left">Aircraft</th>';
    DOC_TYPES.forEach(dt => html += `<th>${dt}</th>`);
    html += '</tr></thead><tbody>';

    aircraft.forEach(ac => {
        const orgLabel = showAll ? getAcOrg(ac.registration) : orgName;
        const badgeClass = getBadgeClass(ac.registration);
        html += `<tr>
            <td class="col-left" style="color:#64748B;font-size:12px;">${ac.org || orgLabel}</td>
            <td class="col-left"><span class="ac-badge ${badgeClass}">${ac.registration}</span></td>`;

        DOC_TYPES.forEach(dt => {
            const doc = compData[ac.registration + '_' + dt] || null;
            const cls = cellClass(doc);
            const txt = cellText(doc);
            const fileIcon = doc && doc.file ? ' has-file' : '';
            html += `<td><span class="doc-cell ${cls}${fileIcon}" onclick="openDoc('${ac.registration}','${dt}')">${txt}</span></td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    document.getElementById('complianceWidget').innerHTML = html;
}

// ---- CREW COMPLIANCE ----
function initCrewComplianceWidget(orgName) {
    const CREW = [
        {name: 'John Smith', role: 'Captain', org: 'Barrick'},
        {name: 'Sarah Johnson', role: 'First Officer', org: 'Barrick'},
        {name: 'Mike Davis', role: 'Captain', org: 'Highveld'},
        {name: 'Lisa Brown', role: 'First Officer', org: 'McCormick'}
    ];

    const crewData = JSON.parse(localStorage.getItem('crew_compliance') || '{}');

    let html = '<div class="table-scroll"><table class="crew-table"><thead><tr>';
    html += '<th class="col-left">Crew Member</th><th class="col-left">Role</th><th class="col-left">Org</th>';
    CREW_DOC_TYPES.forEach(dt => html += `<th>${dt}</th>`);
    html += '</tr></thead><tbody>';

    CREW.forEach(crew => {
        html += `<tr>
            <td class="col-left"><strong>${crew.name}</strong></td>
            <td class="col-left" style="color:#64748B;">${crew.role}</td>
            <td class="col-left" style="color:#64748B;">${crew.org}</td>`;

        CREW_DOC_TYPES.forEach(dt => {
            const doc = crewData[crew.name + '_' + dt] || null;
            const cls = cellClass(doc);
            const txt = cellText(doc);
            const fileIcon = doc && doc.file ? ' has-file' : '';
            html += `<td><span class="doc-cell ${cls}${fileIcon}" onclick="openCrewDoc('${crew.name}','${dt}')">${txt}</span></td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    document.getElementById('crewComplianceWidget').innerHTML = html;
}

function getBadgeClass(reg) {
    if (reg.includes('BGM')) return 'bgm';
    if (reg.includes('BGO')) return 'bgo';
    if (reg.includes('CGO')) return 'cgo';
    if (reg.includes('KGM')) return 'kgm';
    if (reg.includes('AAM')) return 'aam';
    if (reg.includes('MPT')) return 'mpt';
    return '';
}

function getAcOrg(reg) {
    if (reg.includes('BGM')||reg.includes('BGO')||reg.includes('CGO')||reg.includes('KGM')) return 'Barrick';
    if (reg.includes('AAM')) return 'Highveld';
    return 'McCormick';
}

// ---- AIRCRAFT MODAL ----
let _currentAC = '', _currentDT = '', _currentOrg = '';

function openDoc(ac, dt) {
    _currentAC = ac; _currentDT = dt;
    _currentOrg = getAcOrg(ac).toLowerCase();

    const allData = {};
    ['barrick','highveld','mccormick'].forEach(o => {
        const s = localStorage.getItem('compliance_' + o);
        if (s) Object.assign(allData, JSON.parse(s));
    });
    const doc = allData[ac + '_' + dt] || null;

    document.getElementById('modalTitle').textContent = dt;
    document.getElementById('modalSubtitle').textContent = ac;
    document.getElementById('modalAC').value = ac;
    document.getElementById('modalDT').value = dt;
    document.getElementById('modalRef').value = doc?.reference || '';
    document.getElementById('modalIssue').value = doc?.issueDate || '';
    document.getElementById('modalExpiry').value = doc?.expiryDate || '';
    document.getElementById('modalPerm').checked = doc?.permanent || false;
    document.getElementById('fileInfo').textContent = doc?.fileName ? '📎 ' + doc.fileName : '';
    document.getElementById('modalFile').value = '';
    document.getElementById('editModal').classList.add('open');
}

function closeModal() { document.getElementById('editModal').classList.remove('open'); }

function saveDoc() {
    const ac = document.getElementById('modalAC').value;
    const dt = document.getElementById('modalDT').value;
    const key = ac + '_' + dt;
    const org = getAcOrg(ac).toLowerCase();

    const stored = localStorage.getItem('compliance_' + org);
    const orgData = stored ? JSON.parse(stored) : {};

    const newDoc = {
        reference: document.getElementById('modalRef').value,
        issueDate: document.getElementById('modalIssue').value,
        expiryDate: document.getElementById('modalExpiry').value,
        permanent: document.getElementById('modalPerm').checked,
        file: orgData[key]?.file || null,
        fileName: orgData[key]?.fileName || null
    };

    const file = document.getElementById('modalFile').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            newDoc.file = e.target.result;
            newDoc.fileName = file.name;
            orgData[key] = newDoc;
            localStorage.setItem('compliance_' + org, JSON.stringify(orgData));
            closeModal();
            location.reload();
        };
        reader.readAsDataURL(file);
    } else {
        orgData[key] = newDoc;
        localStorage.setItem('compliance_' + org, JSON.stringify(orgData));
        closeModal();
        location.reload();
    }
}

// ---- CREW MODAL ----
function openCrewDoc(name, dt) {
    const crewData = JSON.parse(localStorage.getItem('crew_compliance') || '{}');
    const doc = crewData[name + '_' + dt] || null;

    document.getElementById('crewModalTitle').textContent = dt;
    document.getElementById('crewModalSubtitle').textContent = name;
    document.getElementById('crewModalName').value = name;
    document.getElementById('crewModalDT').value = dt;
    document.getElementById('crewModalRef').value = doc?.reference || '';
    document.getElementById('crewModalIssue').value = doc?.issueDate || '';
    document.getElementById('crewModalExpiry').value = doc?.expiryDate || '';
    document.getElementById('crewModalPerm').checked = doc?.permanent || false;
    document.getElementById('crewFileInfo').textContent = doc?.fileName ? '📎 ' + doc.fileName : '';
    document.getElementById('crewModalFile').value = '';
    document.getElementById('crewModal').classList.add('open');
}

function closeCrewModal() { document.getElementById('crewModal').classList.remove('open'); }

function saveCrewDoc() {
    const name = document.getElementById('crewModalName').value;
    const dt = document.getElementById('crewModalDT').value;
    const key = name + '_' + dt;
    const crewData = JSON.parse(localStorage.getItem('crew_compliance') || '{}');

    const newDoc = {
        reference: document.getElementById('crewModalRef').value,
        issueDate: document.getElementById('crewModalIssue').value,
        expiryDate: document.getElementById('crewModalExpiry').value,
        permanent: document.getElementById('crewModalPerm').checked,
        file: crewData[key]?.file || null,
        fileName: crewData[key]?.fileName || null
    };

    const file = document.getElementById('crewModalFile').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            newDoc.file = e.target.result;
            newDoc.fileName = file.name;
            crewData[key] = newDoc;
            localStorage.setItem('crew_compliance', JSON.stringify(crewData));
            closeCrewModal();
            location.reload();
        };
        reader.readAsDataURL(file);
    } else {
        crewData[key] = newDoc;
        localStorage.setItem('crew_compliance', JSON.stringify(crewData));
        closeCrewModal();
        location.reload();
    }
}
