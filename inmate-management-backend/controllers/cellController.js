const Cell = require('../models/Cell');
const Inmate = require('../models/Inmate');
const { createCellSchema } = require('../validations/cellValidation');

exports.listCells = async (req, res, next) => {
  try {
    const cells = await Cell.find().populate('inmates', 'inmateId firstName lastName');
    res.json(cells);
  } catch (err) {
    next(err);
  }
};

exports.createCell = async (req, res, next) => {
  try {
    const { error, value } = createCellSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existing = await Cell.findOne({ cellNumber: value.cellNumber });
    if (existing) return res.status(400).json({ error: 'Cell number already exists' });

    const cell = new Cell(value);
    await cell.save();
    res.status(201).json(cell);
  } catch (err) {
    next(err);
  }
};

exports.assignInmate = async (req, res, next) => {
  try {
    const cell = await Cell.findById(req.params.id).populate('inmates');
    if (!cell) return res.status(404).json({ error: 'Cell not found' });

    const { inmateId } = req.body;
    if (!inmateId) return res.status(400).json({ error: 'inmateId is required' });

    const inmate = await Inmate.findOne({ inmateId });
    if (!inmate) return res.status(404).json({ error: 'Inmate not found' });

    if (inmate.cell && inmate.cell.toString() !== cell._id.toString()) {
      return res.status(400).json({ error: 'Inmate already assigned to another cell' });
    }

    if (cell.currentOccupancy >= cell.capacity) {
      return res.status(400).json({ error: 'Cell is full' });
    }

    if (inmate.cell && inmate.cell.toString() === cell._id.toString()) {
      return res.status(400).json({ error: 'Inmate already assigned to this cell' });
    }

    inmate.cell = cell._id;
    inmate.status = 'Active';
    await inmate.save();

    cell.inmates.push(inmate._id);
    cell.currentOccupancy += 1;
    cell.status = cell.currentOccupancy >= cell.capacity ? 'Full' : 'Available';
    await cell.save();

    res.json({ message: 'Inmate assigned successfully' });
  } catch (err) {
    next(err);
  }
};
