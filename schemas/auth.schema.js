const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string();

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoverPasswordSchema = Joi.object({
  email: email.required(),
});

const resetPasswordSchema = Joi.object({
  newPassword: password.required(),
  token: token.required(),
});

module.exports = { loginSchema, recoverPasswordSchema, resetPasswordSchema };
