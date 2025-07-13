const Visitor = require('../models/Visitor');
const Inmate = require('../models/Inmate');
const { createVisitorSchema } = require('../validations/visitorValidation');

exports.listVisitors = async (req, res, next) => {
  try {
    const visitors = await Visitor.find().populate('inmate', 'inmateId firstName lastName');
    res.json(visitors);
  } catch (err) {
    next(err);
  }
};

exports.createVisitor = async (req, res, next) => {
  try {
    const { error, value } = createVisitorSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const inmate = await Inmate.findOne({ inmateId: value.inmateId });
    if (!inmate) return res.status(404).json({ error: 'Inmate not found' });

    const visitor = new Visitor({
      visitorName: value.visitorName,
      visitorId: value.visitorId,
      inmate: inmate._id,
      visitDate: value.visitDate,
      visitTime: value.visitTime,
      duration: value.duration,
      relationship: value.relationship,
      purpose: value.purpose,
      notes: value.notes,
      status: value.status,
    });

    await visitor.save();
    res.status(201).json(visitor);
  } catch (err) {
    next(err);
  }
};
