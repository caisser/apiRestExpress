'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model')
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(USER_TABLE);
    await queryInterface.drop(PRODUCT_TABLE);
  }
};
