// COMPLIANCE DASHBOARD WIDGET - Embeds into portals
// Include this on each portal page

function initComplianceWidget(orgName) {
    console.log('Initializing Compliance Widget for:', orgName);
    
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
        const stored = localStorage.getItem('compliance_' + orgName);
        complianceData = stored ? JSON.parse(stored) : {};
    }
    
    // Save data
    function saveData() {
        localStorage.setItem('compliance_' + orgName, JSON.stringify(complianceData));
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
        if (!doc) {
            return `<span class="comp-badge comp-missing" onclick="editDoc('${aircraft}', '${docType}')">not listed</span>`;
        }
        
        if (doc.permanent) {
            return `<span class="comp-badge comp-permanent" onclick="editDoc('${aircraft}', '${docType}')">Permanent</span>`;
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
        
        return `<span class="comp-badge ${className}" onclick="editDoc('${aircraft}', '${docType}')">${doc.expiryDate}</span>`;
    }
    
    // Render dashboard
    function renderDashboard() {
        const aircraft = getOrgAircraft(orgName);
        if (!aircraft || aircraft.length === 0) return;
        
        let html = '<div class="compliance-widget"><h2 style="color: var(--secondary); margin-bottom: 20px;">📋 Aircraft Compliance Dashboard</h2>';
        html += '<div class="compliance-scroll"><table class="compliance-table"><thead><tr><th class="aircraft-col">Aircraft</th>';
        
        DOCUMENT_TYPES.forEach(dt => {
            html += `<th>${dt}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        aircraft.forEach(ac => {
            html += `<tr><td class="aircraft-col"><strong>${ac.registration}</strong></td>`;
            DOCUMENT_TYPES.forEach(dt => {
                const doc = getDoc(ac.registration, dt);
                html += `<td>${createBadge(ac.registration, dt, doc)}</td>`;
            });
            html += '</tr>';
        });
        
        html += '</tbody></table></div></div>';
        
        document.getElementById('complianceWidget').innerHTML = html;
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
        } else {
            document.getElementById('modalRef').value = '';
            document.getElementById('modalIssue').value = '';
            document.getElementById('modalExpiry').value = '';
            document.getElementById('modalPerm').checked = false;
        }
        
        document.getElementById('compModal').style.display = 'flex';
    };
    
    window.closeCompModal = function() {
        document.getElementById('compModal').style.display = 'none';
    };
    
    window.saveCompDoc = function() {
        const ac = document.getElementById('modalAC').value;
        const dt = document.getElementById('modalDT').value;
        const key = ac + '_' + dt;
        
        complianceData[key] = {
            reference: document.getElementById('modalRef').value,
            issueDate: document.getElementById('modalIssue').value,
            expiryDate: document.getElementById('modalExpiry').value,
            permanent: document.getElementById('modalPerm').checked
        };
        
        saveData();
        renderDashboard();
        closeCompModal();
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
                    <input type="text" id="modalRef" placeholder="e.g., McGill and Partners">
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
