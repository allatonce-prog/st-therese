/* ============================================================
   St. Therese MedTech Solution — Doctor Directory Module
   ============================================================ */

const DoctorsModule = {
  doctors: [
    { id:'DOC-001', name:'Dr. April Sunshine L. Pelias', specialty:'OB-GYN / Internal Medicine', department:'Medicine & OB', email:'pelias@sttherese.ph', phone:'+63 917 123 4567', room:'Room 201', activePatients:12, schedule:'Mon - Fri (08:00 AM - 04:00 PM)', status:'Active' },
    { id:'DOC-002', name:'Dr. Gedelene V. Doromal-Torres', specialty:'Cardiology & Critical Care', department:'Cardiology', email:'torres@sttherese.ph', phone:'+63 918 234 5678', room:'ICU Station A', activePatients:8, schedule:'Mon - Sat (09:00 AM - 05:00 PM)', status:'Active' },
    { id:'DOC-003', name:'Dr. Ricardo Santos', specialty:'General & Laparoscopic Surgery', department:'Surgery', email:'santos@sttherese.ph', phone:'+63 919 345 6789', room:'OR Suite 2', activePatients:6, schedule:'Tue - Sun (07:00 AM - 03:00 PM)', status:'Active' },
    { id:'DOC-004', name:'Dr. Maria Elena Cruz', specialty:'Pediatrics & Neonatology', department:'Pediatrics', email:'cruz@sttherese.ph', phone:'+63 920 456 7890', room:'Pediatric Ward 3', activePatients:10, schedule:'Mon - Fri (09:00 AM - 06:00 PM)', status:'Active' },
  ],

  render (container) {
    container.innerHTML = `
      <!-- Top Page Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:10px;">
            <span>${Icons.svg('stethoscope', 24, 'var(--primary-teal)')}</span>
            <span>Attending Physicians & Doctor Directory</span>
          </h2>
          <div style="font-size:0.8rem; color:var(--text-muted);">Medical Staff Roster, Clinical Specialties & Patient Assignments</div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-glass" onclick="App.renderDashboard()">
            ${Icons.svg('chevronLeft', 14)} Back to Dashboard
          </button>
          <button class="btn-teal" onclick="App.toast('Doctor Roster Sheet Exported','success')">
            ${Icons.svg('fileText', 15)} Export Roster
          </button>
        </div>
      </div>

      <!-- Doctors Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
        ${this.doctors.map(d => `
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
                <span style="color:var(--text-muted);">Clinical Duty Schedule:</span> <strong style="font-size:0.78rem;">${d.schedule}</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--text-muted);">Active Inpatients Assigned:</span> <strong style="color:var(--primary-blue);">${d.activePatients} Patients</strong>
              </div>
            </div>

            <button class="btn-teal" style="width:100%; justify-content:center;" onclick="App.toast('Assigning consultations for ${d.name}','info')">
              Consultation Schedule & Orders
            </button>
          </div>
        `).join('')}
      </div>
    `;
  },
};
