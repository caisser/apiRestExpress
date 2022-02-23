// const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersService {
  // constructor () {
  //   this.users = [];
  //   this.generateUsersDB();
  //   // this.pool = pool;
  //   // this.pool.on('error', (err) => console.log(err));
  // }

  // generateUsersDB() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.users.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.name.firstName(),
  //       job: faker.name.jobTitle(),
  //       phone: faker.phone.phoneNumber(),
  //     });
  //   }
  // }

  async getUsers() {
    const response = await models.User.findAll({ include: ['customer'] });
    return response;
  }

  async getUserById(id) {
    const user = await models.User.findByPk(id, { include: ['customer'] });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async createUser(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async updateUser(id, changes) {
    const user = await this.getUserById(id);
    const response = await user.update(changes);
    return response;
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
