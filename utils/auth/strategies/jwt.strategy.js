const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');
const UsersService = require('../../../services/users.service')

const usersService = new UsersService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await usersService.getUserById(payload.sub);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = JwtStrategy;
