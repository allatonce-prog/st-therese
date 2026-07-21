/* ============================================================
   St. Therese MedTech Solution — Data Store & Helpers
   Mock data for Glassmorphism Hospital ERP (PHP Currency)
   ============================================================ */

const DB = {

  /* ──────────── METRICS & STATS ──────────── */
  metrics: {
    opdVisits: 27323,
    revenue: 1032050.00,
    revenueGrowth: 13.45,
    beds: {
      total: 226,
      occupied: 166,
      available: 60,
    },
    pendingPayments: 1337000.00,
  },

  /* ──────────── USERS / STAFF ──────────── */
  users: [
    { id:'U001', name:'Admin User',               email:'admin@sttherese.ph',        password:'admin',   role:'admin',        avatar:'AU' },
    { id:'U002', name:'Ana Reyes',                 email:'registration@sttherese.ph', password:'reg123',  role:'registration', avatar:'AR' },
    { id:'U003', name:'Dr. April Sunshine L. Pelias',email:'doctor@sttherese.ph',     password:'doc123',  role:'doctor',       avatar:'AP', specialty:'OB-GYN / Internal Medicine', department:'Medicine' },
    { id:'U004', name:'Dr. Gedelene V. Doromal-Torres',email:'doctor2@sttherese.ph', password:'doc456',  role:'doctor',       avatar:'GT', specialty:'Cardiology & Critical Care', department:'Cardiology' },
    { id:'U005', name:'RN Maria Santos',           email:'nurse@sttherese.ph',        password:'nurse123',role:'nurse',        avatar:'MS', ward:'Ward 2001' },
  ],

  /* ──────────── ROOMS & BEDS ──────────── */
  rooms: [
    { id:'R001', name:'2001 (Station A)', type:'General',   floor:2, totalBeds:37, department:'Internal Medicine' },
    { id:'R002', name:'Ward B',          type:'General',   floor:1, totalBeds:10, department:'Cardiology' },
    { id:'R003', name:'ICU',             type:'Intensive', floor:2, totalBeds:6,  department:'Critical Care' },
    { id:'R004', name:'Delivery Room',   type:'Delivery',  floor:2, totalBeds:2,  department:'OB-GYN' },
    { id:'R005', name:'Operating Room',  type:'Surgical',  floor:2, totalBeds:2,  department:'Surgery' },
  ],

  beds: [
    /* Station A Ward 2001 */
    { id:'B001', roomId:'R001', number:'1',  status:'occupied'  },
    { id:'B002', roomId:'R001', number:'2',  status:'occupied'  },
    { id:'B003', roomId:'R001', number:'3',  status:'occupied'  },
    { id:'B004', roomId:'R001', number:'14', status:'available' },
    { id:'B005', roomId:'R001', number:'16', status:'available' },

    /* Ward B Cardiology */
    { id:'B006', roomId:'R002', number:'B-1', status:'occupied'  },
    { id:'B007', roomId:'R002', number:'B-2', status:'available' },

    /* ICU Bay */
    { id:'B008', roomId:'R003', number:'ICU-1', status:'occupied'  },
    { id:'B009', roomId:'R003', number:'ICU-2', status:'available' },

    /* Delivery Room Suite */
    { id:'B010', roomId:'R004', number:'DR-1', status:'occupied'  },
    { id:'B011', roomId:'R004', number:'DR-2', status:'available' },

    /* Operating Room Suite */
    { id:'B012', roomId:'R005', number:'OR-1', status:'occupied'  },
    { id:'B013', roomId:'R005', number:'OR-2', status:'available' },
  ],

  /* ──────────── RECENT PATIENTS ──────────── */
  patients: [
    {
      id: 'IP26-001883',
      firstName: 'EVELYN JOYCE', lastName: 'INSON', middleName: '',
      birthdate: '2004-03-29', age: 22, sex: 'Female',
      department: 'OB-GYN (Delivery)', status: 'Admitted',
      registeredDate: '19 Jul 2026', triageLevel: 'YELLOW',
      chiefComplaint: 'SUDDEN ONSET OF PROFUSE VAGINAL BLEEDING',
      admittingDiagnosis: 'THREATENED ABORTIONED G2P1 (1001) 15 WEEKS GESTATION',
      bloodType: 'O+', allergies: 'No known drug allergies',
      philHealthNumber: 'PH-9923847102',
    },
    {
      id: '0000350',
      firstName: 'Arlni', lastName: 'Smith', middleName: '',
      birthdate: '1995-04-12', age: 31, sex: 'Female',
      department: 'Emergency Care', status: 'Admitted',
      registeredDate: '18 May 2026', triageLevel: 'YELLOW',
      chiefComplaint: 'ACUTE ABDOMINAL PAIN AND NAUSEA',
      admittingDiagnosis: 'ACUTE APPENDICITIS (ICD-10: K35.8)',
      bloodType: 'A+', allergies: 'None known',
      philHealthNumber: 'PH-1122334455',
    },
    {
      id: 'P-2024-001',
      firstName: 'JUAN', lastName: 'DELA CRUZ', middleName: 'SANTOS',
      birthdate: '1975-03-15', age: 49, sex: 'Male',
      department: 'Internal Medicine', status: 'Admitted',
      registeredDate: '10 Jan 2026', triageLevel: 'YELLOW',
      chiefComplaint: 'SEVERE HEADACHE AND DIZZINESS',
      admittingDiagnosis: 'HYPERTENSIVE EMERGENCY (ICD-10: I16.1)',
      bloodType: 'O+', allergies: 'Penicillin',
      philHealthNumber: 'PH-5544332211',
    },
    {
      id: '0000430',
      firstName: 'Jonph', lastName: 'Parhri', middleName: '',
      birthdate: '1982-08-20', age: 43, sex: 'Male',
      department: 'Internal Medicine', status: 'Admitted',
      registeredDate: '18 May 2026', triageLevel: 'GREEN',
      chiefComplaint: 'MILD FEVER AND FATIGUE',
      admittingDiagnosis: 'ACUTE VIRAL SYNDROME',
      bloodType: 'O+', allergies: 'Penicillin',
      philHealthNumber: 'PH-6677889900',
    },
    {
      id: '0000450',
      firstName: 'Anoshy', lastName: 'Womna', middleName: '',
      birthdate: '1990-11-03', age: 35, sex: 'Female',
      department: 'Pediatrics / OB', status: 'Admitted',
      registeredDate: '18 May 2026', triageLevel: 'YELLOW',
      chiefComplaint: 'MATERNAL MONITORING & HYPERTENSION',
      admittingDiagnosis: 'PREECLAMPSIA MONITORING (18 WEEKS)',
      bloodType: 'B+', allergies: 'Sulfa drugs',
      philHealthNumber: 'PH-7788990011',
    },
    {
      id: '0000520',
      firstName: 'John', lastName: 'Smith', middleName: '',
      birthdate: '1978-02-14', age: 48, sex: 'Male',
      department: 'Surgery', status: 'Admitted',
      registeredDate: '18 May 2026', triageLevel: 'GREEN',
      chiefComplaint: 'POST-OPERATIVE FOLLOW UP',
      admittingDiagnosis: 'LAPAROSCOPIC CHOLECYSTECTOMY',
      bloodType: 'AB+', allergies: 'None known',
      philHealthNumber: 'PH-8899001122',
    },
  ],

  /* ──────────── ADMISSIONS (Mapped to every occupied bed) ──────────── */
  admissions: [
    { id:'ADM-001', patientId:'0000350',     roomId:'R001', bedId:'B001', doctorId:'U003', admissionDate:'18 May 2026', admissionReason:'Acute Appendicitis', status:'Admitted' },
    { id:'ADM-002', patientId:'JUAN DELA CRUZ',patientId:'P-2024-001', roomId:'R001', bedId:'B002', doctorId:'U003', admissionDate:'10 Jan 2026', admissionReason:'Hypertensive Emergency', status:'Admitted' },
    { id:'ADM-003', patientId:'0000450',     roomId:'R001', bedId:'B003', doctorId:'U003', admissionDate:'18 May 2026', admissionReason:'Preeclampsia Monitoring', status:'Admitted' },
    { id:'ADM-004', patientId:'0000430',     roomId:'R002', bedId:'B006', doctorId:'U004', admissionDate:'18 May 2026', admissionReason:'Acute Viral Syndrome', status:'Admitted' },
    { id:'ADM-005', patientId:'0000520',     roomId:'R003', bedId:'B008', doctorId:'U004', admissionDate:'18 May 2026', admissionReason:'Laparoscopic Cholecystectomy', status:'Admitted' },
    { id:'ADM-006', patientId:'IP26-001883', roomId:'R004', bedId:'B010', doctorId:'U003', admissionDate:'19 Jul 2026', admissionReason:'Threatened Abortion G2P1 15 Wks', status:'Admitted' },
    { id:'ADM-007', patientId:'0000350',     roomId:'R005', bedId:'B012', doctorId:'U003', admissionDate:'19 Jul 2026', admissionReason:'Surgical Prep', status:'Admitted' },
  ],

  /* ──────────── VITAL SIGNS ──────────── */
  vitalSigns: [
    { id:'V001', patientId:'IP26-001883', timestamp:'19 Jul 2026 22:30', bp:'110/70', pr:84, rr:18, temp:36.7, spo2:98, pain:4 },
    { id:'V002', patientId:'0000350',   timestamp:'18 May 2026 09:30', bp:'120/80', pr:78, rr:16, temp:37.0, spo2:99, pain:2 },
    { id:'V003', patientId:'P-2024-001',timestamp:'10 Jan 2026 14:10', bp:'150/95', pr:92, rr:20, temp:36.8, spo2:97, pain:3 },
  ],

  /* ──────────── DIAGNOSES ──────────── */
  diagnoses: [
    { id:'DX001', patientId:'IP26-001883', doctorName:'Dr. April Sunshine Pelias', diagnosis:'THREATENED ABORTIONED G2P1 (1001) 15 WEEKS GESTATION', icd10:'O20.0' },
  ],
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
