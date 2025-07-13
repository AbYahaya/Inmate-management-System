const Joi = require('joi');

const createInmateSchema = Joi.object({
  inmateId: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  age: Joi.number().integer().min(0).required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  offense: Joi.string().required(),
  admissionDate: Joi.date().required(),
  sentenceLength: Joi.string().allow(''),
  emergencyContact: Joi.string().allow(''),
  emergencyPhone: Joi.string().allow(''),
  notes: Joi.string().allow(''),
  status: Joi.string().valid('Active', 'Released', 'Transferred').required(),
});

module.exports = { createInmateSchema };
