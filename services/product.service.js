// const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {

  // constructor(){
  //   this.products = [];
  //   this.generate();
  // }

  // generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.imageUrl(),
  //       isBlocked: faker.datatype.boolean()
  //     });
  //   }
  // }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const response = await models.Product.findAll();
    return response;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product){
      throw boom.notFound('Product not found');
    } else if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const response = await product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;
