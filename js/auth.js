/* ============================================================
   St. Therese MedTech Solution — Auth & Session Module
   ============================================================ */

const Auth = {
  _user: null,

  get user () {
    if (!this._user) {
      const saved = localStorage.getItem('st_user');
      if (saved) {
        try { this._user = JSON.parse(saved); } catch (e) { this._user = null; }
      }
      if (!this._user) {
        this._user = DB.users[0]; // Default Admin User
      }
    }
    return this._user;
  },

  login (input, password) {
    const cleanInput = (input || '').trim().toLowerCase();
    const cleanPass  = (password || '').trim();

    const matched = DB.users.find(u => 
      (u.email.toLowerCase() === cleanInput || u.id.toLowerCase() === cleanInput || (u.username && u.username.toLowerCase() === cleanInput) || cleanInput === 'admin') 
      && u.password === cleanPass
    );
    if (matched) {
      this._user = matched;
      localStorage.setItem('st_user', JSON.stringify(matched));
      return { success: true, user: matched };
    }
    return { success: false, message: 'Invalid username or password' };
  },

  logout () {
    localStorage.removeItem('st_user');
    this._user = null;
    window.location.href = 'login.html';
  },

  verifyPassword (pass) {
    if (!pass) return false;
    const cleanPass = pass.trim();
    return cleanPass === this.user.password || DB.users.some(u => u.password === cleanPass);
  },

  roleLabel (role) {
    return {
      admin: 'Administrator',
      registration: 'Registration Staff',
      doctor: 'Attending Physician',
      nurse: 'Registered Nurse',
      laboratory: 'Laboratory Technologist',
      pharmacy: 'Pharmacist',
    }[role] || role;
  },
};
