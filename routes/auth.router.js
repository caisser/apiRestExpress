const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config').config;
const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const secret = jwtSecret;

      const payload = {
        sub: user.id,
        role: user.role,
      };

      const token = jwt.sign(payload, secret);

      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
