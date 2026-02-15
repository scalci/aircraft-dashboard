// COMPLIANCE DASHBOARD WIDGET V2 - With File Attachments
// Include this on each portal page and admin dashboard

function initComplianceWidget(orgName, showAllOrgs = false) {
    console.log('Initializing Compliance Widget for:', orgName, 'Show All:', showAllOrgs);
    
    const DOCUMENT_TYPES = [
        'Cert of Insurance',
        'Cert of Registration',
        'Release to Service',
        'Airworthiness Cert',
        'Weight & Balance',
        'Noise Certificate',
        'Radio License',
        'MEL',
        'Trends',
        'Fire Extinguishers',
        'First Aid Kit',
        'Data Plate',
        'Flight Manual',
        'Photo',
        'Account Status'
    ];
    
    let complianceData = {};
    
    // Load data
    function loadData() {
        if (showAllOrgs) {
            // Load all orgs for admin view
            ['barrick', 'highveld', 'mccormick'].forEach(org => {
                const stored = localStorage.getItem('compliance_' + org);
                if (stored) {
                    const orgData = JSON.parse(stored);
                    Object.assign(complianceData, orgData);
                }
            });
        } else {
            const stored = localStorage.getItem('compliance_' + orgName);
            complianceData = stored ? JSON.parse(stored) : {};
        }
    }
    
    // Save data
    function saveData(aircraft) {
        // Determine which org this aircraft belongs to
        let targetOrg = orgName;
        if (showAllOrgs) {
            if (aircraft.includes('BGM') || aircraft.includes('BGO') || aircraft.includes('CGO') || aircraft.includes('KGM')) {
                targetOrg = 'barrick';
            } else if (aircraft.includes('MPT')) {
                targetOrg = 'mccormick';
            } else {
                targetOrg = 'highveld';
            }
        }
        
        const stored = localStorage.getItem('compliance_' + targetOrg);
        let orgData = stored ? JSON.parse(stored) : {};
        
        // Update only this aircraft's documents in the org's data
        Object.keys(complianceData).forEach(key => {
            if (key.startsWith(aircraft + '_')) {
                orgData[key] = complianceData[key];
            }
        });
        
        localStorage.setItem('compliance_' + targetOrg, JSON.stringify(orgData));
    }
    
    // Get document
    function getDoc(aircraft, docType) {
        const key = aircraft + '_' + docType;
        return complianceData[key] || null;
    }
    
    // Calculate days to expiry
    function daysToExpiry(expiryDate) {
        if (!expiryDate) return 9999;
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    }
    
    // Create badge
    function createBadge(aircraft, docType, doc) {
        const hasFile = doc && doc.file;
        const fileIcon = hasFile ? '📎 ' : '';
        
        if (!doc) {
            return `<span class="comp-badge comp-missing" onclick="editDoc('${aircraft}', '${docType}')">not listed</span>`;
        }
        
        if (doc.permanent) {
            return `<span class="comp-badge comp-permanent" onclick="editDoc('${aircraft}', '${docType}')">${fileIcon}Permanent</span>`;
        }
        
        const days = daysToExpiry(doc.expiryDate);
        let className;
        
        if (days < 0 || days <= 10) {
            className = 'comp-expired';
        } else if (days <= 30) {
            className = 'comp-warning';
        } else if (days <= 60) {
            className = 'comp-caution';
        } else {
            className = 'comp-ok';
        }
        
        return `<span class="comp-badge ${className}" onclick="editDoc('${aircraft}', '${docType}')">${fileIcon}${doc.expiryDate}</span>`;
    }
    
    // Render dashboard
    function renderDashboard() {
        let aircraft = [];
        
        if (showAllOrgs) {
            // Get all aircraft from all orgs
            if (typeof getOrgAircraft === 'function') {
                aircraft = [
                    ...getOrgAircraft('barrick'),
                    ...getOrgAircraft('highveld'),
                    ...getOrgAircraft('mccormick')
                ];
            }
        } else {
            if (typeof getOrgAircraft === 'function') {
                aircraft = getOrgAircraft(orgName);
            }
        }
        
        if (!aircraft || aircraft.length === 0) return;
        
        let html = '<div class="compliance-widget">';
        html += '<h2 style="color: var(--secondary); margin-bottom: 20px;">📋 Aircraft Compliance Dashboard</h2>';
        html += '<div class="compliance-scroll"><table class="compliance-table"><thead><tr><th class="aircraft-col">Aircraft</th>';
        
        DOCUMENT_TYPES.forEach(dt => {
            html += `<th>${dt}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        aircraft.forEach(ac => {
            const orgLabel = showAllOrgs ? ` <span style="font-size:0.8rem;color:#70AD47;">(${getAircraftOrg(ac.registration)})</span>` : '';
            html += `<tr><td class="aircraft-col"><strong>${ac.registration}</strong>${orgLabel}</td>`;
            DOCUMENT_TYPES.forEach(dt => {
                const doc = getDoc(ac.registration, dt);
                html += `<td>${createBadge(ac.registration, dt, doc)}</td>`;
            });
            html += '</tr>';
        });
        
        html += '</tbody></table></div></div>';
        
        document.getElementById('complianceWidget').innerHTML = html;
    }
    
    // Get aircraft org
    function getAircraftOrg(registration) {
        if (registration.includes('BGM') || registration.includes('BGO') || registration.includes('CGO') || registration.includes('KGM')) {
            return 'Barrick';
        } else if (registration.includes('MPT')) {
            return 'McCormick';
        } else {
            return 'Highveld';
        }
    }
    
    // Edit document modal
    window.editDoc = function(aircraft, docType) {
        const modal = document.getElementById('compModal');
        if (!modal) createModal();
        
        document.getElementById('modalAC').value = aircraft;
        document.getElementById('modalDT').value = docType;
        
        const doc = getDoc(aircraft, docType);
        if (doc) {
            document.getElementById('modalRef').value = doc.reference || '';
            document.getElementById('modalIssue').value = doc.issueDate || '';
            document.getElementById('modalExpiry').value = doc.expiryDate || '';
            document.getElementById('modalPerm').checked = doc.permanent || false;
            
            // Show existing file info
            if (doc.file) {
                document.getElementById('fileInfo').innerHTML = `<div style="color:#70AD47;">📎 File attached: ${doc.fileName}</div>`;
            } else {
                document.getElementById('fileInfo').innerHTML = '';
            }
        } else {
            document.getElementById('modalRef').value = '';
            document.getElementById('modalIssue').value = '';
            document.getElementById('modalExpiry').value = '';
            document.getElementById('modalPerm').checked = false;
            document.getElementById('fileInfo').innerHTML = '';
        }
        
        // Reset file input
        document.getElementById('modalFile').value = '';
        
        document.getElementById('compModal').style.display = 'flex';
    };
    
    window.closeCompModal = function() {
        document.getElementById('compModal').style.display = 'none';
    };
    
    window.saveCompDoc = function() {
        const ac = document.getElementById('modalAC').value;
        const dt = document.getElementById('modalDT').value;
        const key = ac + '_' + dt;
        
        const fileInput = document.getElementById('modalFile');
        const existingDoc = getDoc(ac, dt);
        
        const newDoc = {
            reference: document.getElementById('modalRef').value,
            issueDate: document.getElementById('modalIssue').value,
            expiryDate: document.getElementById('modalExpiry').value,
            permanent: document.getElementById('modalPerm').checked,
            file: existingDoc?.file || null,
            fileName: existingDoc?.fileName || null
        };
        
        // Handle file upload
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                newDoc.file = e.target.result;
                newDoc.fileName = file.name;
                complianceData[key] = newDoc;
                saveData(ac);
                renderDashboard();
                closeCompModal();
            };
            reader.readAsDataURL(file);
        } else {
            complianceData[key] = newDoc;
            saveData(ac);
            renderDashboard();
            closeCompModal();
        }
    };
    
    window.downloadFile = function(aircraft, docType) {
        const doc = getDoc(aircraft, docType);
        if (doc && doc.file) {
            const link = document.createElement('a');
            link.href = doc.file;
            link.download = doc.fileName;
            link.click();
        }
    };
    
    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'compModal';
        modal.className = 'comp-modal';
        modal.innerHTML = `
            <div class="comp-modal-content">
                <h2 style="color: var(--secondary); margin-bottom: 20px;">Update Document</h2>
                <div class="form-group">
                    <label>Aircraft</label>
                    <input type="text" id="modalAC" readonly style="background: #0A2342;">
                </div>
                <div class="form-group">
                    <label>Document Type</label>
                    <input type="text" id="modalDT" readonly style="background: #0A2342;">
                </div>
                <div class="form-group">
                    <label>Reference</label>
                    <input type="text" id="modalRef" placeholder="e.g., McGill and Partners, SACAA">
                </div>
                <div class="form-group">
                    <label>Issue Date</label>
                    <input type="date" id="modalIssue">
                </div>
                <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="date" id="modalExpiry">
                </div>
                <div class="form-group">
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" id="modalPerm" style="width: auto;">
                        Permanent (Never expires)
                    </label>
                </div>
                <div class="form-group">
                    <label>Attach File (PDF, Image, etc.)</label>
                    <input type="file" id="modalFile" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                           style="padding: 8px; background: var(--bg-dark);">
                    <div id="fileInfo" style="margin-top: 8px; font-size: 0.9rem;"></div>
                </div>
                <div style="margin-top: 30px; display: flex; gap: 10px;">
                    <button class="btn" onclick="saveCompDoc()" style="background: var(--success);">💾 Save</button>
                    <button class="btn" onclick="closeCompModal()" style="background: var(--danger);">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    loadData();
    renderDashboard();
}

// CREW COMPLIANCE WIDGET
function initCrewComplianceWidget() {
    console.log('Initializing Crew Compliance Widget');
    
    const CREW_DOCUMENTS = [
        'Pilot License',
        'Medical Certificate',
        'Passport',
        'Visa',
        'Type Rating',
        'Instrument Rating',
        'Night Rating',
        'Multi-Engine Rating',
        'Dangerous Goods',
        'Security Training',
        'CRM Training',
        'First Aid',
        'SEP Training',
        'Background Check',
        'Employment Contract'
    ];
    
    // Sample crew data - this should be managed like aircraft
    const CREW_MEMBERS = [
        {name: 'John Smith', role: 'Captain', org: 'Barrick'},
        {name: 'Sarah Johnson', role: 'First Officer', org: 'Barrick'},
        {name: 'Mike Davis', role: 'Captain', org: 'Highveld'},
        {name: 'Lisa Brown', role: 'First Officer', org: 'McCormick'}
    ];
    
    let crewData = {};
    
    function loadCrewData() {
        const stored = localStorage.getItem('crew_compliance');
        crewData = stored ? JSON.parse(stored) : {};
    }
    
    function saveCrewData() {
        localStorage.setItem('crew_compliance', JSON.stringify(crewData));
    }
    
    function getCrewDoc(name, docType) {
        const key = name + '_' + docType;
        return crewData[key] || null;
    }
    
    function daysToExpiry(expiryDate) {
        if (!expiryDate) return 9999;
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    }
    
    function createCrewBadge(name, docType, doc) {
        const hasFile = doc && doc.file;
        const fileIcon = hasFile ? '📎 ' : '';
        
        if (!doc) {
            return `<span class="comp-badge comp-missing" onclick="editCrewDoc('${name}', '${docType}')">not listed</span>`;
        }
        
        if (doc.permanent) {
            return `<span class="comp-badge comp-permanent" onclick="editCrewDoc('${name}', '${docType}')">${fileIcon}Permanent</span>`;
        }
        
        const days = daysToExpiry(doc.expiryDate);
        let className;
        
        if (days < 0 || days <= 10) className = 'comp-expired';
        else if (days <= 30) className = 'comp-warning';
        else if (days <= 60) className = 'comp-caution';
        else className = 'comp-ok';
        
        return `<span class="comp-badge ${className}" onclick="editCrewDoc('${name}', '${docType}')">${fileIcon}${doc.expiryDate}</span>`;
    }
    
    function renderCrewDashboard() {
        let html = '<div class="compliance-widget">';
        html += '<h2 style="color: var(--secondary); margin-bottom: 20px;">👥 Crew Compliance Dashboard</h2>';
        html += '<div class="compliance-scroll"><table class="compliance-table"><thead><tr>';
        html += '<th class="aircraft-col">Crew Member</th><th>Role</th><th>Org</th>';
        
        CREW_DOCUMENTS.forEach(dt => {
            html += `<th>${dt}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        CREW_MEMBERS.forEach(crew => {
            html += `<tr><td class="aircraft-col"><strong>${crew.name}</strong></td>`;
            html += `<td>${crew.role}</td><td>${crew.org}</td>`;
            CREW_DOCUMENTS.forEach(dt => {
                const doc = getCrewDoc(crew.name, dt);
                html += `<td>${createCrewBadge(crew.name, dt, doc)}</td>`;
            });
            html += '</tr>';
        });
        
        html += '</tbody></table></div></div>';
        
        document.getElementById('crewComplianceWidget').innerHTML = html;
    }
    
    window.editCrewDoc = function(name, docType) {
        const modal = document.getElementById('crewModal');
        if (!modal) createCrewModal();
        
        document.getElementById('crewModalName').value = name;
        document.getElementById('crewModalDT').value = docType;
        
        const doc = getCrewDoc(name, docType);
        if (doc) {
            document.getElementById('crewModalRef').value = doc.reference || '';
            document.getElementById('crewModalIssue').value = doc.issueDate || '';
            document.getElementById('crewModalExpiry').value = doc.expiryDate || '';
            document.getElementById('crewModalPerm').checked = doc.permanent || false;
            
            if (doc.file) {
                document.getElementById('crewFileInfo').innerHTML = `<div style="color:#70AD47;">📎 File: ${doc.fileName}</div>`;
            } else {
                document.getElementById('crewFileInfo').innerHTML = '';
            }
        } else {
            document.getElementById('crewModalRef').value = '';
            document.getElementById('crewModalIssue').value = '';
            document.getElementById('crewModalExpiry').value = '';
            document.getElementById('crewModalPerm').checked = false;
            document.getElementById('crewFileInfo').innerHTML = '';
        }
        
        document.getElementById('crewModalFile').value = '';
        document.getElementById('crewModal').style.display = 'flex';
    };
    
    window.closeCrewModal = function() {
        document.getElementById('crewModal').style.display = 'none';
    };
    
    window.saveCrewDoc = function() {
        const name = document.getElementById('crewModalName').value;
        const dt = document.getElementById('crewModalDT').value;
        const key = name + '_' + dt;
        
        const fileInput = document.getElementById('crewModalFile');
        const existingDoc = getCrewDoc(name, dt);
        
        const newDoc = {
            reference: document.getElementById('crewModalRef').value,
            issueDate: document.getElementById('crewModalIssue').value,
            expiryDate: document.getElementById('crewModalExpiry').value,
            permanent: document.getElementById('crewModalPerm').checked,
            file: existingDoc?.file || null,
            fileName: existingDoc?.fileName || null
        };
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                newDoc.file = e.target.result;
                newDoc.fileName = file.name;
                crewData[key] = newDoc;
                saveCrewData();
                renderCrewDashboard();
                closeCrewModal();
            };
            reader.readAsDataURL(file);
        } else {
            crewData[key] = newDoc;
            saveCrewData();
            renderCrewDashboard();
            closeCrewModal();
        }
    };
    
    function createCrewModal() {
        const modal = document.createElement('div');
        modal.id = 'crewModal';
        modal.className = 'comp-modal';
        modal.innerHTML = `
            <div class="comp-modal-content">
                <h2 style="color: var(--secondary); margin-bottom: 20px;">Update Crew Document</h2>
                <div class="form-group">
                    <label>Crew Member</label>
                    <input type="text" id="crewModalName" readonly style="background: #0A2342;">
                </div>
                <div class="form-group">
                    <label>Document Type</label>
                    <input type="text" id="crewModalDT" readonly style="background: #0A2342;">
                </div>
                <div class="form-group">
                    <label>Reference / Issuing Authority</label>
                    <input type="text" id="crewModalRef" placeholder="e.g., SACAA, FAA, EASA">
                </div>
                <div class="form-group">
                    <label>Issue Date</label>
                    <input type="date" id="crewModalIssue">
                </div>
                <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="date" id="crewModalExpiry">
                </div>
                <div class="form-group">
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <input type="checkbox" id="crewModalPerm" style="width: auto;">
                        Permanent / No Expiry
                    </label>
                </div>
                <div class="form-group">
                    <label>Attach File (PDF, Image, etc.)</label>
                    <input type="file" id="crewModalFile" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" 
                           style="padding: 8px; background: var(--bg-dark);">
                    <div id="crewFileInfo" style="margin-top: 8px; font-size: 0.9rem;"></div>
                </div>
                <div style="margin-top: 30px; display: flex; gap: 10px;">
                    <button class="btn" onclick="saveCrewDoc()" style="background: var(--success);">💾 Save</button>
                    <button class="btn" onclick="closeCrewModal()" style="background: var(--danger);">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    loadCrewData();
    renderCrewDashboard();
}
