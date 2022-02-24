'use strict';

const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description);
    await queryInterface.addColumn(PRODUCT_TABLE, 'image', ProductSchema.image);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.removeColumn(PRODUCT_TABLE, 'description');
    await queryInterface.removeColumn(PRODUCT_TABLE, 'image');
  },
};
