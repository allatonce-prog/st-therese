/* ============================================================
   St. Therese MedTech Solution — Patient Directory Module
   ============================================================ */

const PatientsModule = {
  render (container) {
    container.innerHTML = `
      <!-- Top Page Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:10px;">
            <span>${Icons.svg('users', 24, 'var(--primary-teal)')}</span>
            <span>Patient Master Directory</span>
          </h2>
          <div style="font-size:0.8rem; color:var(--text-muted);">Complete Centralized Medical & Demographic Patient Directory</div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-glass" onclick="App.renderDashboard()">
            ${Icons.svg('chevronLeft', 14)} Back to Dashboard
          </button>
          <button class="btn-teal" onclick="App.openIntakeWizardModal()">
            ${Icons.svg('plus', 15)} + New Patient Card
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="analytics-card" style="margin-bottom:20px; padding:16px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap;">
          <div class="search-box" style="width:300px;">
            <span class="search-box-icon">${Icons.svg('search', 16, '#94A3B8')}</span>
            <input placeholder="Search by name, ID, or PhilHealth..." oninput="PatientsModule.filter(this.value)">
          </div>

          <div style="display:flex; gap:10px;">
            <select class="select-filter" onchange="PatientsModule.filterByDept(this.value)">
              <option value="ALL">All Departments</option>
              <option value="Emergency Care">Emergency Care</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="OB-GYN">OB-GYN / Delivery</option>
              <option value="Surgery">Surgery</option>
            </select>

            <select class="select-filter" onchange="PatientsModule.filterByStatus(this.value)">
              <option value="ALL">All Statuses</option>
              <option value="Admitted">Admitted Only</option>
              <option value="Discharged">Discharged Only</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Patients Table Card -->
      <div class="erp-table-card">
        <div style="overflow-x:auto;">
          <table class="erp-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Patient ID</th>
                <th>PhilHealth No.</th>
                <th>Department</th>
                <th>Triage</th>
                <th>Status</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="patients-dir-tbody">
              ${this._renderRows(DB.patients)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  _renderRows (list) {
    if (!list.length) return `<tr><td colspan="8" style="text-align:center; padding:24px; color:var(--text-muted);">No patients match the search criteria.</td></tr>`;
    return list.map(p => `
      <tr ondblclick="App.promptSecurityCheck('${p.id}')" title="Double click to open full EHR record">
        <td>
          <div class="user-avatar-cell">
            <div class="avatar-img">${p.firstName[0]}${p.lastName[0]}</div>
            <div>
              <div style="font-weight:700; color:var(--text-dark);">${p.firstName} ${p.lastName}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${p.sex} · ${p.age} yrs · Blood: ${p.bloodType}</div>
            </div>
          </div>
        </td>
        <td><span style="font-family:monospace; font-weight:700; color:var(--primary-blue);">${p.id}</span></td>
        <td style="font-size:0.8rem; font-weight:600; color:var(--text-secondary);">${p.philHealthNumber || 'PH-9923847102'}</td>
        <td style="font-weight:600; color:var(--text-secondary);">${p.department || 'Medicine'}</td>
        <td>${DH.triageBadge(p.triageLevel)}</td>
        <td><span class="badge-status ${DH.statusBadge(p.status)}">${p.status}</span></td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${p.registeredDate}</td>
        <td>
          <button class="btn-teal" style="padding:4px 10px; font-size:0.75rem;" onclick="App.promptSecurityCheck('${p.id}')">
            ${Icons.svg('lock', 13)} Open File
          </button>
        </td>
      </tr>
    `).join('');
  },

  filter (q) {
    const list = q
      ? DB.patients.filter(p => `${p.firstName} ${p.lastName} ${p.id} ${p.philHealthNumber||''}`.toLowerCase().includes(q.toLowerCase()))
      : DB.patients;
    const tbody = document.getElementById('patients-dir-tbody');
    if (tbody) tbody.innerHTML = this._renderRows(list);
  },

  filterByDept (dept) {
    const list = (dept === 'ALL')
      ? DB.patients
      : DB.patients.filter(p => p.department && p.department.includes(dept));
    const tbody = document.getElementById('patients-dir-tbody');
    if (tbody) tbody.innerHTML = this._renderRows(list);
  },

  filterByStatus (st) {
    const list = (st === 'ALL')
      ? DB.patients
      : DB.patients.filter(p => p.status === st);
    const tbody = document.getElementById('patients-dir-tbody');
    if (tbody) tbody.innerHTML = this._renderRows(list);
  },
};
