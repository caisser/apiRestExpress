const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class CustomersService {
  async getCustomers() {
    const customers = await models.Customer.findAll({
      include: ['user'],
    });
    return customers;
  }

  async getCustomerById(id) {
    const customer = await models.Customer.findByPk(id, { include: ['user'] });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async createCustomer(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete newCustomer.user.dataValues.password;

    return newCustomer;
  }

  async updateCustomer(id, changes) {
    const customer = await this.getCustomerById(id);
    const response = await customer.update(changes);
    return response;
  }

  async deleteCustomer(id) {
    const customer = await this.getCustomerById(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomersService;
