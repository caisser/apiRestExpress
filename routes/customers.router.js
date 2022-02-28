const express = require('express');
const CustomersService = require('./../services/customers.service');
const validatorHandler = require('./../middleware/validator.handler');

const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('./../schemas/customer.schema');

const {
  checkRoles,
  checkApiKey,
} = require('./../middleware/auth.handler');

const router = express.Router();
const customersServide = new CustomersService();

router.get('/', checkApiKey, async (req, res) => {
  const customers = await customersServide.getCustomers();
  res.json(customers);
});

router.get(
  '/:id',
  checkApiKey,
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await customersServide.getCustomerById(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkApiKey,
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await customersServide.createCustomer(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  checkApiKey,
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const customer = await customersServide.updateCustomer(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  checkApiKey,
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await customersServide.deleteCustomer(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
