/* ============================================================
   St. Therese MedTech Solution — Main App Controller
   Full-Page Patient EHR Record & Analytics View & Module Router
   ============================================================ */

const App = {
  currentNav: 'dashboard',

  init () {
    this.renderDashboard();
  },

  setNav (navKey, el) {
    this.currentNav = navKey;
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (el) el.classList.add('active');

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

    // Restore Main ERP Dashboard View if returning from modules or EHR view
    if (!mainView.querySelector('.top-metrics-bar')) {
      mainView.innerHTML = `
        <!-- Top Toolbar Bar -->
        <div class="erp-topbar">
          <div class="erp-topbar-left">
            <!-- Search Box -->
            <div class="search-box">
              <span class="search-box-icon" id="sb-icon"></span>
              <input placeholder="Search patient, ID..." oninput="App.filterPatients(this.value)">
            </div>

            <!-- Filters -->
            <select class="select-filter">
              <option>All Patients</option>
              <option>Admitted Only</option>
              <option>Discharged</option>
            </select>
            <select class="select-filter">
              <option>Healthcare</option>
              <option>Emergency Care</option>
              <option>Internal Medicine</option>
              <option>Surgery</option>
            </select>
          </div>

          <div class="erp-topbar-right">
            <!-- Action Buttons -->
            <button class="btn-teal" onclick="App.openIntakeWizardModal()">
              <span id="btn-plus-icon"></span> + New Patient Card
            </button>
            <button class="btn-glass" onclick="App.toast('New Issue Slip created','info')">
              <span id="btn-issue-icon"></span> New Issue
            </button>
            <button class="btn-glass" onclick="App.toast('Report List Generated','success')">
              <span id="btn-report-icon"></span> Report List
            </button>

            <!-- Bell Notification Icon -->
            <div style="width:38px; height:38px; border-radius:10px; background:#FFFFFF; border:1px solid #CBD5E1; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="App.toast('0 New Notifications','info')" id="bell-wrap"></div>
          </div>
        </div>

        <!-- Integrated Top Metrics Bar -->
        <div class="top-metrics-bar">
          <!-- OPD Count + Sparkline -->
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
        </div>

        <!-- Analytics Grid (Admissions Trend + Bed Status Donut Graph + Billing Summary) -->
        <div class="analytics-grid" style="grid-template-columns: 2.2fr 1.3fr 1.2fr;">
          
          <!-- Panel 1: Patient Admissions Trend -->
          <div class="analytics-card">
            <div class="analytics-hdr">
              <h3>PATIENT ADMISSIONS TREND</h3>
              <select class="select-filter" style="padding:4px 10px; font-size:0.75rem;">
                <option>Patient admissions</option>
              </select>
            </div>
            <!-- Admissions Line/Area Chart -->
            <div id="admissions-chart-wrap"></div>
          </div>

          <!-- Panel 2: BED CAPACITY & STATUS DONUT GRAPH -->
          <div class="analytics-card" style="cursor:pointer;" onclick="App.setNav('beds')">
            <div class="analytics-hdr">
              <h3>BED CAPACITY & STATUS</h3>
              <span id="bed-hdr-icon" style="color:var(--primary-teal); cursor:pointer;"></span>
            </div>
            
            <!-- Bed Donut Ring Graph -->
            <div id="bed-donut-wrap"></div>

            <!-- Detailed Bed Breakdown Legend -->
            <div style="margin-top:16px; padding-top:14px; border-top:1px solid #E2E8F0; display:flex; flex-direction:column; gap:8px; font-size:0.82rem;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="display:flex; align-items:center; gap:8px; font-weight:600; color:var(--text-dark);">
                  <span style="width:10px; height:10px; border-radius:50%; background:#94A3B8;"></span> Total Capacity
                </span>
                <strong style="font-size:0.9rem;">226 Beds</strong>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="display:flex; align-items:center; gap:8px; font-weight:600; color:var(--text-dark);">
                  <span style="width:10px; height:10px; border-radius:50%; background:#16A34A;"></span> Occupied Beds
                </span>
                <strong style="color:#16A34A; font-size:0.9rem;">166 Beds</strong>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="display:flex; align-items:center; gap:8px; font-weight:600; color:var(--text-dark);">
                  <span style="width:10px; height:10px; border-radius:50%; background:#00BCD4;"></span> Available Beds
                </span>
                <strong style="color:#00BCD4; font-size:0.9rem;">60 Beds</strong>
              </div>
            </div>
          </div>

          <!-- Panel 3: Billing Summary Donut -->
          <div class="analytics-card">
            <div class="analytics-hdr">
              <h3>BILLING SUMMARY</h3>
            </div>
            <!-- Donut Ring Chart -->
            <div id="billing-donut-wrap"></div>

            <div style="margin-top:16px; padding-top:12px; border-top:1px solid #E2E8F0;">
              <div style="font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Pending Payments</div>
              <div style="font-size:1.3rem; font-weight:800; color:var(--text-dark); margin-top:2px;">₱1,337,000.00</div>
              <div style="width:100%; height:6px; background:#E2E8F0; border-radius:3px; margin-top:8px; overflow:hidden;">
                <div style="width:75%; height:100%; background:var(--primary-teal); border-radius:3px;"></div>
              </div>
            </div>
          </div>

        </div>

        <!-- Recent Patient List Table Card -->
        <div class="erp-table-card">
          <div class="table-hdr">
            <h3>RECENT PATIENT LIST</h3>
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
                ${this._renderPatientRows(DB.patients)}
              </tbody>
            </table>
          </div>
        </div>
      `;

      // Re-inject vector icons and charts
      setTimeout(() => {
        document.getElementById('tm-opd-icon').innerHTML    = Icons.svg('users', 16, 'var(--primary-teal)');
        document.getElementById('tm-rev-icon').innerHTML    = Icons.svg('trendingUp', 12, '#166534');
        document.getElementById('bed-hdr-icon').innerHTML   = Icons.svg('bed', 18, 'var(--primary-teal)');

        document.getElementById('sb-icon').innerHTML        = Icons.svg('search', 16, '#94A3B8');
        document.getElementById('btn-plus-icon').innerHTML  = Icons.svg('plus', 16, '#FFF');
        document.getElementById('btn-issue-icon').innerHTML = Icons.svg('calendar', 16, '#475569');
        document.getElementById('btn-report-icon').innerHTML= Icons.svg('fileText', 16, '#475569');
        document.getElementById('bell-wrap').innerHTML      = Icons.svg('bell', 18, '#475569');

        document.getElementById('opd-sparkline-wrap').innerHTML   = Charts.opdSparkline();
        document.getElementById('bed-donut-wrap').innerHTML       = Charts.bedStatusDonut(166, 60);
        document.getElementById('admissions-chart-wrap').innerHTML  = Charts.admissionsTrend();
        document.getElementById('billing-donut-wrap').innerHTML    = Charts.billingDonut();
      }, 10);
    } else {
      const tbody = document.getElementById('recent-patients-tbody');
      if (tbody) tbody.innerHTML = this._renderPatientRows(DB.patients);
    }
  },

  _renderPatientRows (list) {
    if (!list.length) return `<tr><td colspan="6" class="text-center p-4 text-muted">No patient records match query.</td></tr>`;
    return list.map(p => `
      <tr ondblclick="App.promptSecurityCheck('${p.id}')" title="Double click to open full patient record">
        <td>
          <div class="user-avatar-cell">
            <div class="avatar-img">${p.firstName[0]}${p.lastName[0]}</div>
            <div>
              <div style="font-weight:700; color:var(--text-dark);">${p.firstName} ${p.lastName}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${p.sex} · ${p.age} yrs</div>
            </div>
          </div>
        </td>
        <td><span style="font-family:monospace; font-weight:700; color:var(--primary-blue);">${p.id}</span></td>
        <td style="font-weight:600; color:var(--text-secondary);">${p.department || 'Medicine'}</td>
        <td><span class="badge-status ${DH.statusBadge(p.status)}">${p.status}</span></td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${p.registeredDate}</td>
        <td>
          <button class="btn-glass" style="padding:4px 10px; font-size:0.75rem;" onclick="App.promptSecurityCheck('${p.id}')">
            ${Icons.svg('lock', 13)} Open File
          </button>
        </td>
      </tr>
    `).join('');
  },

  filterPatients (q) {
    const list = q
      ? DB.patients.filter(p => `${p.firstName} ${p.lastName} ${p.id} ${p.department||''}`.toLowerCase().includes(q.toLowerCase()))
      : DB.patients;
    const tableBody = document.getElementById('recent-patients-tbody');
    if (tableBody) tableBody.innerHTML = this._renderPatientRows(list);
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
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <button class="btn-glass" onclick="App.renderDashboard()" style="padding:8px 16px;">
            ${Icons.svg('chevronLeft', 14)} Back to ERP Dashboard
          </button>
          <div>
            <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:10px;">
              <span>${p.firstName} ${p.lastName}</span>
              <span class="badge-status ${DH.statusBadge(p.status)}">${p.status}</span>
            </h2>
            <div style="font-size:0.78rem; color:var(--text-muted);">Electronic Health Record (EHR) & Clinical Analytics Sheet</div>
          </div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-glass" onclick="window.print()">
            ${Icons.svg('fileText', 15)} Print Clinical Chart
          </button>
          <button class="btn-teal" onclick="App.openIntakeWizardModal()">
            ${Icons.svg('plus', 15)} New Admission Record
          </button>
        </div>
      </div>

      <!-- Security Authorization Banner -->
      <div style="padding:12px 18px; background:#F0FDF4; border:1px solid #86EFAC; color:#166534; border-radius:10px; margin-bottom:20px; display:flex; align-items:center; gap:12px; font-size:0.86rem;">
        <span>${Icons.svg('check', 20, '#166534')}</span>
        <span><strong>Record Security Authorized:</strong> Unlocked by ${Auth.user.name} on ${DH.now()}</span>
      </div>

      <!-- Patient Demographics & Profile Banner -->
      <div class="analytics-card" style="margin-bottom:24px; padding:24px;">
        <div style="display:grid; grid-template-columns:auto 1fr; gap:24px; align-items:center;">
          <div style="width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg, #00A896, #0288D1); color:#FFF; font-size:2rem; font-weight:800; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 24px rgba(0,168,150,0.3);">
            ${p.firstName[0]}${p.lastName[0]}
          </div>

          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; font-size:0.86rem;">
            <div>
              <div style="font-size:0.7rem; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Patient ID</div>
              <div style="font-weight:800; color:var(--primary-blue); font-size:1.1rem; font-family:monospace;">${p.id}</div>
            </div>
            <div>
              <div style="font-size:0.7rem; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Age / Sex</div>
              <div style="font-weight:700; color:var(--text-dark);">${p.age} yrs / ${p.sex}</div>
            </div>
            <div>
              <div style="font-size:0.7rem; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Blood Type & Allergies</div>
              <div style="font-weight:700; color:var(--text-dark);">${p.bloodType} · <span style="color:var(--danger)">${p.allergies}</span></div>
            </div>
            <div>
              <div style="font-size:0.7rem; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Unit & Bed</div>
              <div style="font-weight:700; color:var(--text-dark);">${room?.name || '2001 (Station A)'} / Bed ${bed?.number || '1'}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Patient Vitals Analytics Cards Grid -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:24px;">
        <div class="top-metric-card">
          <div class="tm-label">Blood Pressure</div>
          <div class="tm-value" style="color:var(--primary-blue)">${vt.bp} <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted)">mmHg</span></div>
          <div style="font-size:0.72rem; color:var(--success); font-weight:700; margin-top:4px;">Normal Hemodynamics</div>
        </div>

        <div class="top-metric-card">
          <div class="tm-label">Heart / Pulse Rate</div>
          <div class="tm-value" style="color:var(--danger)">${vt.pr} <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted)">bpm</span></div>
          <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">Normal Sinus Rhythm</div>
        </div>

        <div class="top-metric-card">
          <div class="tm-label">Oxygen Saturation</div>
          <div class="tm-value" style="color:var(--primary-teal)">${vt.spo2}% <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted)">SpO₂</span></div>
          <div style="font-size:0.72rem; color:var(--success); font-weight:700; margin-top:4px;">Adequate Perfusion</div>
        </div>

        <div class="top-metric-card">
          <div class="tm-label">Body Temp & Pain</div>
          <div class="tm-value" style="color:var(--warning)">${vt.temp}°C</div>
          <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">Pain Scale: ${vt.pain}/10</div>
        </div>
      </div>

      <!-- Native SVG Patient Vital Signs Trend Graph (Full Width Panel) -->
      <div class="analytics-card" style="margin-bottom:24px; padding:24px;">
        <div class="analytics-hdr">
          <h3 style="display:flex; align-items:center; gap:8px;">
            <span>${Icons.svg('activity', 20, 'var(--primary-teal)')}</span>
            <span>PATIENT VITAL SIGNS TREND GRAPH</span>
          </h3>
          <div style="display:flex; gap:14px; font-size:0.78rem; font-weight:700;">
            <span style="display:flex; align-items:center; gap:6px; color:#0288D1;">
              <span style="width:10px; height:10px; border-radius:50%; background:#0288D1;"></span> BP Systolic
            </span>
            <span style="display:flex; align-items:center; gap:6px; color:#DC2626;">
              <span style="width:10px; height:10px; border-radius:50%; background:#DC2626;"></span> Pulse Rate
            </span>
            <span style="display:flex; align-items:center; gap:6px; color:#00A896;">
              <span style="width:10px; height:10px; border-radius:50%; background:#00A896;"></span> SpO₂ Saturation
            </span>
          </div>
        </div>

        <!-- Render Native SVG Vitals Trend Chart -->
        <div id="vitals-trend-chart-container"></div>
      </div>

      <!-- Clinical Information & Encounter Grid -->
      <div style="display:grid; grid-template-columns:2fr 1fr; gap:20px; margin-bottom:24px;">
        
        <!-- Clinical Summary & Diagnoses -->
        <div class="analytics-card">
          <div class="analytics-hdr">
            <h3>CHIEF COMPLAINT & CLINICAL DIAGNOSES</h3>
          </div>
          
          <div style="margin-bottom:16px;">
            <div style="font-size:0.72rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Primary Chief Complaint</div>
            <div style="font-size:0.95rem; font-weight:700; color:var(--text-dark);">${p.chiefComplaint || 'SUDDEN ONSET OF PROFUSE VAGINAL BLEEDING'}</div>
          </div>

          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-left:4px solid var(--primary-teal); border-radius:8px; padding:16px;">
            <div style="font-size:0.75rem; font-weight:800; color:var(--primary-teal); text-transform:uppercase; margin-bottom:4px;">Admitting Clinical Diagnosis</div>
            <div style="font-size:0.95rem; font-weight:800; color:var(--text-dark);">${p.admittingDiagnosis || 'THREATENED ABORTIONED G2P1 (1001) 15 WEEKS GESTATION'}</div>
            <div style="font-size:0.78rem; color:var(--text-muted); margin-top:4px;">ICD-10 Code: O20.0 · Attending: Dr. April Sunshine Pelias</div>
          </div>
        </div>

        <!-- Active Care Team & Placement -->
        <div class="analytics-card">
          <div class="analytics-hdr">
            <h3>ATTENDING CARE TEAM</h3>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px; font-size:0.86rem;">
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
            <div style="display:flex; justify-content:space-between;">
              <span style="color:var(--text-muted); font-weight:600;">PhilHealth ID</span>
              <strong style="color:var(--primary-blue);">${p.philHealthNumber || 'PH-9923847102'}</strong>
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
      ${App.modalHeader('St. Therese Patient Intake & ER Triage Wizard', 'hospital')}
      <div class="modal-body">
        <form id="erp-intake-form" onsubmit="App.saveIntake(event)">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">First Name *</label>
              <input class="form-control" id="if-fname" required style="width:100%; padding:8px 12px; border:1px solid #CBD5E1; border-radius:6px;">
            </div>
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Last Name *</label>
              <input class="form-control" id="if-lname" required style="width:100%; padding:8px 12px; border:1px solid #CBD5E1; border-radius:6px;">
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:14px;">
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Birthdate *</label>
              <input class="form-control" id="if-dob" type="date" required style="width:100%; padding:8px 12px; border:1px solid #CBD5E1; border-radius:6px;">
            </div>
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Sex *</label>
              <select class="form-control" id="if-sex" required style="width:100%; padding:8px 12px; border:1px solid #CBD5E1; border-radius:6px;">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Department *</label>
              <select class="form-control" id="if-dept" required style="width:100%; padding:8px 12px; border:1px solid #CBD5E1; border-radius:6px;">
                <option value="Emergency Care">Emergency Care</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Pediatrics / OB">Pediatrics / OB</option>
                <option value="Surgery">Surgery</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Chief Complaint / Symptom *</label>
            <input class="form-control" id="if-complaint" required placeholder="e.g., Acute abdominal pain, High fever, Sudden vaginal bleeding" style="width:100%; padding:8px 12px; border:1px solid #CBD5E1; border-radius:6px;">
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Triage Level *</label>
              <select class="form-control" id="if-triage" required style="width:100%; padding:8px 12px; border:1px solid #CBD5E1; border-radius:6px;">
                <option value="YELLOW">Level 2 — YELLOW (Emergent)</option>
                <option value="RED">Level 1 — RED (Critical)</option>
                <option value="GREEN">Level 3 — GREEN (Non-Urgent)</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:4px;">Target Unit *</label>
              <select class="form-control" id="if-dest" required style="width:100%; padding:8px 12px; border:1px solid #CBD5E1; border-radius:6px;">
                <option value="Ward">General Ward</option>
                <option value="ICU">ICU (Critical Care)</option>
                <option value="DR">Delivery Room (DR)</option>
                <option value="OR">Operating Room (OR)</option>
              </select>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
            <button type="button" class="btn-glass" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn-teal">Save Patient Card & Admit</button>
          </div>
        </form>
      </div>
    `, 'modal-lg');
  },

  saveIntake (e) {
    e.preventDefault();
    const fname = document.getElementById('if-fname').value.trim();
    const lname = document.getElementById('if-lname').value.trim();
    const dob   = document.getElementById('if-dob').value;
    const sex   = document.getElementById('if-sex').value;
    const dept  = document.getElementById('if-dept').value;
    const complaint = document.getElementById('if-complaint').value.trim();
    const triage    = document.getElementById('if-triage').value;
    const pid   = `0000${String(DB.patients.length + 100).padStart(3,'0')}`;

    const newPatient = {
      id: pid,
      firstName: fname, lastName: lname, middleName: '',
      birthdate: dob, age: dob ? DH.age(dob) : 30, sex,
      department: dept, status: 'Admitted',
      registeredDate: '20 May 2026', triageLevel: triage,
      chiefComplaint: complaint, admittingDiagnosis: complaint,
      bloodType: 'O+', allergies: 'None known',
      philHealthNumber: `PH-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    DB.patients.unshift(newPatient);
    this.closeModal();
    this.toast(`Patient ${fname} ${lname} registered successfully!`, 'success');
    this.renderDashboard();
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
