/* ============================================================
   St. Therese MedTech Solution — Firebase Configurations
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyAkNMXMAY3qRIggMnVgtTfIPeQIAi8_1EA",
  authDomain: "st-therese-7cdb4.firebaseapp.com",
  projectId: "st-therese-7cdb4",
  storageBucket: "st-therese-7cdb4.firebasestorage.app",
  messagingSenderId: "640151823387",
  appId: "1:640151823387:web:5f02348508b6bb98fd44be",
  measurementId: "G-1S0KL0QCKQ"
};

const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY";

if (isFirebaseConfigured) {
  try {
    firebase.initializeApp(firebaseConfig);
    console.log("🔥 Firebase initialized successfully.");
  } catch (e) {
    console.error("❌ Error initializing Firebase:", e);
  }
} else {
  console.warn("⚠️ Firebase configurations not found. Using local mock database fallback.");
}

const FB = {
  db: isFirebaseConfigured ? firebase.firestore() : null,
  auth: isFirebaseConfigured ? firebase.auth() : null,
  isConfigured: isFirebaseConfigured,

  // Seeds Firestore with local data if collection is empty
  async seedInitialData() {
    if (!this.isConfigured || !this.db) return;

    try {
      const usersSnap = await this.db.collection('users').limit(1).get();
      if (usersSnap.empty) {
        console.log("🌱 Firestore seems empty. Seeding initial hospital data...");

        const defaultUsers = [
          { id:'U001', name:'Admin User',               email:'admin@sttherese.ph',        password:'admin',   role:'admin',        avatar:'AU', department:'administration', institution:'main' },
          { id:'U002', name:'Ana Reyes',                 email:'registration@sttherese.ph', password:'reg123',  role:'registration', avatar:'AR', department:'administration', institution:'main' },
          { id:'U003', name:'Dr. April Sunshine L. Pelias',email:'doctor@sttherese.ph',     password:'doc123',  role:'doctor',       avatar:'AP', specialty:'OB-GYN / Internal Medicine', department:'obgyn', institution:'main' },
          { id:'U004', name:'Dr. Gedelene V. Doromal-Torres',email:'doctor2@sttherese.ph', password:'doc456',  role:'doctor',       avatar:'GT', specialty:'Cardiology & Critical Care', department:'cardiology', institution:'main' },
          { id:'U005', name:'RN Maria Santos',           email:'nurse@sttherese.ph',        password:'nurse123',role:'nurse',        avatar:'MS', ward:'Ward 2001', department:'medicine', institution:'main' },
        ];
        const defaultRooms = [
          { id:'R001', name:'2001 (Station A)', type:'General',   floor:2, totalBeds:37, department:'Internal Medicine' },
          { id:'R002', name:'Ward B',          type:'General',   floor:1, totalBeds:10, department:'Cardiology' },
          { id:'R003', name:'ICU',             type:'Intensive', floor:2, totalBeds:6,  department:'Critical Care' },
          { id:'R004', name:'Delivery Room',   type:'Delivery',  floor:2, totalBeds:2,  department:'OB-GYN' },
          { id:'R005', name:'Operating Room',  type:'Surgical',  floor:2, totalBeds:2,  department:'Surgery' },
        ];
        const defaultBeds = [
          { id:'B001', roomId:'R001', number:'1',  status:'occupied'  },
          { id:'B002', roomId:'R001', number:'2',  status:'occupied'  },
          { id:'B003', roomId:'R001', number:'3',  status:'occupied'  },
          { id:'B004', roomId:'R001', number:'14', status:'available' },
          { id:'B005', roomId:'R001', number:'16', status:'available' },
          { id:'B006', roomId:'R002', number:'B-1', status:'occupied'  },
          { id:'B007', roomId:'R002', number:'B-2', status:'available' },
          { id:'B008', roomId:'R003', number:'ICU-1', status:'occupied'  },
          { id:'B009', roomId:'R003', number:'ICU-2', status:'available' },
          { id:'B010', roomId:'R004', number:'DR-1', status:'occupied'  },
          { id:'B011', roomId:'R004', number:'DR-2', status:'available' },
          { id:'B012', roomId:'R005', number:'OR-1', status:'occupied'  },
          { id:'B013', roomId:'R005', number:'OR-2', status:'available' },
        ];
        const defaultPatients = [
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
        ];
        const defaultAdmissions = [
          { id:'ADM-001', patientId:'0000350',     roomId:'R001', bedId:'B001', doctorId:'U003', admissionDate:'18 May 2026', admissionReason:'Acute Appendicitis', status:'Admitted' },
          { id:'ADM-002', patientId:'P-2024-001',  roomId:'R001', bedId:'B002', doctorId:'U003', admissionDate:'10 Jan 2026', admissionReason:'Hypertensive Emergency', status:'Admitted' },
          { id:'ADM-003', patientId:'0000450',     roomId:'R001', bedId:'B003', doctorId:'U003', admissionDate:'18 May 2026', admissionReason:'Preeclampsia Monitoring', status:'Admitted' },
          { id:'ADM-004', patientId:'0000430',     roomId:'R002', bedId:'B006', doctorId:'U004', admissionDate:'18 May 2026', admissionReason:'Acute Viral Syndrome', status:'Admitted' },
          { id:'ADM-005', patientId:'0000520',     roomId:'R003', bedId:'B008', doctorId:'U004', admissionDate:'18 May 2026', admissionReason:'Laparoscopic Cholecystectomy', status:'Admitted' },
          { id:'ADM-006', patientId:'IP26-001883', roomId:'R004', bedId:'B010', doctorId:'U003', admissionDate:'19 Jul 2026', admissionReason:'Threatened Abortion G2P1 15 Wks', status:'Admitted' },
          { id:'ADM-007', patientId:'0000350',     roomId:'R005', bedId:'B012', doctorId:'U003', admissionDate:'19 Jul 2026', admissionReason:'Surgical Prep', status:'Admitted' },
        ];
        const defaultVitalSigns = [
          { id:'V001', patientId:'IP26-001883', timestamp:'19 Jul 2026 22:30', bp:'110/70', pr:84, rr:18, temp:36.7, spo2:98, pain:4 },
          { id:'V002', patientId:'0000350',   timestamp:'18 May 2026 09:30', bp:'120/80', pr:78, rr:16, temp:37.0, spo2:99, pain:2 },
          { id:'V003', patientId:'P-2024-001',timestamp:'10 Jan 2026 14:10', bp:'150/95', pr:92, rr:20, temp:36.8, spo2:97, pain:3 },
        ];
        const defaultStats = {
          opdVisits: 0,
          revenue: 0,
          revenueGrowth: 0,
          pendingPayments: 0
        };
        const defaultLabOrders = [
          { id:'LAB-2026-081', patientId:'IP26-001883', patientName:'EVELYN JOYCE INSON', testName:'Obstetric Ultrasound & HCG Level', dept:'OB-GYN / DR Suite', orderedBy:'Dr. April Sunshine Pelias', date:'19 Jul 2026 22:30', status:'Completed', result:'Threatened abortion 15wks. HCG 45,000 mIU/mL' },
          { id:'LAB-2026-082', patientId:'0000350', patientName:'Arlni Smith', testName:'Complete Blood Count (CBC) & CRP', dept:'Emergency Care', orderedBy:'Dr. April Sunshine Pelias', date:'18 May 2026 09:15', status:'Completed', result:'WBC 14.2 x10^9/L (Leukocytosis), CRP 45 mg/L' },
          { id:'LAB-2026-083', patientId:'P-2024-001', patientName:'JUAN DELA CRUZ', testName:'Serum Electrolytes & Lipid Panel', dept:'Internal Medicine', orderedBy:'Dr. Gedelene Torres', date:'10 Jan 2026 14:30', status:'Processing', result:'Pending Laboratory Analysis' },
          { id:'LAB-2026-084', patientId:'0000450', patientName:'Anoshy Womna', testName:'Urinalysis & Blood Chemistry', dept:'Pediatrics / OB', orderedBy:'Dr. April Sunshine Pelias', date:'18 May 2026 11:00', status:'Pending', result:'Specimen Collected' },
        ];
        const defaultDoctors = [
          { id:'DOC-001', name:'Dr. April Sunshine L. Pelias', specialty:'OB-GYN / Internal Medicine', department:'Medicine & OB', email:'pelias@sttherese.ph', phone:'+63 917 123 4567', room:'Room 201', activePatients:12, schedule:'Mon - Fri (08:00 AM - 04:00 PM)', status:'Active' },
          { id:'DOC-002', name:'Dr. Gedelene V. Doromal-Torres', specialty:'Cardiology & Critical Care', department:'Cardiology', email:'torres@sttherese.ph', phone:'+63 918 234 5678', room:'ICU Station A', activePatients:8, schedule:'Mon - Sat (09:00 AM - 05:00 PM)', status:'Active' },
          { id:'DOC-003', name:'Dr. Ricardo Santos', specialty:'General & Laparoscopic Surgery', department:'Surgery', email:'santos@sttherese.ph', phone:'+63 919 345 6789', room:'OR Suite 2', activePatients:6, schedule:'Tue - Sun (07:00 AM - 03:00 PM)', status:'Active' },
          { id:'DOC-004', name:'Dr. Maria Elena Cruz', specialty:'Pediatrics & Neonatology', department:'Pediatrics', email:'cruz@sttherese.ph', phone:'+63 920 456 7890', room:'Pediatric Ward 3', activePatients:10, schedule:'Mon - Fri (09:00 AM - 06:00 PM)', status:'Active' },
        ];
        const defaultConsultations = [
          { id: 'C001', doctorId: 'DOC-001', patientName: 'Evelyn Joyce Inson', patientId: 'IP26-001883', time: '10:30 AM', date: 'Today (Mon)', type: 'OB-GYN Consult', status: 'In Consultation', note: 'Threatened Abortion 15w - Bedside Ultrasound' },
          { id: 'C002', doctorId: 'DOC-001', patientName: 'Arlni Smith', patientId: '0000350', time: '11:45 AM', date: 'Today (Mon)', type: 'Internal Medicine', status: 'Confirmed', note: 'Hypertension Follow-up & Electrolyte Review' },
          { id: 'C003', doctorId: 'DOC-001', patientName: 'Juan Dela Cruz', patientId: 'P-2024-001', time: '01:30 PM', date: 'Today (Mon)', type: 'Post-Op Follow-up', status: 'Confirmed', note: 'Abdominal Dressing Check & Rx Adjustment' },
          { id: 'C004', doctorId: 'DOC-002', patientName: 'Anoshy Womna', patientId: '0000450', time: '09:30 AM', date: 'Today (Mon)', type: 'Cardiology ECG', status: 'Confirmed', note: 'Rule out Arrythmia & 2D Echo' },
          { id: 'C005', doctorId: 'DOC-002', patientName: 'John Smith', patientId: '0000520', time: '02:00 PM', date: 'Today (Mon)', type: 'ICU Rounds', status: 'Scheduled', note: 'Critical Care Inpatient Assessment' },
          { id: 'C006', doctorId: 'DOC-003', patientName: 'Jonph Parhri', patientId: '0000430', time: '08:30 AM', date: 'Today (Mon)', type: 'Surgery Pre-Op', status: 'Confirmed', note: 'Laparoscopic Cholecystectomy Clearance' },
          { id: 'C007', doctorId: 'DOC-004', patientName: 'Anoshy Womna', patientId: '0000450', time: '11:00 AM', date: 'Today (Mon)', type: 'Pediatric Check', status: 'Confirmed', note: 'Routine Pediatric Screening' },
        ];
        const defaultPharmacyItems = [
          { id:'MED-001', code:'MED-001', name:'Isoxsuprine HCl 10mg Tab (Gestox)', category:'OB-GYN / Tocolytic', stock:420, price:28.50, unit:'Tablets', status:'In Stock' },
          { id:'MED-002', code:'MED-002', name:'Tranexamic Acid 500mg IV Ampule', category:'Hemostatic Agent', stock:150, price:120.00, unit:'Ampules', status:'In Stock' },
          { id:'MED-003', code:'MED-003', name:'Paracetamol 500mg Tab (Biogesic)', category:'Analgesic / Antipyretic', stock:1250, price:6.50, unit:'Tablets', status:'In Stock' },
          { id:'MED-004', code:'MED-004', name:'Cefuroxime 500mg Tab (Zinnat)', category:'Antibiotic (Cephalosporin)', stock:310, price:85.00, unit:'Tablets', status:'In Stock' },
          { id:'MED-005', code:'MED-005', name:'Amlodipine 10mg Tab', category:'Antihypertensive', stock:80, price:15.00, unit:'Tablets', status:'Low Stock' },
          { id:'MED-006', code:'MED-006', name:'IV Fluids D5LR 1000mL Bottle', category:'Intravenous Fluids', stock:500, price:185.00, unit:'Bottles', status:'In Stock' },
        ];

        // Seed Users
        for (const user of defaultUsers) {
          await this.db.collection('users').doc(user.id).set(user);
        }
        // Seed Patients
        for (const patient of defaultPatients) {
          await this.db.collection('patients').doc(patient.id).set(patient);
        }
        // Seed Rooms
        for (const room of defaultRooms) {
          await this.db.collection('rooms').doc(room.id).set(room);
        }
        // Seed Beds
        for (const bed of defaultBeds) {
          await this.db.collection('beds').doc(bed.id).set(bed);
        }
        // Seed Admissions
        for (const adm of defaultAdmissions) {
          await this.db.collection('admissions').doc(adm.id).set(adm);
        }
        // Seed Vital Signs
        for (const vital of defaultVitalSigns) {
          await this.db.collection('vitalSigns').doc(vital.id).set(vital);
        }
        // Seed Lab Orders
        for (const order of defaultLabOrders) {
          await this.db.collection('labOrders').doc(order.id).set(order);
        }
        // Seed Doctors
        for (const doc of defaultDoctors) {
          await this.db.collection('doctors').doc(doc.id).set(doc);
        }
        // Seed Consultations
        for (const consult of defaultConsultations) {
          await this.db.collection('consultations').doc(consult.id).set(consult);
        }
        // Seed Pharmacy Items
        for (const item of defaultPharmacyItems) {
          await this.db.collection('pharmacyItems').doc(item.id).set(item);
        }
        // Seed Metadata Stats
        await this.db.collection('metadata').doc('hospitalStats').set(defaultStats);

        console.log("✅ Seeding completed successfully!");
      }
    } catch (e) {
      console.error("❌ Failed to seed database:", e);
    }
  }
};
