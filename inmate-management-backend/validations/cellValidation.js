const Joi = require('joi');

const createCellSchema = Joi.object({
  cellNumber: Joi.string().required(),
  block: Joi.string().valid('A', 'B', 'C').required(),
  capacity: Joi.number().integer().min(1).required(),
  type: Joi.string().valid('Standard', 'Solitary').required(),
  status: Joi.string().valid('Available', 'Full', 'Empty', 'Maintenance').default('Empty'),
});

module.exports = { createCellSchema };
