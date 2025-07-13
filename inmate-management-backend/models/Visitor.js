const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  visitorName: { type: String, required: true },
  visitorId: { type: String },
  inmate: { type: mongoose.Schema.Types.ObjectId, ref: 'Inmate', required: true },
  visitDate: { type: Date, required: true },
  visitTime: { type: String, required: true },
  duration: { type: String },
  relationship: { type: String, required: true },
  purpose: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['Completed', 'In-progress', 'Cancelled'], default: 'Completed' },
});

module.exports = mongoose.model('Visitor', VisitorSchema);
