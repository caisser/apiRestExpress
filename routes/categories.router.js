const express = require('express');
const passport = require('passport');

const CategoriesService = require('./../services/categories.service');
const validatorHandler = require('./../middleware/validator.handler');

const { checkRoles, checkApiKey } = require('./../middleware/auth.handler');

const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/category.schema');

const router = express.Router();
const categoriesService = new CategoriesService();

router.get('/', checkApiKey, async (req, res) => {
  const categories = await categoriesService.find();
  res.json(categories);
});

router.get(
  '/:id',
  checkApiKey,
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoriesService.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkApiKey,
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await categoriesService.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  checkApiKey,
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const category = await categoriesService.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  checkApiKey,
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await categoriesService.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
