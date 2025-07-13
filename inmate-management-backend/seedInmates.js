require('dotenv').config();
const mongoose = require('mongoose');
const Inmate = require('./models/Inmate'); // Adjust path if needed

const inmatesData = [
  {
    inmateId: 'INM-2025-001',
    firstName: 'Chinedu',
    lastName: 'Okafor',
    dateOfBirth: new Date('1988-02-14'),
    age: 37,
    gender: 'Male',
    offense: 'Armed robbery',
    admissionDate: new Date('2025-01-18'),
    sentenceLength: '8 years',
    emergencyContact: 'Ngozi Okafor',
    emergencyPhone: '08031234567',
    notes: 'Asthmatic',
    status: 'Active',
  },
  {
    inmateId: 'INM-2025-002',
    firstName: 'Aisha',
    lastName: 'Bello',
    dateOfBirth: new Date('1992-11-03'),
    age: 32,
    gender: 'Female',
    offense: 'Fraud',
    admissionDate: new Date('2025-02-08'),
    sentenceLength: '5 years',
    emergencyContact: 'Yusuf Bello',
    emergencyPhone: '08021234567',
    notes: 'Diabetic',
    status: 'Active',
  },
  {
    inmateId: 'INM-2025-003',
    firstName: 'Emeka',
    lastName: 'Nwosu',
    dateOfBirth: new Date('1985-06-21'),
    age: 39,
    gender: 'Male',
    offense: 'Burglary',
    admissionDate: new Date('2025-03-12'),
    sentenceLength: '6 years',
    emergencyContact: 'Ifeoma Nwosu',
    emergencyPhone: '08039876543',
    notes: '',
    status: 'Active',
  },
  {
    inmateId: 'INM-2025-004',
    firstName: 'Fatima',
    lastName: 'Abubakar',
    dateOfBirth: new Date('1990-09-15'),
    age: 34,
    gender: 'Female',
    offense: 'Drug trafficking',
    admissionDate: new Date('2025-04-05'),
    sentenceLength: '10 years',
    emergencyContact: 'Hassan Abubakar',
    emergencyPhone: '08045678901',
    notes: '',
    status: 'Active',
  },
  {
    inmateId: 'INM-2025-005',
    firstName: 'Ibrahim',
    lastName: 'Sani',
    dateOfBirth: new Date('1982-12-30'),
    age: 41,
    gender: 'Male',
    offense: 'Assault',
    admissionDate: new Date('2025-02-20'),
    sentenceLength: '4 years',
    emergencyContact: 'Amina Sani',
    emergencyPhone: '08056789012',
    notes: 'Allergic to penicillin',
    status: 'Active',
  },
  {
    inmateId: 'INM-2025-006',
    firstName: 'Ngozi',
    lastName: 'Eze',
    dateOfBirth: new Date('1995-07-07'),
    age: 28,
    gender: 'Female',
    offense: 'Theft',
    admissionDate: new Date('2025-05-10'),
    sentenceLength: '3 years',
    emergencyContact: 'Chuka Eze',
    emergencyPhone: '08067890123',
    notes: '',
    status: 'Active',
  },
  {
    inmateId: 'INM-2025-007',
    firstName: 'Tunde',
    lastName: 'Ojo',
    dateOfBirth: new Date('1987-03-25'),
    age: 36,
    gender: 'Male',
    offense: 'Forgery',
    admissionDate: new Date('2025-01-30'),
    sentenceLength: '5 years',
    emergencyContact: 'Bola Ojo',
    emergencyPhone: '08078901234',
    notes: '',
    status: 'Active',
  },
  {
    inmateId: 'INM-2025-008',
    firstName: 'Maryam',
    lastName: 'Usman',
    dateOfBirth: new Date('1993-11-18'),
    age: 31,
    gender: 'Female',
    offense: 'Money laundering',
    admissionDate: new Date('2025-03-22'),
    sentenceLength: '7 years',
    emergencyContact: 'Sani Usman',
    emergencyPhone: '08089012345',
    notes: '',
    status: 'Active',
  },
  {
    inmateId: 'INM-2025-009',
    firstName: 'Joseph',
    lastName: 'Okeke',
    dateOfBirth: new Date('1984-08-09'),
    age: 39,
    gender: 'Male',
    offense: 'Cybercrime',
    admissionDate: new Date('2025-04-15'),
    sentenceLength: '6 years',
    emergencyContact: 'Ada Okeke',
    emergencyPhone: '08090123456',
    notes: '',
    status: 'Active',
  },
];

async function seedInmates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Optional: clear existing inmates (uncomment if needed)
    // await Inmate.deleteMany({});
    // console.log('Existing inmates cleared');

    for (const inmateData of inmatesData) {
      const exists = await Inmate.findOne({ inmateId: inmateData.inmateId });
      if (exists) {
        console.log(`Inmate ${inmateData.inmateId} already exists, skipping.`);
        continue;
      }
      const inmate = new Inmate(inmateData);
      await inmate.save();
      console.log(`Inmate ${inmateData.inmateId} added.`);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding inmates:', err);
    process.exit(1);
  }
}

seedInmates();
