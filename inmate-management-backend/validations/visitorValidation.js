const Joi = require('joi');

const createVisitorSchema = Joi.object({
  visitorName: Joi.string().required(),
  visitorId: Joi.string().allow(''),
  inmateId: Joi.string().required(),
  visitDate: Joi.date().required(),
  visitTime: Joi.string().required(),
  duration: Joi.string().allow(''),
  relationship: Joi.string().required(),
  purpose: Joi.string().allow(''),
  notes: Joi.string().allow(''),
  status: Joi.string().valid('Completed', 'In-progress', 'Cancelled').default('Completed'),
});

module.exports = { createVisitorSchema };
