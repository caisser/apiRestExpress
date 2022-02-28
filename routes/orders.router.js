const express = require('express');

const OrdersService = require('../services/orders.service');
const validatorHandler = require('./../middleware/validator.handler');

const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');

const { checkRoles, checkApiKey } = require('./../middleware/auth.handler');

const router = express.Router();
const service = new OrdersService();

router.get('/', checkApiKey, async (req, res) => {
  const orders = await service.find();
  res.json(orders);
});

router.get(
  '/:id',
  checkApiKey,
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkApiKey,
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  checkApiKey,
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
