/* ============================================================
   St. Therese MedTech Solution — Main App Controller
   Full-Page Patient EHR Record & Analytics View & Module Router
   ============================================================ */

const App = {
  currentNav: 'dashboard',

  init () {
    this.renderSidebarNav();
    this.updateUserCard();
    this.renderDashboard();
  },

  renderSidebarNav () {
    const isNurse = Auth.user.role === 'nurse';
    const subEl = document.querySelector('.brand-sub');
    const titleEl = document.querySelector('.sidebar-menu-title');
    const navEl = document.querySelector('.sidebar-nav');

    if (subEl) subEl.textContent = isNurse ? 'NURSE BEDSIDE CIS' : 'MedTech Solution';
    if (titleEl) titleEl.textContent = isNurse ? 'NURSING SHIFT MENU' : 'Main Menu';

    if (!navEl) return;

    if (isNurse) {
      navEl.innerHTML = `
        <div class="nav-item ${this.currentNav === 'dashboard' ? 'active' : ''}" onclick="App.setNav('dashboard', this)" title="Nurse Workspace">
          <span class="nav-icon">${Icons.svg('activity', 18)}</span>
          <span class="nav-label">Nurse Workspace</span>
        </div>
        <div class="nav-item ${this.currentNav === 'patients' ? 'active' : ''}" onclick="App.setNav('patients', this)" title="My Assigned Inpatients">
          <span class="nav-icon">${Icons.svg('users', 18)}</span>
          <span class="nav-label">Assigned Inpatients</span>
        </div>
        <div class="nav-item" onclick="App.openLogVitalsModal('IP26-001883')" title="Log Bedside Vitals">
          <span class="nav-icon">${Icons.svg('fileText', 18)}</span>
          <span class="nav-label">+ Log Bedside Vitals</span>
        </div>
        <div class="nav-item ${this.currentNav === 'beds' ? 'active' : ''}" onclick="App.setNav('beds', this)" title="Ward 2001 Bed Map">
          <span class="nav-icon">${Icons.svg('bed', 18)}</span>
          <span class="nav-label">Ward 2001 Bed Map</span>
        </div>
        <div class="nav-item ${this.currentNav === 'pharmacy' ? 'active' : ''}" onclick="App.setNav('pharmacy', this)" title="Shift Meds & Supplies">
          <span class="nav-icon">${Icons.svg('revenue', 18)}</span>
          <span class="nav-label">Medication Schedule</span>
        </div>
        <div class="nav-item ${this.currentNav === 'doctors' ? 'active' : ''}" onclick="App.setNav('doctors', this)" title="Attending Doctors">
          <span class="nav-icon">${Icons.svg('stethoscope', 18)}</span>
          <span class="nav-label">Attending Doctors</span>
        </div>
        <div class="nav-item" onclick="Auth.logout()" title="Logout Session" style="margin-top:10px; color:var(--danger)">
          <span class="nav-icon">${Icons.svg('lock', 18, 'var(--danger)')}</span>
          <span class="nav-label">Logout Session</span>
        </div>
      `;
    } else {
      navEl.innerHTML = `
        <div class="nav-item ${this.currentNav === 'dashboard' ? 'active' : ''}" onclick="App.setNav('dashboard', this)" title="Dashboard">
          <span class="nav-icon">${Icons.svg('activity', 18)}</span>
          <span class="nav-label">Dashboard</span>
        </div>
        <div class="nav-item ${this.currentNav === 'patients' ? 'active' : ''}" onclick="App.setNav('patients', this)" title="Patient Directory">
          <span class="nav-icon">${Icons.svg('users', 18)}</span>
          <span class="nav-label">Patient Directory</span>
        </div>
        <div class="nav-item" onclick="App.setNav('triage', this)" title="ER Intake & Triage">
          <span class="nav-icon">${Icons.svg('hospital', 18)}</span>
          <span class="nav-label">ER Intake & Triage</span>
        </div>
        <div class="nav-item ${this.currentNav === 'beds' ? 'active' : ''}" onclick="App.setNav('beds', this)" title="Bed & Ward System">
          <span class="nav-icon">${Icons.svg('bed', 18)}</span>
          <span class="nav-label">Bed & Ward System</span>
        </div>
        <div class="nav-item ${this.currentNav === 'doctors' ? 'active' : ''}" onclick="App.setNav('doctors', this)" title="Doctor Directory">
          <span class="nav-icon">${Icons.svg('stethoscope', 18)}</span>
          <span class="nav-label">Doctor Directory</span>
        </div>
        <div class="nav-item ${this.currentNav === 'lab' ? 'active' : ''}" onclick="App.setNav('lab', this)" title="Lab & Diagnostics">
          <span class="nav-icon">${Icons.svg('fileText', 18)}</span>
          <span class="nav-label">Lab & Diagnostics</span>
        </div>
        <div class="nav-item ${this.currentNav === 'pharmacy' ? 'active' : ''}" onclick="App.setNav('pharmacy', this)" title="Pharmacy & Supplies">
          <span class="nav-icon">${Icons.svg('revenue', 18)}</span>
          <span class="nav-label">Pharmacy & Supplies</span>
        </div>
        <div class="nav-item" onclick="Auth.logout()" title="Logout Session" style="margin-top:10px; color:var(--danger)">
          <span class="nav-icon">${Icons.svg('lock', 18, 'var(--danger)')}</span>
          <span class="nav-label">Logout Session</span>
        </div>
      `;
    }
  },

  updateUserCard () {
    const user = Auth.user;
    const userCard = document.querySelector('.sidebar-user-card');
    if (!userCard) return;

    const isNurse = user.role === 'nurse';
    userCard.innerHTML = `
      <div class="user-info">
        <div class="user-avatar-box" style="background:${isNurse ? 'linear-gradient(135deg, #00A896, #0288D1)' : ''}">${user.avatar || 'AU'}</div>
        <div class="user-text-wrap">
          <div style="font-weight:800; font-size:0.84rem; color:var(--text-dark);">${user.name}</div>
          <div style="font-size:0.7rem; color:${isNurse ? 'var(--primary-teal)' : 'var(--text-muted)'}; font-weight:700;">${Auth.roleLabel(user.role)}${user.ward ? ` (${user.ward})` : ''}</div>
        </div>
      </div>
      <div style="display:flex; gap:6px; align-items:center;">
        <button class="btn-glass" style="padding:4px 8px; font-size:0.7rem; color:${isNurse ? 'var(--primary-blue)' : 'var(--primary-teal)'};" onclick="App.switchRole('${isNurse ? 'admin' : 'nurse'}')" title="Click to test role toggle">
          ${isNurse ? 'Admin View' : 'Nurse View'}
        </button>
        <button class="btn-glass" style="padding:4px 8px; font-size:0.7rem; color:var(--danger);" onclick="Auth.logout()" title="Logout">
          Logout
        </button>
      </div>
    `;
  },

  switchRole (roleKey) {
    if (roleKey === 'nurse') {
      const nurseUser = DB.users.find(u => u.role === 'nurse') || DB.users[4];
      Auth._user = nurseUser;
      localStorage.setItem('st_user', JSON.stringify(nurseUser));
      this.toast('Switched to Nurse UI/UX — RN Maria Santos (Ward 2001)', 'success');
    } else {
      const adminUser = DB.users.find(u => u.role === 'admin') || DB.users[0];
      Auth._user = adminUser;
      localStorage.setItem('st_user', JSON.stringify(adminUser));
      this.toast('Switched to Admin ERP Dashboard View', 'info');
    }
    this.init();
  },

  getNursePatients () {
    if (Auth.user.role === 'nurse') {
      // Return patients assigned to Nurse Maria Santos (Station A Ward 2001)
      return DB.patients.filter(p => p.id === 'IP26-001883' || p.id === '0000350' || p.id === 'P-2024-001' || p.id === '0000450');
    }
    return DB.patients;
  },

  setNav (navKey, el) {
    this.currentNav = navKey;
    this.renderSidebarNav();

    const mainView = document.getElementById('main-view');
    if (!mainView) return;

    switch (navKey) {
      case 'dashboard':
        this.renderDashboard();
        this.toast('Navigated to ERP Dashboard', 'info');
        break;

      case 'patients':
        PatientsModule.render(mainView);
        this.toast('Viewing Patient Master Directory', 'info');
        break;

      case 'triage':
        this.openIntakeWizardModal();
        break;

      case 'beds':
        BedsModule.render(mainView);
        this.toast('Viewing 2D Bed & Ward Floor Plan System', 'info');
        break;

      case 'doctors':
        DoctorsModule.render(mainView);
        this.toast('Viewing Doctor Directory & Attending Roster', 'info');
        break;

      case 'lab':
        LabModule.render(mainView);
        this.toast('Viewing Laboratory & Diagnostics System', 'info');
        break;

      case 'pharmacy':
        PharmacyModule.render(mainView);
        this.toast('Viewing Pharmacy & Supplies Inventory', 'info');
        break;

      default:
        this.renderDashboard();
        break;
    }
  },

  renderDashboard () {
    const mainView = document.getElementById('main-view');
    if (!mainView) return;

    const isNurse = Auth.user.role === 'nurse';
    const nursePatients = this.getNursePatients();

    // Re-render Main Workspace Canvas
    mainView.innerHTML = `
      <!-- Top Toolbar Bar -->
      <div class="erp-topbar">
        <div class="erp-topbar-left">
          <div class="search-box">
            <span class="search-box-icon" id="sb-icon"></span>
            <input placeholder="${isNurse ? 'Search assigned patient, ID...' : 'Search patient, ID...'}" oninput="App.filterPatients(this.value)">
          </div>

          <select class="select-filter">
            <option>${isNurse ? 'My Assigned Inpatients' : 'All Patients'}</option>
            <option>Admitted Only</option>
            <option>Discharged</option>
          </select>
          <select class="select-filter">
            <option>${isNurse ? 'Ward 2001 (Station A)' : 'Healthcare'}</option>
            <option>Emergency Care</option>
            <option>Internal Medicine</option>
            <option>Surgery</option>
          </select>
        </div>

        <div class="erp-topbar-right">
          ${isNurse ? `
            <span style="font-size:0.78rem; font-weight:700; background:#E0F2FE; color:#0288D1; padding:6px 12px; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
              <span>${Icons.svg('activity', 15, '#0288D1')}</span>
              <span>Duty Shift: RN Maria Santos (Ward 2001)</span>
            </span>
          ` : ''}
          <button class="btn-teal" onclick="App.openIntakeWizardModal()">
            <span id="btn-plus-icon"></span> + New Patient Card
          </button>
          <button class="btn-glass" onclick="App.toast('New Issue Slip created','info')">
            <span id="btn-issue-icon"></span> New Issue
          </button>

          <div style="width:38px; height:38px; border-radius:10px; background:#FFFFFF; border:1px solid #CBD5E1; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="App.toast('${isNurse ? '2 Pending Vitals Checks' : '0 New Notifications'}','info')" id="bell-wrap"></div>
        </div>
      </div>

      ${isNurse ? `
        <!-- Nurse Workspace Welcome Banner -->
        <div style="padding:14px 18px; background:linear-gradient(135deg, #F0FDF4, #E0F2FE); border:1px solid #86EFAC; border-radius:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg, #00A896, #0288D1); color:#FFF; font-weight:800; font-size:1.1rem; display:flex; align-items:center; justify-content:center;">MS</div>
            <div>
              <div style="font-weight:800; font-size:0.95rem; color:var(--text-dark);">Nurse Bedside Clinical Workspace — Station A (Ward 2001)</div>
              <div style="font-size:0.78rem; color:var(--text-secondary);">Logged in as <strong>RN Maria Santos</strong> · Displaying <strong>${nursePatients.length} Inpatients</strong> assigned under your care</div>
            </div>
          </div>
          <button class="btn-teal" style="padding:6px 12px; font-size:0.78rem;" onclick="App.openLogVitalsModal('${nursePatients[0]?.id || 'IP26-001883'}')">
            ${Icons.svg('activity', 15)} Log Bedside Vitals
          </button>
        </div>
      ` : ''}

      <!-- Top Metrics Bar (Role Tailored) -->
      <div class="top-metrics-bar">
        ${isNurse ? `
          <div class="top-metric-card" style="border-left:4px solid var(--primary-teal);">
            <div class="tm-label">Assigned Inpatients</div>
            <div class="tm-value" style="color:var(--primary-teal)">${nursePatients.length} Patients</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">Station A Ward 2001</div>
          </div>

          <div class="top-metric-card" style="border-left:4px solid var(--warning);">
            <div class="tm-label">Shift Vitals Due</div>
            <div class="tm-value" style="color:var(--warning)">2 Pending</div>
            <div style="font-size:0.72rem; color:var(--warning); font-weight:700; margin-top:2px;">10:30 PM Checkpoint</div>
          </div>

          <div class="top-metric-card" style="border-left:4px solid var(--primary-blue);">
            <div class="tm-label">Medication Rounds</div>
            <div class="tm-value" style="color:var(--primary-blue)">3 Orders</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">Biogesic, Gestox, Cefuroxime</div>
          </div>

          <div class="top-metric-card" style="cursor:pointer; border-left:4px solid var(--success);" onclick="App.setNav('beds')">
            <div class="tm-label">Ward 2001 Occupancy</div>
            <div class="tm-value" style="color:var(--success)">94.6%</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">35 Occupied / 37 Total Beds</div>
          </div>
        ` : `
          <div class="top-metric-card" style="padding-bottom:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <div class="tm-label">OPD Count</div>
              <span id="tm-opd-icon"></span>
            </div>
            <div class="tm-value" style="color:var(--primary-teal)">27,323</div>
            <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:6px;">Outpatient Visits</div>
            <div id="opd-sparkline-wrap"></div>
          </div>

          <div class="top-metric-card">
            <div class="tm-label">Total Revenue</div>
            <div class="tm-value" style="color:var(--primary-blue)">₱1,032,050.00</div>
            <div style="font-size:0.72rem; color:var(--success); font-weight:700; margin-top:4px; display:flex; align-items:center; gap:4px;">
              <span id="tm-rev-icon"></span> ▲ 13.45% Growth
            </div>
          </div>

          <div class="top-metric-card" style="cursor:pointer;" onclick="App.setNav('beds')">
            <div class="tm-label">Bed Occupancy Rate</div>
            <div class="tm-value" style="color:var(--warning)">73.4%</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">166 Occupied / 226 Total</div>
          </div>

          <div class="top-metric-card">
            <div class="tm-label">Pending Payments</div>
            <div class="tm-value" style="color:var(--danger)">₱1,337,000.00</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">Financial Accounts</div>
          </div>
        `}
      </div>

      <!-- Analytics Grid -->
      <div class="analytics-grid" style="grid-template-columns: 2.2fr 1.3fr 1.2fr;">
        
        <!-- Panel 1: Admissions Trend / Nurse Rounds -->
        <div class="analytics-card">
          <div class="analytics-hdr">
            <h3>${isNurse ? 'NURSE BEDSIDE ROUNDS & VITAL SIGNS TREND' : 'PATIENT ADMISSIONS TREND'}</h3>
            <select class="select-filter" style="padding:4px 10px; font-size:0.75rem;">
              <option>${isNurse ? 'Ward 2001 Inpatients' : 'Patient admissions'}</option>
            </select>
          </div>
          <div id="admissions-chart-wrap"></div>
        </div>

        <!-- Panel 2: BED CAPACITY & STATUS -->
        <div class="analytics-card" style="cursor:pointer;" onclick="App.setNav('beds')">
          <div class="analytics-hdr">
            <h3>${isNurse ? 'WARD 2001 BED CAPACITY' : 'BED CAPACITY & STATUS'}</h3>
            <span id="bed-hdr-icon" style="color:var(--primary-teal); cursor:pointer;"></span>
          </div>
          
          <div id="bed-donut-wrap"></div>

          <div style="margin-top:16px; padding-top:14px; border-top:1px solid #E2E8F0; display:flex; flex-direction:column; gap:8px; font-size:0.82rem;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; gap:8px; font-weight:600; color:var(--text-dark);">
                <span style="width:10px; height:10px; border-radius:50%; background:#94A3B8;"></span> Total Capacity
              </span>
              <strong style="font-size:0.9rem;">${isNurse ? '37 Beds' : '226 Beds'}</strong>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; gap:8px; font-weight:600; color:var(--text-dark);">
                <span style="width:10px; height:10px; border-radius:50%; background:#16A34A;"></span> Occupied Beds
              </span>
              <strong style="color:#16A34A; font-size:0.9rem;">${isNurse ? '35 Beds' : '166 Beds'}</strong>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; gap:8px; font-weight:600; color:var(--text-dark);">
                <span style="width:10px; height:10px; border-radius:50%; background:#00BCD4;"></span> Available Beds
              </span>
              <strong style="color:#00BCD4; font-size:0.9rem;">${isNurse ? '2 Beds' : '60 Beds'}</strong>
            </div>
          </div>
        </div>

        <!-- Panel 3: Billing / Care Team Roster -->
        <div class="analytics-card">
          <div class="analytics-hdr">
            <h3>${isNurse ? 'ATTENDING DOCTORS' : 'BILLING SUMMARY'}</h3>
          </div>
          ${isNurse ? `
            <div style="display:flex; flex-direction:column; gap:12px; font-size:0.82rem; margin-top:10px;">
              <div style="display:flex; align-items:center; gap:10px; padding-bottom:8px; border-bottom:1px solid #E2E8F0;">
                <div style="width:36px; height:36px; border-radius:50%; background:#0288D1; color:#FFF; font-weight:800; display:flex; align-items:center; justify-content:center;">AP</div>
                <div>
                  <div style="font-weight:700; color:var(--text-dark);">Dr. April Sunshine Pelias</div>
                  <div style="font-size:0.74rem; color:var(--primary-teal);">OB-GYN / Internal Medicine</div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:36px; height:36px; border-radius:50%; background:#00A896; color:#FFF; font-weight:800; display:flex; align-items:center; justify-content:center;">GT</div>
                <div>
                  <div style="font-weight:700; color:var(--text-dark);">Dr. Gedelene Torres</div>
                  <div style="font-size:0.74rem; color:var(--primary-teal);">Cardiology & Critical Care</div>
                </div>
              </div>
            </div>
          ` : `
            <div id="billing-donut-wrap"></div>
            <div style="margin-top:16px; padding-top:12px; border-top:1px solid #E2E8F0;">
              <div style="font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Pending Payments</div>
              <div style="font-size:1.3rem; font-weight:800; color:var(--text-dark); margin-top:2px;">₱1,337,000.00</div>
              <div style="width:100%; height:6px; background:#E2E8F0; border-radius:3px; margin-top:8px; overflow:hidden;">
                <div style="width:75%; height:100%; background:var(--primary-teal); border-radius:3px;"></div>
              </div>
            </div>
          `}
        </div>

      </div>

      <!-- Recent Patient List Table Card -->
      <div class="erp-table-card">
        <div class="table-hdr">
          <h3 style="display:flex; align-items:center; gap:8px;">
            <span>${isNurse ? 'MY ASSIGNED INPATIENT ROSTER (WARD 2001)' : 'RECENT PATIENT LIST'}</span>
            ${isNurse ? `<span style="font-size:0.7rem; font-weight:700; background:#F0FDF4; color:#166534; border:1px solid #86EFAC; padding:2px 8px; border-radius:6px;">🔒 RN Maria Santos Patients</span>` : ''}
          </h3>
          <button class="btn-teal" style="padding:6px 14px; font-size:0.78rem;" onclick="App.openIntakeWizardModal()">+ Add Patient</button>
        </div>

        <div style="overflow-x:auto;">
          <table class="erp-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>ID</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Update</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="recent-patients-tbody">
              ${this._renderPatientRows(nursePatients)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Re-inject vector icons and charts
    setTimeout(() => {
      if (!isNurse && document.getElementById('tm-opd-icon')) {
        document.getElementById('tm-opd-icon').innerHTML  = Icons.svg('users', 16, 'var(--primary-teal)');
        document.getElementById('tm-rev-icon').innerHTML  = Icons.svg('trendingUp', 12, '#166534');
        document.getElementById('opd-sparkline-wrap').innerHTML   = Charts.opdSparkline();
        document.getElementById('billing-donut-wrap').innerHTML    = Charts.billingDonut();
      }

      if (document.getElementById('bed-hdr-icon')) document.getElementById('bed-hdr-icon').innerHTML = Icons.svg('bed', 18, 'var(--primary-teal)');
      if (document.getElementById('sb-icon'))       document.getElementById('sb-icon').innerHTML      = Icons.svg('search', 16, '#94A3B8');
      if (document.getElementById('btn-plus-icon')) document.getElementById('btn-plus-icon').innerHTML= Icons.svg('plus', 16, '#FFF');
      if (document.getElementById('btn-issue-icon'))document.getElementById('btn-issue-icon').innerHTML= Icons.svg('calendar', 16, '#475569');
      if (document.getElementById('bell-wrap'))     document.getElementById('bell-wrap').innerHTML    = Icons.svg('bell', 18, '#475569');

      if (document.getElementById('bed-donut-wrap'))      document.getElementById('bed-donut-wrap').innerHTML      = Charts.bedStatusDonut(isNurse ? 35 : 166, isNurse ? 2 : 60);
      if (document.getElementById('admissions-chart-wrap')) document.getElementById('admissions-chart-wrap').innerHTML = Charts.admissionsTrend();
    }, 10);
  },

  _renderPatientRows (list) {
    const isNurse = Auth.user.role === 'nurse';
    const patientList = isNurse ? this.getNursePatients() : list;
    if (!patientList.length) return `<tr><td colspan="6" class="text-center p-4 text-muted">No patient records match query.</td></tr>`;
    return patientList.map(p => `
      <tr ondblclick="App.promptSecurityCheck('${p.id}')" title="Double click to open full patient record">
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
        <td style="font-weight:600; color:var(--text-secondary);">${p.department || 'Medicine'}</td>
        <td><span class="badge-status ${DH.statusBadge(p.status)}">${p.status}</span></td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${p.registeredDate}</td>
        <td>
          <div style="display:flex; gap:6px;">
            ${isNurse ? `
              <button class="btn-teal" style="padding:4px 10px; font-size:0.75rem;" onclick="event.stopPropagation(); App.openLogVitalsModal('${p.id}')">
                ${Icons.svg('activity', 13)} Log Vitals
              </button>
            ` : ''}
            <button class="btn-glass" style="padding:4px 10px; font-size:0.75rem;" onclick="App.promptSecurityCheck('${p.id}')">
              ${Icons.svg('lock', 13)} Open EHR
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  filterPatients (q) {
    const isNurse = Auth.user.role === 'nurse';
    const sourceList = isNurse ? this.getNursePatients() : DB.patients;
    const list = q
      ? sourceList.filter(p => `${p.firstName} ${p.lastName} ${p.id} ${p.department||''}`.toLowerCase().includes(q.toLowerCase()))
      : sourceList;
    const tableBody = document.getElementById('recent-patients-tbody');
    if (tableBody) tableBody.innerHTML = this._renderPatientRows(list);
  },

  /* ── Nurse Quick Action Modal: Log Bedside Vitals ───────────── */
  openLogVitalsModal (pid) {
    const p = DH.getPatient(pid) || DB.patients[0];
    App.modal(`
      ${App.modalHeader(`Log Bedside Vitals: ${p.firstName} ${p.lastName} (${p.id})`, 'activity')}
      <div class="modal-body" style="padding:18px 22px;">
        <form onsubmit="App.saveVitals(event, '${p.id}')">
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:12px 14px; margin-bottom:14px; display:flex; justify-content:space-between; font-size:0.84rem;">
            <span><strong>Patient:</strong> ${p.firstName} ${p.lastName}</span>
            <span><strong>Unit:</strong> Station A Ward 2001</span>
            <span><strong>Nurse:</strong> RN Maria Santos</span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label class="form-label">Blood Pressure (mmHg) *</label>
              <input class="form-control-input" id="nv-bp" required value="110/70" placeholder="120/80">
            </div>
            <div>
              <label class="form-label">Pulse / Heart Rate (bpm) *</label>
              <input class="form-control-input" id="nv-pr" type="number" required value="84" placeholder="80">
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:14px;">
            <div>
              <label class="form-label">Oxygen SpO₂ (%) *</label>
              <input class="form-control-input" id="nv-spo2" type="number" required value="98" placeholder="98">
            </div>
            <div>
              <label class="form-label">Temperature (°C) *</label>
              <input class="form-control-input" id="nv-temp" type="number" step="0.1" required value="36.7" placeholder="36.5">
            </div>
            <div>
              <label class="form-label">Pain Scale (0-10) *</label>
              <input class="form-control-input" id="nv-pain" type="number" min="0" max="10" required value="4">
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px; padding-top:14px; border-top:1px solid #E2E8F0;">
            <button type="button" class="btn-glass" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn-teal">
              ${Icons.svg('check', 16)} Record Bedside Vitals
            </button>
          </div>
        </form>
      </div>
    `, 'modal-md');
  },

  saveVitals (e, pid) {
    e.preventDefault();
    const p = DH.getPatient(pid);
    const bp = document.getElementById('nv-bp').value;
    const pr = document.getElementById('nv-pr').value;
    const spo2 = document.getElementById('nv-spo2').value;
    const temp = document.getElementById('nv-temp').value;
    const pain = document.getElementById('nv-pain').value;

    const existingIndex = DB.vitalSigns.findIndex(v => v.patientId === pid);
    const newVital = {
      id: DH.nextId('V'),
      patientId: pid,
      timestamp: DH.now(),
      bp, pr: Number(pr), rr: 18, temp: Number(temp), spo2: Number(spo2), pain: Number(pain)
    };

    if (existingIndex >= 0) {
      DB.vitalSigns[existingIndex] = newVital;
    } else {
      DB.vitalSigns.unshift(newVital);
    }

    this.closeModal();
    this.toast(`Vitals recorded for ${p.firstName} ${p.lastName}! (BP: ${bp}, HR: ${pr} bpm, SpO₂: ${spo2}%)`, 'success');

    if (this.currentNav === 'patients') {
      const mainView = document.getElementById('main-view');
      if (mainView) PatientsModule.render(mainView);
    } else {
      this.renderDashboard();
    }
  },

  /* ── Security Authorization Check Modal ─────────────────── */
  promptSecurityCheck (pid) {
    const p = DH.getPatient(pid);
    if (!p) return;
    const user = Auth.user;

    App.modal(`
      ${App.modalHeader('St. Therese Record Security Authorization', 'shield')}
      <div class="modal-body">
        <div style="background:#FFFBEB; border:1px solid #FCD34D; color:#92400E; padding:14px 16px; margin-bottom:18px; border-radius:10px; display:flex; gap:12px; align-items:center;">
          <span>${Icons.svg('lock', 22, '#D97706')}</span>
          <div style="font-size:0.82rem;">
            <strong>Data Privacy Authorization Policy:</strong> Re-enter password to unlock full electronic health record for <strong>${p.firstName} ${p.lastName} (${p.id})</strong>.
          </div>
        </div>

        <div class="summary-box mb-16" style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:16px;">
          <div class="summary-row" style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #E2E8F0; font-size:0.85rem;">
            <span>Target Patient File:</span><span style="font-weight:700; color:var(--primary-blue);">${p.firstName} ${p.lastName} (${p.id})</span>
          </div>
          <div class="summary-row" style="display:flex; justify-content:space-between; padding:6px 0; font-size:0.85rem;">
            <span>Authenticated User:</span><span>${user?.name || 'Admin User'} (${Auth.roleLabel(user?.role)})</span>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:6px;">Password Authorization <span style="color:var(--danger)">*</span></label>
          <input type="password" class="form-control" id="reauth-password-input" placeholder="Enter password (e.g. admin)" autofocus onkeyup="if(event.key==='Enter') App.verifyAndOpenPatient('${pid}')" style="width:100%; padding:10px 14px; border:1.5px solid #CBD5E1; border-radius:8px; outline:none;">
          <div id="reauth-error-msg" style="color:var(--danger); font-size:0.75rem; margin-top:6px; font-weight:600; display:none;"></div>
        </div>
      </div>

      <div class="modal-footer" style="padding:16px 24px; border-top:1px solid #E2E8F0; display:flex; justify-content:flex-end; gap:10px; background:#F8FAFC;">
        <button class="btn-glass" onclick="App.closeModal()">Cancel</button>
        <button class="btn-teal" onclick="App.verifyAndOpenPatient('${pid}')">
          ${Icons.svg('unlock', 16)} Authenticate & Open Record
        </button>
      </div>
    `);
  },

  verifyAndOpenPatient (pid) {
    const inputEl = document.getElementById('reauth-password-input');
    const errEl   = document.getElementById('reauth-error-msg');
    if (!inputEl) return;

    const enteredPass = inputEl.value.trim();
    if (Auth.verifyPassword(enteredPass)) {
      App.closeModal();
      App.toast(`Security authorized for ${Auth.user.name}. Opening full electronic medical record...`, 'success');
      this.viewPatientFullPage(pid);
    } else {
      if (errEl) {
        errEl.style.display = 'block';
        errEl.textContent = '❌ Access Denied: Incorrect password. Please try again.';
      }
      inputEl.style.borderColor = 'var(--danger)';
      App.toast('Authentication failed: Incorrect password.', 'error');
    }
  },

  /* ──────────────────────────────────────────────────────────
     FULL-PAGE ELECTRONIC HEALTH RECORD (EHR) & ANALYTICS VIEW
     ────────────────────────────────────────────────────────── */
  viewPatientFullPage (pid) {
    const p = DH.getPatient(pid);
    if (!p) return;
    const adm  = DH.getAdmission(pid);
    const room = adm ? DH.getRoom(adm.roomId) : null;
    const bed  = adm ? DH.getBed(adm.bedId)   : null;
    const vt   = DB.vitalSigns.find(v => v.patientId === pid) || { bp:'110/70', pr:84, rr:18, temp:36.7, spo2:98, pain:4 };
    const mainView = document.getElementById('main-view');
    if (!mainView) return;

    mainView.innerHTML = `
      <!-- EHR Top Navigation Header Bar -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:14px;">
          <button class="btn-glass" onclick="App.renderDashboard()" style="padding:7px 14px; font-size:0.8rem;">
            ${Icons.svg('chevronLeft', 14)} Back to ERP Dashboard
          </button>
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <h2 style="font-size:1.3rem; font-weight:800; color:var(--text-dark); margin:0;">${p.firstName} ${p.lastName}</h2>
            <span class="badge-status ${DH.statusBadge(p.status)}">${p.status}</span>
            <span style="font-family:monospace; font-weight:700; font-size:0.8rem; background:#E0F2FE; color:var(--primary-blue); padding:3px 8px; border-radius:6px;">ID: ${p.id}</span>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:0.75rem; font-weight:600; background:#F0FDF4; color:#166534; border:1px solid #86EFAC; padding:5px 10px; border-radius:8px; display:inline-flex; align-items:center; gap:6px;">
            ${Icons.svg('check', 14, '#166534')} Security Authorized
          </span>
          <button class="btn-glass" onclick="window.print()" style="padding:7px 14px; font-size:0.8rem;">
            ${Icons.svg('fileText', 14)} Print EHR Chart
          </button>
          <button class="btn-teal" onclick="App.openIntakeWizardModal()" style="padding:7px 14px; font-size:0.8rem;">
            ${Icons.svg('plus', 14)} New Admission
          </button>
        </div>
      </div>

      <!-- Patient Profile Hero Card -->
      <div class="analytics-card" style="margin-bottom:20px; padding:20px; border-top:4px solid var(--primary-teal);">
        <div style="display:grid; grid-template-columns:auto 1fr 1fr 1fr; gap:20px; align-items:center;">
          
          <!-- Column 1: Avatar & Basic Info -->
          <div style="display:flex; align-items:center; gap:14px; padding-right:16px; border-right:1px solid #E2E8F0;">
            <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, #00A896, #0288D1); color:#FFF; font-size:1.6rem; font-weight:800; display:flex; align-items:center; justify-content:center; box-shadow:0 6px 16px rgba(0,168,150,0.25); flex-shrink:0;">
              ${p.firstName[0]}${p.lastName[0]}
            </div>
            <div>
              <div style="font-weight:800; font-size:1.05rem; color:var(--text-dark);">${p.firstName} ${p.lastName}</div>
              <div style="font-size:0.78rem; font-weight:600; color:var(--text-muted); margin-top:2px;">${p.age} yrs · ${p.sex}</div>
              <div style="font-size:0.74rem; font-weight:700; color:var(--primary-blue); font-family:monospace; margin-top:2px;">${p.philHealthNumber || 'PH-9923847102'}</div>
            </div>
          </div>

          <!-- Column 2: Ward & Bed Location -->
          <div style="padding-right:16px; border-right:1px solid #E2E8F0;">
            <div style="font-size:0.68rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">Assigned Unit & Bed</div>
            <div style="font-size:0.92rem; font-weight:800; color:var(--text-dark); margin-top:3px; display:flex; align-items:center; gap:6px;">
              <span>${Icons.svg('bed', 16, 'var(--primary-teal)')}</span>
              <span>${room?.name || '2001 (Station A)'} / Bed ${bed?.number || '1'}</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:3px; font-weight:600;">Department: ${p.department || 'Medicine'}</div>
          </div>

          <!-- Column 3: Blood Type & Allergies -->
          <div style="padding-right:16px; border-right:1px solid #E2E8F0;">
            <div style="font-size:0.68rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">Blood Type & Allergies</div>
            <div style="display:flex; align-items:center; gap:8px; margin-top:4px;">
              <span style="background:#EF4444; color:#FFF; font-weight:800; font-size:0.75rem; padding:2px 8px; border-radius:6px;">${p.bloodType}</span>
              <span style="font-size:0.8rem; font-weight:700; color:var(--danger);">${p.allergies}</span>
            </div>
            <div style="font-size:0.74rem; color:var(--text-muted); margin-top:4px;">Registered: ${p.registeredDate}</div>
          </div>

          <!-- Column 4: Triage Priority -->
          <div>
            <div style="font-size:0.68rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:4px;">Triage Category</div>
            <div>${DH.triageBadge(p.triageLevel)}</div>
          </div>

        </div>
      </div>

      <!-- Vital Signs KPI Grid -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:20px;">
        
        <div class="top-metric-card" style="border-left:4px solid var(--primary-blue);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="tm-label">Blood Pressure</div>
            <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">mmHg</span>
          </div>
          <div class="tm-value" style="color:var(--primary-blue); margin-top:2px;">${vt.bp}</div>
          <div style="font-size:0.72rem; color:var(--success); font-weight:700; margin-top:4px; display:inline-block; background:#F0FDF4; padding:2px 6px; border-radius:4px;">Normal Hemodynamics</div>
        </div>

        <div class="top-metric-card" style="border-left:4px solid var(--danger);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="tm-label">Heart / Pulse Rate</div>
            <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">bpm</span>
          </div>
          <div class="tm-value" style="color:var(--danger); margin-top:2px;">${vt.pr}</div>
          <div style="font-size:0.72rem; color:var(--text-secondary); font-weight:700; margin-top:4px; display:inline-block; background:#F8FAFC; padding:2px 6px; border-radius:4px;">Normal Sinus Rhythm</div>
        </div>

        <div class="top-metric-card" style="border-left:4px solid var(--primary-teal);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="tm-label">Oxygen Saturation</div>
            <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">SpO₂</span>
          </div>
          <div class="tm-value" style="color:var(--primary-teal); margin-top:2px;">${vt.spo2}%</div>
          <div style="font-size:0.72rem; color:var(--success); font-weight:700; margin-top:4px; display:inline-block; background:#F0FDF4; padding:2px 6px; border-radius:4px;">Adequate Perfusion</div>
        </div>

        <div class="top-metric-card" style="border-left:4px solid var(--warning);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div class="tm-label">Body Temp & Pain</div>
            <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600;">°C</span>
          </div>
          <div class="tm-value" style="color:var(--warning); margin-top:2px;">${vt.temp}°C</div>
          <div style="font-size:0.72rem; color:var(--text-secondary); font-weight:700; margin-top:4px; display:inline-block; background:#FFFBEB; padding:2px 6px; border-radius:4px;">Pain Scale: ${vt.pain}/10</div>
        </div>

      </div>

      <!-- Native SVG Patient Vital Signs Trend Graph -->
      <div class="analytics-card" style="margin-bottom:20px; padding:20px;">
        <div class="analytics-hdr">
          <h3 style="display:flex; align-items:center; gap:8px;">
            <span>${Icons.svg('activity', 18, 'var(--primary-teal)')}</span>
            <span>PATIENT VITAL SIGNS TREND GRAPH</span>
          </h3>
          <div style="display:flex; gap:14px; font-size:0.78rem; font-weight:700;">
            <span style="display:flex; align-items:center; gap:6px; color:#0288D1;">
              <span style="width:10px; height:10px; border-radius:50%; background:#0288D1;"></span> BP Systolic
            </span>
            <span style="display:flex; align-items:center; gap:6px; color:#DC2626;">
              <span style="width:10px; height:10px; border-radius:50%; background:#DC2626;"></span> Pulse / Heart Rate
            </span>
            <span style="display:flex; align-items:center; gap:6px; color:#00A896;">
              <span style="width:10px; height:10px; border-radius:50%; background:#00A896;"></span> SpO₂ Saturation
            </span>
          </div>
        </div>

        <!-- Render Native SVG Vitals Trend Chart -->
        <div id="vitals-trend-chart-container"></div>
      </div>

      <!-- Clinical Diagnoses & Attending Care Team Grid -->
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:20px; margin-bottom:20px;">
        
        <!-- Clinical Summary & Diagnoses -->
        <div class="analytics-card" style="padding:20px;">
          <div class="analytics-hdr">
            <h3 style="display:flex; align-items:center; gap:8px;">
              <span>${Icons.svg('fileText', 18, 'var(--primary-teal)')}</span>
              <span>CHIEF COMPLAINT & CLINICAL DIAGNOSES</span>
            </h3>
          </div>
          
          <div style="margin-bottom:14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:14px;">
            <div style="font-size:0.7rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:4px;">Primary Chief Complaint</div>
            <div style="font-size:0.92rem; font-weight:800; color:var(--text-dark);">${p.chiefComplaint || 'SUDDEN ONSET OF PROFUSE VAGINAL BLEEDING'}</div>
          </div>

          <div style="background:#F0FDF4; border:1px solid #86EFAC; border-left:4px solid var(--primary-teal); border-radius:10px; padding:14px;">
            <div style="font-size:0.7rem; font-weight:800; color:var(--primary-teal); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:4px;">Admitting Clinical Diagnosis</div>
            <div style="font-size:0.95rem; font-weight:800; color:var(--text-dark);">${p.admittingDiagnosis || 'THREATENED ABORTIONED G2P1 (1001) 15 WEEKS GESTATION'}</div>
            <div style="font-size:0.76rem; color:var(--text-secondary); margin-top:6px; font-weight:600; display:flex; gap:12px; align-items:center;">
              <span style="background:#00A896; color:#FFF; padding:2px 8px; border-radius:4px; font-weight:800; font-family:monospace;">ICD-10: O20.0</span>
              <span>Attending Physician: Dr. April Sunshine Pelias</span>
            </div>
          </div>
        </div>

        <!-- Active Care Team & Placement -->
        <div class="analytics-card" style="padding:20px;">
          <div class="analytics-hdr">
            <h3 style="display:flex; align-items:center; gap:8px;">
              <span>${Icons.svg('stethoscope', 18, 'var(--primary-teal)')}</span>
              <span>ATTENDING CARE TEAM</span>
            </h3>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; font-size:0.84rem;">
            <div style="display:flex; justify-content:space-between; padding-bottom:8px; border-bottom:1px solid #E2E8F0;">
              <span style="color:var(--text-muted); font-weight:600;">Attending Doctor</span>
              <strong style="color:var(--text-dark);">Dr. April Sunshine Pelias</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding-bottom:8px; border-bottom:1px solid #E2E8F0;">
              <span style="color:var(--text-muted); font-weight:600;">Secondary Doctor</span>
              <strong style="color:var(--text-dark);">Dr. Gedelene Torres</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding-bottom:8px; border-bottom:1px solid #E2E8F0;">
              <span style="color:var(--text-muted); font-weight:600;">Assigned Nurse</span>
              <strong style="color:var(--text-dark);">RN Maria Santos</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:2px;">
              <span style="color:var(--text-muted); font-weight:600;">PhilHealth ID</span>
              <span style="font-family:monospace; font-weight:800; color:var(--primary-blue); font-size:0.84rem; background:#E0F2FE; padding:2px 8px; border-radius:4px;">${p.philHealthNumber || 'PH-9923847102'}</span>
            </div>
          </div>
        </div>

      </div>
    `;

    // Render Vitals Chart after DOM update
    setTimeout(() => {
      const vitalsContainer = document.getElementById('vitals-trend-chart-container');
      if (vitalsContainer) {
        vitalsContainer.innerHTML = Charts.vitalsTrendChart();
      }
    }, 10);
  },

  /* ── ER Triage Intake Wizard Modal ───────────────────────── */
  openIntakeWizardModal () {
    this.modal(`
      ${App.modalHeader('Patient Intake & ER Triage Wizard', 'hospital')}
      <div class="modal-body" style="padding:18px 22px;">
        <form id="erp-intake-form" onsubmit="App.saveIntake(event)">
          
          <!-- Section 1: Demographics -->
          <div class="form-section-box">
            <div class="form-section-title">
              <span>${Icons.svg('users', 16, 'var(--primary-teal)')}</span>
              <span>1. Patient Demographics</span>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:10px;">
              <div>
                <label class="form-label">First Name *</label>
                <input class="form-control-input" id="if-fname" required placeholder="e.g. Maria">
              </div>
              <div>
                <label class="form-label">Last Name *</label>
                <input class="form-control-input" id="if-lname" required placeholder="e.g. Santos">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1.2fr 1fr 1fr; gap:12px;">
              <div>
                <label class="form-label">Birthdate *</label>
                <input class="form-control-input" id="if-dob" type="date" required>
              </div>
              <div>
                <label class="form-label">Sex *</label>
                <select class="form-control-select" id="if-sex" required>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <div>
                <label class="form-label">Blood Type *</label>
                <select class="form-control-select" id="if-blood" required>
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                  <option value="A-">A-</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Section 2: Clinical Triage & Placement -->
          <div class="form-section-box" style="margin-bottom:0;">
            <div class="form-section-title">
              <span>${Icons.svg('activity', 16, 'var(--primary-teal)')}</span>
              <span>2. Clinical Triage & Unit Placement</span>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:10px;">
              <div>
                <label class="form-label">Department *</label>
                <select class="form-control-select" id="if-dept" required>
                  <option value="Emergency Care">Emergency Care</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="OB-GYN (Delivery)">OB-GYN / Delivery</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
              </div>
              <div>
                <label class="form-label">Triage Priority Level *</label>
                <select class="form-control-select" id="if-triage" required>
                  <option value="YELLOW">Level 2 — YELLOW (Emergent)</option>
                  <option value="RED">Level 1 — RED (Critical)</option>
                  <option value="GREEN">Level 3 — GREEN (Non-Urgent)</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom:10px;">
              <label class="form-label">Chief Complaint / Primary Symptom *</label>
              <input class="form-control-input" id="if-complaint" required placeholder="e.g., Acute abdominal pain, High fever, Sudden vaginal bleeding">
            </div>

            <div>
              <label class="form-label">Target Hospital Ward / Unit *</label>
              <select class="form-control-select" id="if-dest" required>
                <option value="2001 (Station A)">General Ward (Station A)</option>
                <option value="Ward B">Ward B (Cardiology)</option>
                <option value="ICU">ICU (Critical Care Bay)</option>
                <option value="Delivery Room">Delivery Suite (DR)</option>
                <option value="Operating Room">Operating Suite (OR)</option>
              </select>
            </div>
          </div>

          <!-- Modal Action Buttons -->
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px; padding-top:14px; border-top:1px solid #E2E8F0;">
            <button type="button" class="btn-glass" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn-teal">
              ${Icons.svg('check', 16)} Save Patient Card & Admit
            </button>
          </div>
        </form>
      </div>
    `, 'modal-md');
  },

  saveIntake (e) {
    e.preventDefault();
    const fname = document.getElementById('if-fname').value.trim();
    const lname = document.getElementById('if-lname').value.trim();
    const dob   = document.getElementById('if-dob').value;
    const sex   = document.getElementById('if-sex').value;
    const blood = document.getElementById('if-blood')?.value || 'O+';
    const dept  = document.getElementById('if-dept').value;
    const complaint = document.getElementById('if-complaint').value.trim();
    const triage    = document.getElementById('if-triage').value;
    const destName  = document.getElementById('if-dest')?.value || '2001 (Station A)';
    const pid   = `0000${String(DB.patients.length + 100).padStart(3,'0')}`;

    const todayStr = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });

    const newPatient = {
      id: pid,
      firstName: fname, lastName: lname, middleName: '',
      birthdate: dob, age: dob ? DH.age(dob) : 30, sex,
      department: dept, status: 'Admitted',
      registeredDate: todayStr, triageLevel: triage,
      chiefComplaint: complaint, admittingDiagnosis: complaint,
      bloodType: blood, allergies: 'None known',
      philHealthNumber: `PH-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    // Add to master patient database
    DB.patients.unshift(newPatient);

    // Auto-assign an available bed in target unit or fallback
    const targetRoom = DB.rooms.find(r => r.name.includes(destName) || r.department.includes(dept)) || DB.rooms[0];
    const availBed = DB.beds.find(b => b.roomId === targetRoom.id && b.status === 'available') || DB.beds.find(b => b.status === 'available');

    if (availBed) {
      availBed.status = 'occupied';
      DB.admissions.unshift({
        id: DH.nextId('ADM-'),
        patientId: pid,
        roomId: availBed.roomId,
        bedId: availBed.id,
        doctorId: 'U003',
        admissionDate: todayStr,
        admissionReason: complaint,
        status: 'Admitted'
      });
      DB.metrics.beds.occupied++;
      if (DB.metrics.beds.available > 0) DB.metrics.beds.available--;
    }

    this.closeModal();
    this.toast(`Patient ${fname} ${lname} registered & admitted to ${targetRoom.name}!`, 'success');

    // Instantly re-render whichever view is active
    const mainView = document.getElementById('main-view');
    if (this.currentNav === 'patients' && mainView) {
      PatientsModule.render(mainView);
    } else if (this.currentNav === 'beds' && mainView) {
      BedsModule.render(mainView);
    } else {
      this.renderDashboard();
    }
  },

  /* ── Modals & Overlay ────────────────────────────────────── */
  modal (htmlContent, customClass = '') {
    this.closeModal();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'active-modal-overlay';
    overlay.innerHTML = `<div class="modal-glass ${customClass}">${htmlContent}</div>`;
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeModal();
    });
    document.body.appendChild(overlay);
  },

  modalHeader (title, iconName = 'hospital') {
    return `<div class="modal-hdr">
      <h3><span>${Icons.svg(iconName, 22, 'var(--primary-teal)')}</span> <span>${title}</span></h3>
      <button class="modal-close-btn" onclick="App.closeModal()">${Icons.svg('x', 18)}</button>
    </div>`;
  },

  closeModal () {
    const existing = document.getElementById('active-modal-overlay');
    if (existing) existing.remove();
  },

  toast (msg, type = 'info') {
    let wrap = document.getElementById('toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'toast-wrap';
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }

    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span>${Icons.svg('check', 18, '#00A896')}</span> <span>${msg}</span>`;
    wrap.appendChild(t);

    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(24px)';
      setTimeout(() => t.remove(), 300);
    }, 3500);
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
