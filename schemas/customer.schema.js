//DTO or SCHEMA
const Joi = require('joi');

const { createUserSchema } = require('./user.schema');

const id = Joi.number().integer();
const name = Joi.string().alphanum().min(3).max(15);
const lastName = Joi.string().alphanum().min(3).max(15);
const phone = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: createUserSchema
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
