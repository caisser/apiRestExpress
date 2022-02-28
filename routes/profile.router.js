const express = require('express');
const passport = require('passport');
const OrdersService = require('../services/orders.service');

const router = express.Router();
const service = new OrdersService();

const { checkRoles, checkApiKey } = require('./../middleware/auth.handler');

router.get(
  '/my-orders',
  checkApiKey,
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {

      const orders = await service.findByUser(req.user.sub);
      res.status(200).json(orders);

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
