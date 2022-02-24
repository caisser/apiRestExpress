const { config } = require('../config/config.js');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `${config.dbEngine}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  dev: {
    url: config.dbUrl,
    dialect: config.dbEngine,
  },
  production: {
    url: config.dbUrl,
    dialect: config.dbEngine,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
