/* ============================================================
   St. Therese MedTech Solution — Pharmacy & Medical Supplies Module
   ============================================================ */

const PharmacyModule = {
  inventory: [
    { code:'MED-001', name:'Isoxsuprine HCl 10mg Tab (Gestox)', category:'OB-GYN / Tocolytic', stock:420, price:28.50, unit:'Tablets', status:'In Stock' },
    { code:'MED-002', name:'Tranexamic Acid 500mg IV Ampule', category:'Hemostatic Agent', stock:150, price:120.00, unit:'Ampules', status:'In Stock' },
    { code:'MED-003', name:'Paracetamol 500mg Tab (Biogesic)', category:'Analgesic / Antipyretic', stock:1250, price:6.50, unit:'Tablets', status:'In Stock' },
    { code:'MED-004', name:'Cefuroxime 500mg Tab (Zinnat)', category:'Antibiotic (Cephalosporin)', stock:310, price:85.00, unit:'Tablets', status:'In Stock' },
    { code:'MED-005', name:'Amlodipine 10mg Tab', category:'Antihypertensive', stock:80, price:15.00, unit:'Tablets', status:'Low Stock' },
    { code:'MED-006', name:'IV Fluids D5LR 1000mL Bottle', category:'Intravenous Fluids', stock:500, price:185.00, unit:'Bottles', status:'In Stock' },
  ],

  render (container) {
    container.innerHTML = `
      <!-- Top Page Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:10px;">
            <span>${Icons.svg('revenue', 24, 'var(--primary-teal)')}</span>
            <span>Hospital Pharmacy & Medical Supplies Inventory</span>
          </h2>
          <div style="font-size:0.8rem; color:var(--text-muted);">Pharmaceutical Formulary, Inpatient Dispensing & Inventory Control</div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-glass" onclick="App.renderDashboard()">
            ${Icons.svg('chevronLeft', 14)} Back to Dashboard
          </button>
          <button class="btn-teal" onclick="App.toast('New Medication Dispensing Slip Created','success')">
            ${Icons.svg('plus', 15)} + Dispense Prescription
          </button>
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="erp-table-card">
        <div style="overflow-x:auto;">
          <table class="erp-table">
            <thead>
              <tr>
                <th>Drug Code</th>
                <th>Medication & Description</th>
                <th>Category</th>
                <th>Stock Balance</th>
                <th>Unit Price (PHP)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.inventory.map(m => `
                <tr>
                  <td><span style="font-family:monospace; font-weight:800; color:var(--primary-blue);">${m.code}</span></td>
                  <td style="font-weight:700; color:var(--text-dark);">${m.name}</td>
                  <td style="font-size:0.82rem; color:var(--text-secondary);">${m.category}</td>
                  <td style="font-weight:800; color:var(--text-dark);">${m.stock} ${m.unit}</td>
                  <td style="font-weight:800; color:var(--primary-teal);">${DH.fmtPHP(m.price)}</td>
                  <td>
                    <span class="badge-status ${m.status === 'In Stock' ? 'bs-discharged' : 'bs-critical'}">${m.status}</span>
                  </td>
                  <td>
                    <button class="btn-glass" style="padding:4px 10px; font-size:0.75rem;" onclick="App.toast('Dispensing ${m.name}','info')">
                      Dispense
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
};
