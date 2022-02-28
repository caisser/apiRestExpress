const express = require('express');
const passport = require('passport');
const { checkApiKey } = require('./../middleware/auth.handler');
const validatorHandler = require('./../middleware/validator.handler');
const {
  loginSchema,
  recoverPasswordSchema,
  resetPasswordSchema,
} = require('../schemas/auth.schema');
const AuthService = require('../services/auth.service');

const router = express.Router();

const authService = new AuthService();

router.post(
  '/login',
  checkApiKey,
  validatorHandler(loginSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = await authService.signToken(user);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  checkApiKey,
  validatorHandler(recoverPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await authService.sendRecoveryMail(email);
      res.json({ message: response });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/change-password',
  checkApiKey,
  validatorHandler(resetPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await authService.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
