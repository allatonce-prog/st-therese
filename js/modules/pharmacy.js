/* ============================================================
   St. Therese MedTech Solution — Pharmacy & Medical Supplies Module
   ============================================================ */

const PharmacyModule = {
  render (container) {
    const list = DB.pharmacyItems || [];

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
          <button class="btn-teal" onclick="PharmacyModule.openDispenseModal()">
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
              ${list.length === 0 ? `<tr><td colspan="7" class="text-center p-4 text-muted">No pharmaceutical items found in inventory.</td></tr>` : list.map(m => `
                <tr>
                  <td><span style="font-family:monospace; font-weight:800; color:var(--primary-blue);">${m.code}</span></td>
                  <td style="font-weight:700; color:var(--text-dark);">${m.name}</td>
                  <td style="font-size:0.82rem; color:var(--text-secondary);">${m.category}</td>
                  <td style="font-weight:800; color:var(--text-dark);">${m.stock} ${m.unit}</td>
                  <td style="font-weight:800; color:var(--primary-teal);">${DH.fmtPHP(m.price)}</td>
                  <td>
                    <span class="badge-status ${m.status === 'In Stock' ? 'bs-discharged' : (m.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 'bs-critical')}">${m.status}</span>
                  </td>
                  <td>
                    <button class="btn-glass" style="padding:4px 10px; font-size:0.75rem;" onclick="PharmacyModule.dispenseItem('${m.code}')">
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

  dispenseItem (code) {
    const list = DB.pharmacyItems || [];
    const item = list.find(i => i.code === code);
    if (!item) return;

    if (item.stock <= 0) {
      App.toast(`Out of stock: ${item.name}`, 'error');
      return;
    }

    // Decrement stock balance locally
    item.stock--;
    if (item.stock === 0) {
      item.status = 'Out of Stock';
    } else if (item.stock < 100) {
      item.status = 'Low Stock';
    } else {
      item.status = 'In Stock';
    }

    // Sync back to Firestore in real-time
    if (FB.isConfigured && FB.db) {
      FB.db.collection('pharmacyItems').doc(item.id).update({
        stock: item.stock,
        status: item.status
      }).catch(err => {
        console.error("Dispensing Firestore Sync Failed:", err);
        App.toast("Missing permission: Only Pharmacist/Admin can dispense.", "error");
      });
    } else {
      App.toast(`Dispensed 1 unit of ${item.name}. Remaining: ${item.stock}`, 'success');
      // Trigger local render refresh
      const mainView = document.getElementById('main-view');
      if (mainView) this.render(mainView);
    }
  },

  openDispenseModal () {
    const patients = DB.patients || [];
    const items = DB.pharmacyItems || [];

    App.modal(`
      ${App.modalHeader('Dispense Inpatient Prescription', 'revenue')}
      <div class="modal-body" style="padding:18px 22px;">
        <form onsubmit="PharmacyModule.saveDispense(event)">
          <div style="margin-bottom:12px;">
            <label class="form-label">Select Patient *</label>
            <select class="form-control-select" id="dp-patient" required>
              ${patients.map(p => `<option value="${p.id}">${p.firstName} ${p.lastName} (${p.id}) — ${p.department||'Medicine'}</option>`).join('')}
            </select>
          </div>

          <div style="margin-bottom:12px;">
            <label class="form-label">Select Medication *</label>
            <select class="form-control-select" id="dp-med" required>
              ${items.map(i => `<option value="${i.code}">${i.name} (Stock: ${i.stock} ${i.unit}) — ₱${i.price}</option>`).join('')}
            </select>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:12px; margin-bottom:12px;">
            <div>
              <label class="form-label">Quantity to Dispense *</label>
              <input class="form-control-input" type="number" id="dp-qty" min="1" required value="1">
            </div>
            <div>
              <label class="form-label">Prescribing Physician</label>
              <input class="form-control-input" id="dp-physician" value="Dr. April Sunshine Pelias" placeholder="e.g. Dr. April Sunshine Pelias">
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <label class="form-label">Dosage Instructions / Sig</label>
            <input class="form-control-input" id="dp-sig" value="1 Tab TID after meals" placeholder="e.g. 1 Tablet every 8 hours">
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px; padding-top:14px; border-top:1px solid #E2E8F0;">
            <button type="button" class="btn-glass" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn-teal">
              ${Icons.svg('check', 16)} Confirm Dispensing
            </button>
          </div>
        </form>
      </div>
    `, 'modal-md');
  },

  saveDispense (e) {
    e.preventDefault();
    const pid = document.getElementById('dp-patient').value;
    const code = document.getElementById('dp-med').value;
    const qtyVal = Number(document.getElementById('dp-qty').value);
    const docName = document.getElementById('dp-physician').value;
    const sig = document.getElementById('dp-sig').value;

    const patient = DB.patients.find(p => p.id === pid);
    const item = DB.pharmacyItems.find(i => i.code === code);

    if (!item || !patient) return;

    if (item.stock < qtyVal) {
      App.toast(`Insufficient stock! Requested: ${qtyVal}, Available: ${item.stock}`, 'error');
      return;
    }

    // Decrement stock balance locally
    item.stock -= qtyVal;
    if (item.stock === 0) {
      item.status = 'Out of Stock';
    } else if (item.stock < 100) {
      item.status = 'Low Stock';
    } else {
      item.status = 'In Stock';
    }

    const dispensedId = DH.nextId('DSP-');
    const dspRecord = {
      id: dispensedId,
      patientId: pid,
      patientName: `${patient.firstName} ${patient.lastName}`,
      medicationCode: code,
      medicationName: item.name,
      quantity: qtyVal,
      physician: docName,
      sig: sig,
      date: DH.now(),
      dispensedBy: Auth.user.name || 'Pharmacist'
    };

    // Sync back to Firestore in real-time
    if (FB.isConfigured && FB.db) {
      // Update inventory stock
      FB.db.collection('pharmacyItems').doc(item.id).update({
        stock: item.stock,
        status: item.status
      }).catch(err => {
        console.error("Inventory update error:", err);
        App.toast("Error updating pharmacy stock.", "error");
      });

      // Save dispensed transaction record
      FB.db.collection('dispensedMedications').doc(dispensedId).set(dspRecord).catch(err => {
        console.error("Transaction save error:", err);
      });
    }

    App.closeModal();
    App.toast(`Successfully dispensed ${qtyVal} ${item.unit} of ${item.name} for ${patient.firstName} ${patient.lastName}!`, 'success');
  }
};
