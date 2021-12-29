const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {

  constructor () {
    this.users = [];
    this.generateUsersDB();
  }

  generateUsersDB() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        job: faker.name.jobTitle(),
        phone: faker.phone.phoneNumber(),
      });
    }
  }

  getUsers() {
    return this.users;
  }

  getUserById (id) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  createUser (data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  deleteUser (id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index,1);
    return { id };
  }

  updateUser (id, changes) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }

    return this.users[index];
  }

}

module.exports = UsersService;
