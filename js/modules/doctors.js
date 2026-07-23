/* ============================================================
   St. Therese MedTech Solution — Doctor Directory Module
   ============================================================ */

const DoctorsModule = {
  render (container) {
    const docList = DB.doctors || [];
    const consultList = DB.consultations || [];

    container.innerHTML = `
      <!-- Top Page Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:10px;">
            <span>${Icons.svg('stethoscope', 24, 'var(--primary-teal)')}</span>
            <span>Attending Physicians & Doctor Directory</span>
          </h2>
          <div style="font-size:0.8rem; color:var(--text-muted);">Medical Staff Roster, Clinical Specialties & Consultation Schedules</div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-glass" onclick="App.renderDashboard()">
            ${Icons.svg('chevronLeft', 14)} Back to Dashboard
          </button>
          <button class="btn-teal" onclick="DoctorsModule.exportRoster()">
            ${Icons.svg('fileText', 15)} Export Roster
          </button>
        </div>
      </div>

      <!-- Doctors Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
        ${docList.length === 0 ? `<div class="p-4 text-muted">No doctors found in directory.</div>` : docList.map(d => {
          const docConsults = consultList.filter(c => c.doctorId === d.id);
          return `
            <div class="analytics-card" style="padding:20px;">
              <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px; padding-bottom:14px; border-bottom:1px solid #E2E8F0;">
                <div style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg, #00A896, #0288D1); color:#FFF; font-size:1.3rem; font-weight:800; display:flex; align-items:center; justify-content:center;">
                  ${d.name.split(' ')[1][0]}${d.name.split(' ')[2] ? d.name.split(' ')[2][0] : 'D'}
                </div>
                <div>
                  <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-dark);">${d.name}</h4>
                  <div style="font-size:0.78rem; font-weight:700; color:var(--primary-teal);">${d.specialty}</div>
                  <div style="font-size:0.72rem; color:var(--text-muted);">${d.department} · ${d.room}</div>
                </div>
              </div>

              <div style="display:flex; flex-direction:column; gap:8px; font-size:0.82rem; margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted);">Email:</span> <strong>${d.email}</strong>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted);">Phone:</span> <strong>${d.phone}</strong>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted);">Clinical Duty Schedule:</span> <strong style="font-size:0.78rem; color:var(--primary-blue);">${d.schedule}</strong>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted);">Scheduled Consultations Today:</span> <strong style="color:var(--success); font-weight:800;">${docConsults.length} Appointments</strong>
                </div>
              </div>

              <button class="btn-teal" style="width:100%; justify-content:center;" onclick="DoctorsModule.openScheduleModal('${d.id}')">
                ${Icons.svg('calendar', 15)} Consultation Schedule & Orders
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  exportRoster () {
    const list = DB.doctors || [];
    if (list.length === 0) {
      App.toast('No doctors to export', 'error');
      return;
    }
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Doctor ID,Name,Specialty,Department,Room,Duty Schedule,Phone,Email,Status"]
        .concat(list.map(d => `"${d.id}","${d.name}","${d.specialty}","${d.department}","${d.room}","${d.schedule}","${d.phone}","${d.email}","${d.status}"`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `St_Therese_Doctor_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    App.toast('Doctor Roster CSV downloaded successfully!', 'success');
  },

  /* ── Interactive Consultation Schedule & Appointments Modal ── */
  openScheduleModal (docId) {
    const docList = DB.doctors || [];
    const consultList = DB.consultations || [];
    const d = docList.find(doc => doc.id === docId) || docList[0];
    if (!d) return;
    const docConsults = consultList.filter(c => c.doctorId === d.id);

    App.modal(`
      ${App.modalHeader(`Consultation Schedule & Orders: ${d.name}`, 'calendar')}
      <div class="modal-body" style="padding:20px 24px;">

        <!-- Doctor Profile Header Box -->
        <div style="background:linear-gradient(135deg, #E0F2FE, #F0FDF4); border:1px solid #7DD3FC; border-radius:12px; padding:16px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h4 style="font-weight:800; font-size:1.1rem; color:var(--text-dark);">${d.name}</h4>
            <div style="font-size:0.82rem; font-weight:700; color:var(--primary-teal); margin-top:2px;">${d.specialty} · ${d.room}</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:4px;">📅 Clinical Duty: <strong>${d.schedule}</strong> · Contact: ${d.phone}</div>
          </div>
          <button class="btn-teal" style="padding:6px 14px; font-size:0.78rem;" onclick="DoctorsModule.openBookAppointmentModal('${d.id}')">
            ${Icons.svg('plus', 14)} + Book Consult Appointment
          </button>
        </div>

        <!-- Weekly Clinical Schedule Time-Block Grid -->
        <div style="margin-bottom:20px;">
          <h5 style="font-size:0.88rem; font-weight:800; color:var(--text-dark); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span>${Icons.svg('activity', 16, 'var(--primary-teal)')}</span>
            <span>Weekly Clinical Time-Block Schedule</span>
          </h5>

          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; font-size:0.78rem;">
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:10px; border-radius:8px;">
              <div style="font-weight:800; color:var(--primary-blue);">08:00 AM - 10:00 AM</div>
              <div style="font-size:0.74rem; color:var(--text-secondary); margin-top:4px;">Inpatient Ward Rounds & Critical Checks</div>
            </div>
            <div style="background:#F0FDF4; border:1px solid #86EFAC; padding:10px; border-radius:8px;">
              <div style="font-weight:800; color:#166534;">10:00 AM - 12:00 PM</div>
              <div style="font-size:0.74rem; color:#15803D; margin-top:4px;">Outpatient OPD Consultations (${d.room})</div>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:10px; border-radius:8px;">
              <div style="font-weight:800; color:var(--primary-blue);">01:00 PM - 03:00 PM</div>
              <div style="font-size:0.74rem; color:var(--text-secondary); margin-top:4px;">Specialist Consultations & Procedures</div>
            </div>
            <div style="background:#FFFBEB; border:1px solid #FDE68A; padding:10px; border-radius:8px;">
              <div style="font-weight:800; color:#B45309;">03:00 PM - 04:00 PM</div>
              <div style="font-size:0.74rem; color:#92400E; margin-top:4px;">Diagnostic Review & Discharges</div>
            </div>
          </div>
        </div>

        <!-- Scheduled Consultations Roster Table -->
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <h5 style="font-size:0.88rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:6px;">
              <span>${Icons.svg('users', 16, 'var(--primary-teal)')}</span>
              <span>Scheduled Patient Consultations (${docConsults.length})</span>
            </h5>
          </div>

          <div style="overflow-x:auto; border:1px solid #E2E8F0; border-radius:10px;">
            <table class="erp-table" style="font-size:0.82rem;">
              <thead>
                <tr>
                  <th>Time Slot</th>
                  <th>Patient Name</th>
                  <th>ID</th>
                  <th>Consultation Type</th>
                  <th>Status</th>
                  <th>Clinical Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${docConsults.length ? docConsults.map(c => `
                  <tr>
                    <td style="font-weight:800; color:var(--primary-blue);">${c.time}</td>
                    <td><strong>${c.patientName}</strong></td>
                    <td style="font-family:monospace; font-weight:700;">${c.patientId}</td>
                    <td>${c.type}</td>
                    <td>
                      <span class="badge-status ${c.status === 'In Consultation' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}" style="padding:2px 8px; border-radius:6px; font-weight:700; font-size:0.72rem;">
                        ${c.status}
                      </span>
                    </td>
                    <td style="font-size:0.76rem; color:var(--text-secondary);">${c.note}</td>
                    <td>
                      <button class="btn-glass" style="padding:2px 8px; font-size:0.72rem;" onclick="App.openDoctorOrderModal('${c.patientId}')">
                        + Write Order
                      </button>
                    </td>
                  </tr>
                `).join('') : `
                  <tr><td colspan="7" class="text-center p-4 text-muted">No scheduled consultations for this physician today.</td></tr>
                `}
              </tbody>
            </table>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px; padding-top:14px; border-top:1px solid #E2E8F0;">
          <button class="btn-glass" onclick="App.closeModal()">Close</button>
        </div>
      </div>
    `, 'modal-lg');
  },

  /* ── Book Consultation Modal ───────────────────────────────── */
  openBookAppointmentModal (docId) {
    const docList = DB.doctors || [];
    const d = docList.find(doc => doc.id === docId) || docList[0];
    const patients = DB.patients;

    App.modal(`
      ${App.modalHeader(`Book Consultation: ${d.name}`, 'calendar')}
      <div class="modal-body" style="padding:18px 22px;">
        <form onsubmit="DoctorsModule.saveAppointment(event, '${d.id}')">
          <div style="margin-bottom:12px;">
            <label class="form-label">Select Patient *</label>
            <select class="form-control-select" id="ba-patient" required>
              ${patients.map(p => `<option value="${p.id}|${p.firstName} ${p.lastName}">${p.firstName} ${p.lastName} (${p.id}) — ${p.department||'Medicine'}</option>`).join('')}
            </select>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label class="form-label">Consultation Date *</label>
              <input class="form-control-input" id="ba-date" type="date" required value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div>
              <label class="form-label">Time Slot *</label>
              <select class="form-control-select" id="ba-time" required>
                <option value="10:00 AM">10:00 AM Slot</option>
                <option value="10:30 AM">10:30 AM Slot</option>
                <option value="11:15 AM">11:15 AM Slot</option>
                <option value="01:30 PM">01:30 PM Slot</option>
                <option value="02:30 PM">02:30 PM Slot</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <label class="form-label">Consultation Type *</label>
            <input class="form-control-input" id="ba-type" required value="${d.specialty.split('/')[0]} Consult" placeholder="e.g. OB-GYN Pre-natal Consult">
          </div>

          <div style="margin-bottom:14px;">
            <label class="form-label">Chief Complaint / Clinical Note</label>
            <input class="form-control-input" id="ba-note" value="Routine clinical consultation and evaluation." placeholder="Patient symptoms or reason for visit">
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px; padding-top:14px; border-top:1px solid #E2E8F0;">
            <button type="button" class="btn-glass" onclick="DoctorsModule.openScheduleModal('${d.id}')">Back</button>
            <button type="submit" class="btn-teal">
              ${Icons.svg('check', 16)} Confirm Appointment Booking
            </button>
          </div>
        </form>
      </div>
    `, 'modal-md');
  },

  saveAppointment (e, docId) {
    e.preventDefault();
    const docList = DB.doctors || [];
    const d = docList.find(doc => doc.id === docId);
    const patVal = document.getElementById('ba-patient').value.split('|');
    const pid = patVal[0];
    const pname = patVal[1];
    const time = document.getElementById('ba-time').value;
    const date = document.getElementById('ba-date').value;
    const type = document.getElementById('ba-type').value;
    const note = document.getElementById('ba-note').value;

    const newAppt = {
      id: 'C' + String((DB.consultations || []).length + 1).padStart(3, '0'),
      doctorId: docId,
      patientName: pname,
      patientId: pid,
      time: time,
      date: date,
      type: type,
      status: 'Confirmed',
      note: note
    };

    if (!DB.consultations) DB.consultations = [];
    DB.consultations.push(newAppt);

    if (FB.isConfigured && FB.db) {
      FB.db.collection('consultations').doc(newAppt.id).set(newAppt).catch(err => console.error(err));
    }

    App.toast(`Consultation booked with ${d.name} for ${pname} at ${time}!`, 'success');

    // Re-open schedule modal with updated roster
    this.openScheduleModal(docId);
  }
};
