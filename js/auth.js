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

  async login (input, password) {
    const cleanInput = (input || '').trim().toLowerCase();
    const cleanPass  = (password || '').trim();

    if (FB.isConfigured) {
      try {
        let email = cleanInput;
        // Resolve email from username or id if needed
        if (!email.includes('@')) {
          const matched = DB.users.find(u => 
            u.username === cleanInput || 
            u.id.toLowerCase() === cleanInput || 
            cleanInput === 'admin'
          );
          if (matched) {
            email = matched.email;
          }
        }

        const userCredential = await FB.auth.signInWithEmailAndPassword(email, cleanPass);
        const fbUser = userCredential.user;

        // Fetch user profile from Firestore
        const doc = await FB.db.collection('users').doc(fbUser.uid).get();
        let userDetail = doc.exists ? doc.data() : null;

        if (!userDetail) {
          // Try loading from local DB users if we match by email
          const matchedLocal = DB.users.find(u => u.email.toLowerCase() === fbUser.email.toLowerCase());
          if (matchedLocal) {
            userDetail = matchedLocal;
            // Write to Firestore for next time
            await FB.db.collection('users').doc(fbUser.uid).set(matchedLocal);
          } else {
            userDetail = {
              id: fbUser.uid,
              name: fbUser.displayName || fbUser.email.split('@')[0],
              email: fbUser.email,
              role: 'admin',
              avatar: 'U'
            };
          }
        }

        this._user = userDetail;
        localStorage.setItem('st_user', JSON.stringify(userDetail));
        return { success: true, user: userDetail };
      } catch (e) {
        console.error("Firebase Auth Error:", e);
        return { success: false, message: e.message };
      }
    }

    // Fallback to Local Mock DB
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
    if (FB.isConfigured) {
      FB.auth.signOut().then(() => {
        window.location.href = 'login.html';
      }).catch(e => {
        console.error(e);
        window.location.href = 'login.html';
      });
    } else {
      window.location.href = 'login.html';
    }
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
