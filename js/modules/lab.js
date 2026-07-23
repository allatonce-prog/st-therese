/* ============================================================
   St. Therese MedTech Solution — Laboratory & Diagnostics Module
   ============================================================ */

const LabModule = {
  render (container) {
    const list = DB.labOrders || [];

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
          <button class="btn-teal" onclick="App.toast('Demo Mode: Write lab order from the Patient Consultation panel','info')">
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
              ${list.length === 0 ? `<tr><td colspan="7" class="text-center p-4 text-muted">No diagnostic orders found.</td></tr>` : list.map(o => `
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
                  <td style="font-size:0.82rem; font-weight:600; color:var(--text-dark);">${o.result || 'Pending Result'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
};
