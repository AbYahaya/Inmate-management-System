const mongoose = require('mongoose');

const InmateSchema = new mongoose.Schema({
  inmateId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  offense: { type: String, required: true },
  admissionDate: { type: Date, required: true },
  sentenceLength: { type: String },
  emergencyContact: { type: String },
  emergencyPhone: { type: String },
  notes: { type: String },
  cell: { type: mongoose.Schema.Types.ObjectId, ref: 'Cell' },
  status: { type: String, enum: ['Active', 'Released', 'Transferred'], required: true },
});

module.exports = mongoose.model('Inmate', InmateSchema);
