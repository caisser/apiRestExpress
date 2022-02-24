const { Strategy } = require('passport-local');
const UsersService = require('../../../services/users.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const userService = new UsersService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
