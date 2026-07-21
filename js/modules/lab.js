/* ============================================================
   St. Therese MedTech Solution — Laboratory & Diagnostics Module
   ============================================================ */

const LabModule = {
  labOrders: [
    { id:'LAB-2026-081', patientId:'IP26-001883', patientName:'EVELYN JOYCE INSON', testName:'Obstetric Ultrasound & HCG Level', dept:'OB-GYN / DR Suite', orderedBy:'Dr. April Sunshine Pelias', date:'19 Jul 2026 22:30', status:'Completed', result:'Threatened abortion 15wks. HCG 45,000 mIU/mL' },
    { id:'LAB-2026-082', patientId:'0000350', patientName:'Arlni Smith', testName:'Complete Blood Count (CBC) & CRP', dept:'Emergency Care', orderedBy:'Dr. April Sunshine Pelias', date:'18 May 2026 09:15', status:'Completed', result:'WBC 14.2 x10^9/L (Leukocytosis), CRP 45 mg/L' },
    { id:'LAB-2026-083', patientId:'P-2024-001', patientName:'JUAN DELA CRUZ', testName:'Serum Electrolytes & Lipid Panel', dept:'Internal Medicine', orderedBy:'Dr. Gedelene Torres', date:'10 Jan 2026 14:30', status:'Processing', result:'Pending Laboratory Analysis' },
    { id:'LAB-2026-084', patientId:'0000450', patientName:'Anoshy Womna', testName:'Urinalysis & Blood Chemistry', dept:'Pediatrics / OB', orderedBy:'Dr. April Sunshine Pelias', date:'18 May 2026 11:00', status:'Pending', result:'Specimen Collected' },
  ],

  render (container) {
    container.innerHTML = `
      <!-- Top Page Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:10px;">
            <span>${Icons.svg('fileText', 24, 'var(--primary-teal)')}</span>
            <span>Laboratory & Diagnostics System</span>
          </h2>
          <div style="font-size:0.8rem; color:var(--text-muted);">Diagnostic Test Requisitions, Specimen Tracking & Pathology Results</div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-glass" onclick="App.renderDashboard()">
            ${Icons.svg('chevronLeft', 14)} Back to Dashboard
          </button>
          <button class="btn-teal" onclick="App.toast('New Lab Request Requisition Form Created','success')">
            ${Icons.svg('plus', 15)} + New Lab Request
          </button>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="erp-table-card">
        <div style="overflow-x:auto;">
          <table class="erp-table">
            <thead>
              <tr>
                <th>Lab Order ID</th>
                <th>Patient Name & ID</th>
                <th>Test / Examination</th>
                <th>Requesting Physician</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Pathology Result Summary</th>
              </tr>
            </thead>
            <tbody>
              ${this.labOrders.map(o => `
                <tr ondblclick="App.promptSecurityCheck('${o.patientId}')" title="Double click to view patient record">
                  <td><span style="font-family:monospace; font-weight:800; color:var(--primary-blue);">${o.id}</span></td>
                  <td>
                    <div style="font-weight:700; color:var(--text-dark);">${o.patientName}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); font-family:monospace;">${o.patientId}</div>
                  </td>
                  <td style="font-weight:700; color:var(--primary-teal);">${o.testName}</td>
                  <td style="font-size:0.82rem; color:var(--text-secondary);">${o.orderedBy}</td>
                  <td style="font-size:0.8rem; color:var(--text-muted);">${o.date}</td>
                  <td>
                    <span class="badge-status ${o.status === 'Completed' ? 'bs-discharged' : (o.status === 'Processing' ? 'bs-admitted' : 'bs-critical')}">${o.status}</span>
                  </td>
                  <td style="font-size:0.82rem; font-weight:600; color:var(--text-dark);">${o.result}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
};
