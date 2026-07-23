/* ============================================================
   St. Therese MedTech Solution — User Management & Security Module
   ============================================================ */

const UsersModule = {
  render (container) {
    const list = DB.users;
    container.innerHTML = `
      <!-- Top Page Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-dark); display:flex; align-items:center; gap:10px;">
            <span>${Icons.svg('users', 24, 'var(--primary-teal)')}</span>
            <span>User Accounts & System Staff Directory</span>
          </h2>
          <div style="font-size:0.8rem; color:var(--text-muted);">Manage System Users, Role Access Credentials, Staff Ward Assignments & Passwords</div>
        </div>

        <div style="display:flex; gap:10px;">
          <button class="btn-glass" onclick="App.renderDashboard()">
            ${Icons.svg('chevronLeft', 14)} Back to Dashboard
          </button>
          <button class="btn-teal" onclick="UsersModule.openUserModal()">
            ${Icons.svg('plus', 15)} Create Staff Account
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="analytics-card" style="margin-bottom:20px; padding:16px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap;">
          <div class="search-box" style="width:320px;">
            <span class="search-box-icon">${Icons.svg('search', 16, '#94A3B8')}</span>
            <input placeholder="Search staff name, email, role..." oninput="UsersModule.filter(this.value)">
          </div>

          <div style="display:flex; gap:10px;">
            <select class="select-filter" onchange="UsersModule.filterByRole(this.value)">
              <option value="ALL">All Staff Roles</option>
              <option value="admin">Administrator</option>
              <option value="doctor">Attending Physician</option>
              <option value="nurse">Registered Nurse</option>
              <option value="registration">Registration Staff</option>
              <option value="laboratory">Laboratory Technologist</option>
              <option value="pharmacy">Pharmacist</option>
            </select>
          </div>
        </div>
      </div>

      <!-- User Accounts Table Card -->
      <div class="erp-table-card">
        <div style="overflow-x:auto;">
          <table class="erp-table">
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>User ID</th>
                <th>Email / Username</th>
                <th>Role & Access Level</th>
                <th>Department / Ward</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="users-dir-tbody">
              ${this._renderRows(list)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  _renderRows (list) {
    if (!list.length) return `<tr><td colspan="7" class="text-center p-4 text-muted">No staff accounts match criteria.</td></tr>`;
    return list.map(u => {
      const isSuspended = u.status === 'Suspended';
      const avatarBg = u.role === 'admin' ? 'linear-gradient(135deg, #475569, #1E293B)' : (u.role === 'doctor' ? 'linear-gradient(135deg, #0288D1, #00A896)' : (u.role === 'nurse' ? 'linear-gradient(135deg, #00A896, #0288D1)' : 'linear-gradient(135deg, #0D9488, #0288D1)'));

      const deptMap = {
        administration: "Administration & IT",
        medicine: "Internal Medicine",
        cardiology: "Cardiology & Critical Care",
        obgyn: "OB-GYN",
        pediatrics: "Pediatrics",
        surgery: "Surgery",
        laboratory: "Laboratory & Diagnostics",
        emergency: "Emergency Department",
        pharmacy: "Pharmacy"
      };
      const instMap = {
        main: "Main Center",
        specialty: "Specialty Clinic",
        er: "Emergency Center",
        "health-system": "Health System"
      };
      const deptLabel = deptMap[u.department] || u.department || 'General Staff';
      const instLabel = instMap[u.institution] || u.institution || 'Main Center';

      return `
        <tr>
          <td>
            <div class="user-avatar-cell">
              <div class="avatar-img" style="background:${avatarBg}">${u.avatar || u.name.substring(0,2).toUpperCase()}</div>
              <div>
                <div style="font-weight:800; color:var(--text-dark);">${u.name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${Auth.roleLabel(u.role)}</div>
              </div>
            </div>
          </td>
          <td><span style="font-family:monospace; font-weight:700; color:var(--primary-blue);">${u.id}</span></td>
          <td style="font-weight:600; color:var(--text-secondary);">${u.email}</td>
          <td>
            <span style="font-size:0.75rem; font-weight:700; padding:3px 10px; border-radius:6px; background:${u.role === 'admin' ? '#F1F5F9' : (u.role === 'doctor' ? '#E0F2FE' : (u.role === 'nurse' ? '#F0FDF4' : '#FDF4FF'))}; color:${u.role === 'admin' ? '#334155' : (u.role === 'doctor' ? '#0288D1' : (u.role === 'nurse' ? '#166534' : '#9333EA'))}; border:1px solid rgba(0,0,0,0.05);">
              ${Auth.roleLabel(u.role)}
            </span>
          </td>
          <td style="font-size:0.82rem; font-weight:600; color:var(--text-secondary);">${deptLabel} · ${instLabel}</td>
          <td>
            <span class="badge-status ${isSuspended ? 'badge-suspended' : 'badge-admitted'}" style="font-weight:700; font-size:0.75rem;">
              ${isSuspended ? 'Suspended' : 'Active'}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="btn-teal" style="padding:4px 10px; font-size:0.75rem;" onclick="UsersModule.openUserModal('${u.id}')">
                Edit
              </button>
              <button class="btn-glass" style="padding:4px 10px; font-size:0.75rem; color:var(--primary-blue);" onclick="UsersModule.openResetPasswordModal('${u.id}')">
                Reset Pass
              </button>
              <button class="btn-glass" style="padding:4px 10px; font-size:0.75rem; color:${isSuspended ? 'var(--success)' : 'var(--danger)'};" onclick="UsersModule.toggleStatus('${u.id}')">
                ${isSuspended ? 'Activate' : 'Suspend'}
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  filter (q) {
    const list = q
      ? DB.users.filter(u => `${u.name} ${u.email} ${u.role} ${u.id}`.toLowerCase().includes(q.toLowerCase()))
      : DB.users;
    const tbody = document.getElementById('users-dir-tbody');
    if (tbody) tbody.innerHTML = this._renderRows(list);
  },

  filterByRole (role) {
    const list = role === 'ALL'
      ? DB.users
      : DB.users.filter(u => u.role === role);
    const tbody = document.getElementById('users-dir-tbody');
    if (tbody) tbody.innerHTML = this._renderRows(list);
  },

  openUserModal (userId) {
    const u = userId ? DB.users.find(x => x.id === userId) : null;
    const isEdit = !!u;

    App.modal(`
      ${App.modalHeader(isEdit ? `Edit Staff Account: ${u.name}` : `Create New System Staff Account`, 'user')}
      <div class="modal-body" style="padding:18px 22px;">
        <form onsubmit="UsersModule.saveUser(event, '${userId || ''}')">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label class="form-label">Full Name *</label>
              <input class="form-control-input" id="um-name" required value="${u ? u.name : ''}" placeholder="e.g. Dr. Juan Cruz">
            </div>
            <div>
              <label class="form-label">Email / Username *</label>
              <input class="form-control-input" id="um-email" type="email" required value="${u ? u.email : ''}" placeholder="user@sttherese.ph">
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label class="form-label">Password *</label>
              <input class="form-control-input" id="um-pass" required value="${u ? u.password : ''}" placeholder="Access password">
            </div>
            <div>
              <label class="form-label">Role Access Level *</label>
              <select class="form-control-select" id="um-role" required>
                <option value="admin" ${u && u.role === 'admin' ? 'selected' : ''}>Administrator</option>
                <option value="doctor" ${u && u.role === 'doctor' ? 'selected' : ''}>Attending Physician</option>
                <option value="nurse" ${u && u.role === 'nurse' ? 'selected' : ''}>Registered Nurse</option>
                <option value="registration" ${u && u.role === 'registration' ? 'selected' : ''}>Registration Staff</option>
                <option value="laboratory" ${u && u.role === 'laboratory' ? 'selected' : ''}>Laboratory Technologist</option>
                <option value="pharmacy" ${u && u.role === 'pharmacy' ? 'selected' : ''}>Pharmacist</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
            <div>
              <label class="form-label">Department *</label>
              <select class="form-control-select" id="um-dept" required>
                <option value="administration" ${u && u.department === 'administration' ? 'selected' : ''}>Administration & IT</option>
                <option value="medicine" ${u && u.department === 'medicine' ? 'selected' : ''}>Internal Medicine</option>
                <option value="cardiology" ${u && u.department === 'cardiology' ? 'selected' : ''}>Cardiology & Critical Care</option>
                <option value="obgyn" ${u && u.department === 'obgyn' ? 'selected' : ''}>OB-GYN</option>
                <option value="pediatrics" ${u && u.department === 'pediatrics' ? 'selected' : ''}>Pediatrics</option>
                <option value="surgery" ${u && u.department === 'surgery' ? 'selected' : ''}>Surgery</option>
                <option value="laboratory" ${u && u.department === 'laboratory' ? 'selected' : ''}>Laboratory & Diagnostics</option>
                <option value="emergency" ${u && u.department === 'emergency' ? 'selected' : ''}>Emergency Department</option>
                <option value="pharmacy" ${u && u.department === 'pharmacy' ? 'selected' : ''}>Pharmacy</option>
              </select>
            </div>
            <div>
              <label class="form-label">Institution *</label>
              <select class="form-control-select" id="um-institution" required>
                <option value="main" ${u && u.institution === 'main' ? 'selected' : ''}>St. Therese Main Medical Center</option>
                <option value="specialty" ${u && u.institution === 'specialty' ? 'selected' : ''}>St. Therese Specialty Clinic</option>
                <option value="er" ${u && u.institution === 'er' ? 'selected' : ''}>St. Therese Emergency Center</option>
                <option value="health-system" ${u && u.institution === 'health-system' ? 'selected' : ''}>St. Therese Health System</option>
              </select>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px; padding-top:14px; border-top:1px solid #E2E8F0;">
            <button type="button" class="btn-glass" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn-teal">
              ${Icons.svg('check', 16)} ${isEdit ? 'Save Account Changes' : 'Create Staff Account'}
            </button>
          </div>
        </form>
      </div>
    `, 'modal-md');
  },

  async saveUser (e, userId) {
    e.preventDefault();
    const name = document.getElementById('um-name').value;
    const email = document.getElementById('um-email').value;
    const pass = document.getElementById('um-pass').value;
    const role = document.getElementById('um-role').value;
    const dept = document.getElementById('um-dept').value;
    const inst = document.getElementById('um-institution').value;

    if (userId) {
      const u = DB.users.find(x => x.id === userId);
      if (u) {
        u.name = name;
        u.email = email;
        u.password = pass;
        u.role = role;
        u.department = dept;
        u.institution = inst;
        u.avatar = name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
        if (FB.isConfigured && FB.db) {
          FB.db.collection('users').doc(u.id).set(u).catch(err => console.error(err));
        }
      }
      App.toast(`Account for ${name} updated successfully!`, 'success');
    } else {
      const newUser = {
        id: DH.nextId('U'),
        name: name,
        email: email,
        password: pass,
        role: role,
        department: dept,
        institution: inst,
        status: 'Active',
        avatar: name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()
      };
      
      if (FB.isConfigured && FB.db) {
        App.toast('Creating Firebase Auth account...', 'info');
        try {
          // Initialize a secondary Firebase app instance to avoid logging out the current admin
          const tempApp = firebase.initializeApp(firebaseConfig, "TempAppUserCreator");
          const credential = await tempApp.auth().createUserWithEmailAndPassword(email, pass);
          const fbUser = credential.user;
          await tempApp.delete();

          // Set user document using the newly created Auth UID
          newUser.id = fbUser.uid;
          await FB.db.collection('users').doc(fbUser.uid).set(newUser);
          DB.users.push(newUser);
          App.toast(`New account created for ${name} (${Auth.roleLabel(role)})!`, 'success');
        } catch (err) {
          console.error("Firebase User Auth Creation Error:", err);
          App.toast(`Auth Error: ${err.message}`, 'error');
          return; // Stop execution on error
        }
      } else {
        DB.users.push(newUser);
        App.toast(`New account created locally for ${name} (${Auth.roleLabel(role)})!`, 'success');
      }
    }

    App.closeModal();
    const mainView = document.getElementById('main-view');
    if (mainView) this.render(mainView);
  },

  openResetPasswordModal (userId) {
    const u = DB.users.find(x => x.id === userId);
    if (!u) return;

    App.modal(`
      ${App.modalHeader(`Reset Password: ${u.name}`, 'lock')}
      <div class="modal-body" style="padding:18px 22px;">
        <form onsubmit="UsersModule.savePasswordReset(event, '${u.id}')">
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:12px; border-radius:8px; margin-bottom:12px; font-size:0.84rem;">
            <div><strong>Staff Member:</strong> ${u.name}</div>
            <div><strong>Email:</strong> ${u.email}</div>
          </div>

          <div style="margin-bottom:14px;">
            <label class="form-label">New Password *</label>
            <input class="form-control-input" id="reset-pass-val" required value="StTherese2026!" placeholder="Enter new password">
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px; padding-top:14px; border-top:1px solid #E2E8F0;">
            <button type="button" class="btn-glass" onclick="App.closeModal()">Cancel</button>
            <button type="submit" class="btn-teal">
              ${Icons.svg('check', 16)} Confirm Password Reset
            </button>
          </div>
        </form>
      </div>
    `, 'modal-md');
  },

  savePasswordReset (e, userId) {
    e.preventDefault();
    const u = DB.users.find(x => x.id === userId);
    const newPass = document.getElementById('reset-pass-val').value;
    if (u) {
      u.password = newPass;
      if (FB.isConfigured && FB.db) {
        FB.db.collection('users').doc(u.id).update({ password: newPass }).catch(err => console.error(err));
      }
    }

    App.closeModal();
    App.toast(`Password reset for ${u.name}! New password: ${newPass}`, 'success');
    const mainView = document.getElementById('main-view');
    if (mainView) this.render(mainView);
  },

  toggleStatus (userId) {
    const u = DB.users.find(x => x.id === userId);
    if (!u) return;
    u.status = u.status === 'Suspended' ? 'Active' : 'Suspended';
    if (FB.isConfigured && FB.db) {
      FB.db.collection('users').doc(u.id).update({ status: u.status }).catch(err => console.error(err));
    }
    App.toast(`Account status for ${u.name} set to ${u.status}!`, u.status === 'Active' ? 'success' : 'warning');
    const mainView = document.getElementById('main-view');
    if (mainView) this.render(mainView);
  }
};
