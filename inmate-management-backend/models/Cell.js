const mongoose = require('mongoose');

const CellSchema = new mongoose.Schema({
  cellNumber: { type: String, unique: true, required: true },
  block: { type: String, enum: ['A', 'B', 'C'], required: true },
  capacity: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
  status: { type: String, enum: ['Available', 'Full', 'Empty', 'Maintenance'], default: 'Empty' },
  type: { type: String, enum: ['Standard', 'Solitary'], required: true },
  inmates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inmate' }],
});

module.exports = mongoose.model('Cell', CellSchema);
