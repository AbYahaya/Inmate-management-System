const Inmate = require('../models/Inmate');
const { createInmateSchema } = require('../validations/inmateValidation');

exports.listInmates = async (req, res, next) => {
  try {
    const inmates = await Inmate.find().populate('cell', 'cellNumber');
    res.json(inmates);
  } catch (err) {
    next(err);
  }
};

exports.createInmate = async (req, res, next) => {
  try {
    const { error, value } = createInmateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existing = await Inmate.findOne({ inmateId: value.inmateId });
    if (existing) return res.status(400).json({ error: 'Inmate ID already exists' });

    const inmate = new Inmate(value);
    await inmate.save();
    res.status(201).json(inmate);
  } catch (err) {
    next(err);
  }
};
