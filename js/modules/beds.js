/* ============================================================
   St. Therese MedTech Solution — Bed & Ward System Module
   2D Floor Plan Visualization & Interactive Bed Management
   ============================================================ */

const BedsModule = {

  render (container) {
    container.innerHTML = this.bedWardPage();
  },

  bedWardPage () {
    const totalBeds = DB.metrics.beds.total;
    const occBeds   = DB.metrics.beds.occupied;
    const availBeds = DB.metrics.beds.available;

    return `
      <!-- Top Page Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:10px;">
            <span>${Icons.svg('bed', 24, 'var(--primary-teal)')}</span>
            <span>Hospital Bed & Ward Management System</span>
          </h2>
          <div style="font-size:0.8rem; color:var(--text-muted);">Interactive 2D Floor Plan — Click any occupied bed to view patient details</div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-glass" onclick="App.renderDashboard()">
            ${Icons.svg('chevronLeft', 14)} Back to Dashboard
          </button>
          <button class="btn-teal" onclick="App.openIntakeWizardModal()">
            ${Icons.svg('plus', 15)} + New Admission
          </button>
        </div>
      </div>

      <!-- Top Bed Metrics Summary Cards -->
      <div class="top-metrics-bar" style="margin-bottom:24px;">
        <div class="top-metric-card">
          <div class="tm-label">Total Hospital Beds</div>
          <div class="tm-value" style="color:var(--text-dark)">${totalBeds}</div>
          <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">Across 5 Specialized Wards</div>
        </div>

        <div class="top-metric-card">
          <div class="tm-label">Occupied Beds</div>
          <div class="tm-value" style="color:var(--success)">${occBeds}</div>
          <div style="font-size:0.72rem; color:var(--success); font-weight:700; margin-top:2px;">73.4% Occupancy Rate</div>
        </div>

        <div class="top-metric-card">
          <div class="tm-label">Available Beds</div>
          <div class="tm-value" style="color:var(--accent-cyan)">${availBeds}</div>
          <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">Ready for Admissions</div>
        </div>

        <div class="top-metric-card">
          <div class="tm-label">Active Wards</div>
          <div class="tm-value" style="color:var(--primary-blue)">5 Units</div>
          <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">General, ICU, DR, OR</div>
        </div>
      </div>

      <!-- Filter Tabs for 2D Floor Plan -->
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:20px; overflow-x:auto; padding-bottom:4px;">
        <button class="btn-teal" style="padding:6px 14px; font-size:0.78rem;" onclick="BedsModule.filterWard('ALL', this)">All Wards & Units</button>
        <button class="btn-glass" style="padding:6px 14px; font-size:0.78rem;" onclick="BedsModule.filterWard('General', this)">General Inpatient Wards</button>
        <button class="btn-glass" style="padding:6px 14px; font-size:0.78rem;" onclick="BedsModule.filterWard('Intensive', this)">ICU (Critical Care)</button>
        <button class="btn-glass" style="padding:6px 14px; font-size:0.78rem;" onclick="BedsModule.filterWard('Delivery', this)">Delivery Suite (DR)</button>
        <button class="btn-glass" style="padding:6px 14px; font-size:0.78rem;" onclick="BedsModule.filterWard('Surgical', this)">Operating Suite (OR)</button>
      </div>

      <!-- 2D FLOOR PLAN ROOMS & WARDS GRID -->
      <div id="floorplan-grid-container" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
        ${this._renderFloorPlanRooms(DB.rooms)}
      </div>
    `;
  },

  _renderFloorPlanRooms (roomsList) {
    return roomsList.map(room => {
      // Find beds belonging to this room
      const roomBeds = DB.beds.filter(b => b.roomId === room.id);
      const occupiedInRoom = roomBeds.filter(b => b.status === 'occupied').length;
      const availableInRoom = roomBeds.filter(b => b.status === 'available').length;

      return `
        <div class="analytics-card" style="padding:20px; position:relative;">
          <!-- Room Floorplan Header -->
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; padding-bottom:12px; border-bottom:1.5px solid #E2E8F0;">
            <div>
              <div style="font-size:0.7rem; font-weight:800; color:var(--primary-teal); text-transform:uppercase; letter-spacing:0.06em;">${room.department} · Floor ${room.floor}</div>
              <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-dark); margin-top:2px;">${room.name}</h4>
            </div>
            <span class="badge-status ${room.type === 'Intensive' ? 'bs-critical' : 'bs-admitted'}">${room.type}</span>
          </div>

          <!-- Room Occupancy Stats Bar -->
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:700; color:var(--text-secondary); margin-bottom:12px;">
            <span>Occupied: <strong style="color:var(--success)">${occupiedInRoom}</strong></span>
            <span>Available: <strong style="color:var(--accent-cyan)">${availableInRoom}</strong></span>
            <span>Total: ${room.totalBeds} Beds</span>
          </div>

          <!-- 2D BED GRID VISUALIZATION -->
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(95px, 1fr)); gap:10px;">
            ${roomBeds.map(bed => {
              const admission = DB.admissions.find(a => a.bedId === bed.id);
              const patient   = admission ? DH.getPatient(admission.patientId) : DB.patients[0];
              const isOccupied = bed.status === 'occupied';

              return `
                <div onclick="${isOccupied ? `BedsModule.inspectBedOccupant('${bed.id}', '${patient.id}')` : `App.openIntakeWizardModal()`}"
                     title="${isOccupied ? `Occupied by ${patient.firstName} ${patient.lastName} (${patient.id}) — Click to view file` : `Bed ${bed.number} Available — Click to admit patient`}"
                     style="background:${isOccupied ? '#F0FDF4' : '#E0F2FE'}; border:1.5px solid ${isOccupied ? '#86EFAC' : '#7DD3FC'}; border-radius:8px; padding:10px 8px; text-align:center; cursor:pointer; transition:var(--transition); position:relative;">
                  
                  <div style="font-size:0.65rem; font-weight:800; color:${isOccupied ? '#166534' : '#0369A1'}; text-transform:uppercase;">Bed ${bed.number}</div>
                  
                  <div style="margin:4px 0; color:${isOccupied ? '#16A34A' : '#00BCD4'}">
                    ${Icons.svg('bed', 22)}
                  </div>

                  <div style="font-size:0.75rem; font-weight:800; color:${isOccupied ? '#15803D' : '#0288D1'}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                    ${isOccupied ? `${patient.lastName}` : 'Available'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  inspectBedOccupant (bedId, pid) {
    const bed = DH.getBed(bedId);
    const room = bed ? DH.getRoom(bed.roomId) : null;
    const patient = DH.getPatient(pid) || DB.patients[0];

    App.modal(`
      ${App.modalHeader(`Bed ${bed?.number || ''} Occupant File: ${patient.firstName} ${patient.lastName}`, 'bed')}
      <div class="modal-body">
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:18px; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:16px; margin-bottom:14px; padding-bottom:12px; border-bottom:1px solid #E2E8F0;">
            <div style="width:52px; height:52px; border-radius:50%; background:linear-gradient(135deg, #00A896, #0288D1); color:#FFF; font-size:1.3rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
              ${patient.firstName[0]}${patient.lastName[0]}
            </div>
            <div>
              <h3 style="font-size:1.1rem; font-weight:800; color:var(--text-dark);">${patient.firstName} ${patient.lastName}</h3>
              <div style="font-size:0.8rem; color:var(--primary-blue); font-weight:700; font-family:monospace;">ID: ${patient.id} · ${patient.sex} · ${patient.age} yrs</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.84rem;">
            <div><strong>Location:</strong> ${room?.name || 'Station A Ward'} / Bed ${bed?.number || '1'}</div>
            <div><strong>Status:</strong> <span class="badge-status ${DH.statusBadge(patient.status)}">${patient.status}</span></div>
            <div><strong>Department:</strong> ${patient.department}</div>
            <div><strong>Blood Type:</strong> ${patient.bloodType}</div>
            <div style="grid-column: span 2; margin-top:6px;">
              <strong>Admitting Diagnosis:</strong>
              <div style="font-size:0.86rem; font-weight:700; color:var(--text-dark); margin-top:2px;">${patient.admittingDiagnosis || patient.chiefComplaint}</div>
            </div>
          </div>
        </div>

        <div style="background:#FFFBEB; border:1px solid #FCD34D; color:#92400E; padding:12px 14px; border-radius:8px; font-size:0.8rem; display:flex; gap:10px; align-items:center;">
          <span>${Icons.svg('lock', 18, '#D97706')}</span>
          <span>Security passcode (<code>admin</code>) required to unlock full clinical EHR sheet.</span>
        </div>
      </div>

      <div class="modal-footer" style="padding:16px 24px; border-top:1px solid #E2E8F0; display:flex; justify-content:flex-end; gap:10px; background:#F8FAFC;">
        <button class="btn-glass" onclick="App.closeModal()">Close</button>
        <button class="btn-teal" onclick="App.closeModal(); App.promptSecurityCheck('${patient.id}')">
          ${Icons.svg('lock', 15)} Authenticate & View Full Medical Record
        </button>
      </div>
    `);
  },

  filterWard (type, btnEl) {
    document.querySelectorAll('.btn-teal, .btn-glass').forEach(b => {
      b.className = 'btn-glass';
      b.style.padding = '6px 14px';
      b.style.fontSize = '0.78rem';
    });
    if (btnEl) btnEl.className = 'btn-teal';

    const filtered = (type === 'ALL')
      ? DB.rooms
      : DB.rooms.filter(r => r.type === type);

    const container = document.getElementById('floorplan-grid-container');
    if (container) container.innerHTML = this._renderFloorPlanRooms(filtered);
  },
};
