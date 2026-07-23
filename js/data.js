/* ============================================================
   St. Therese MedTech Solution — Data Cache & Firestore Sync
   Exclusively references Cloud Firestore when Firebase is active.
   ============================================================ */

const DB = {
  /* ──────────── METRICS & STATS ──────────── */
  metrics: {
    opdVisits: 0,
    revenue: 0,
    revenueGrowth: 0,
    beds: {
      total: 0,
      occupied: 0,
      available: 0,
    },
    pendingPayments: 0,
  },

  /* ──────────── LOCAL DATABASES (CACHED FROM FIRESTORE) ──────────── */
  users: [],
  rooms: [],
  beds: [],
  patients: [],
  admissions: [],
  vitalSigns: [],
  diagnoses: [],
  labOrders: [],
  doctors: [],
  consultations: [],
  pharmacyItems: [],
};

/* ============================================================
   DataHelper — Utility methods
   ============================================================ */
const DH = {
  getPatient: (id) => DB.patients.find(p => p.id === id) || DB.patients[0],
  getAdmission: (pid) => DB.admissions.find(a => a.patientId === pid),
  getUser:      (id) => DB.users.find(u => u.id === id),
  getRoom:      (id) => DB.rooms.find(r => r.id === id),
  getBed:       (id) => DB.beds.find(b => b.id === id),

  availableBeds:(roomId) => DB.beds.filter(b => b.roomId === roomId && b.status === 'available'),
  nextId: (prefix) => `${prefix}${String(Date.now()).slice(-6)}`,
  now: () => new Date().toLocaleString('sv').replace('T',' '),

  statusBadge: (status) => {
    if (status === 'Admitted') return 'bs-admitted';
    if (status === 'Discharged') return 'bs-discharged';
    return 'bs-critical';
  },

  triageBadge: (level) => {
    switch ((level||'').toUpperCase()) {
      case 'RED':    return `<span class="badge bs-critical">Level 1 — RED</span>`;
      case 'YELLOW': return `<span class="badge bs-admitted">Level 2 — YELLOW</span>`;
      case 'GREEN':  return `<span class="badge bs-discharged">Level 3 — GREEN</span>`;
      default:       return `<span class="badge">Unassigned</span>`;
    }
  },

  fmtPHP: (num) => `₱${Number(num).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  fmtDate: (d) => { if(!d) return '—'; return new Date(d).toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric'}); },
  age:     (dob) => { if(!dob) return '—'; return Math.floor((new Date()-new Date(dob))/31557600000); },
};

// Sync DB with Firestore if Firebase is configured via Real-Time Listeners
DB.syncWithFirestore = async function() {
  if (!FB.isConfigured || !FB.db) return;

  try {
    console.log("🔄 Initializing Firestore Real-Time Subscriptions...");

    // Seed database first if empty
    await FB.seedInitialData();

    // 1. Users Listener
    FB.db.collection('users').onSnapshot(snap => {
      DB.users = snap.docs.map(doc => doc.data());
      console.log("⚡ Users synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Users sync err:", err));

    // 2. Patients Listener
    FB.db.collection('patients').onSnapshot(snap => {
      DB.patients = snap.docs.map(doc => doc.data());
      console.log("⚡ Patients synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Patients sync err:", err));

    // 3. Rooms Listener
    FB.db.collection('rooms').onSnapshot(snap => {
      DB.rooms = snap.docs.map(doc => doc.data());
      console.log("⚡ Rooms synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Rooms sync err:", err));

    // 4. Beds Listener
    FB.db.collection('beds').onSnapshot(snap => {
      DB.beds = snap.docs.map(doc => doc.data());
      // Re-calculate bed metrics dynamically
      DB.metrics.beds.total = DB.beds.length;
      DB.metrics.beds.occupied = DB.beds.filter(b => b.status === 'occupied').length;
      DB.metrics.beds.available = DB.beds.filter(b => b.status === 'available').length;
      console.log("⚡ Beds synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Beds sync err:", err));

    // 5. Admissions Listener
    FB.db.collection('admissions').onSnapshot(snap => {
      DB.admissions = snap.docs.map(doc => doc.data());
      console.log("⚡ Admissions synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Admissions sync err:", err));

    // 6. Vital Signs Listener
    FB.db.collection('vitalSigns').onSnapshot(snap => {
      DB.vitalSigns = snap.docs.map(doc => doc.data());
      console.log("⚡ Vital signs synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Vitals sync err:", err));

    // 7. Lab Orders Listener
    FB.db.collection('labOrders').onSnapshot(snap => {
      DB.labOrders = snap.docs.map(doc => doc.data());
      console.log("⚡ Lab orders synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Labs sync err:", err));

    // 8. Doctors Listener
    FB.db.collection('doctors').onSnapshot(snap => {
      DB.doctors = snap.docs.map(doc => doc.data());
      console.log("⚡ Doctors synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Doctors sync err:", err));

    // 9. Consultations Listener
    FB.db.collection('consultations').onSnapshot(snap => {
      DB.consultations = snap.docs.map(doc => doc.data());
      console.log("⚡ Consultations synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Consultations sync err:", err));

    // 10. Pharmacy Items Listener
    FB.db.collection('pharmacyItems').onSnapshot(snap => {
      DB.pharmacyItems = snap.docs.map(doc => doc.data());
      console.log("⚡ Pharmacy inventory synced.");
      if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
    }, err => console.error("Pharmacy sync err:", err));

    // 11. Metadata Stats Listener
    FB.db.collection('metadata').doc('hospitalStats').onSnapshot(doc => {
      if (doc.exists) {
        const stats = doc.data();
        DB.metrics.opdVisits = stats.opdVisits || 0;
        DB.metrics.revenue = stats.revenue || 0;
        DB.metrics.revenueGrowth = stats.revenueGrowth || 0;
        DB.metrics.pendingPayments = stats.pendingPayments || 0;
        console.log("⚡ Global stats synced.");
        if (typeof App !== 'undefined' && App.refreshActiveView) App.refreshActiveView();
      }
    }, err => console.error("Global stats sync err:", err));

  } catch (e) {
    console.error("❌ Error initializing Firestore listeners:", e);
  }
};
