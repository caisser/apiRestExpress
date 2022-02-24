const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

// let URI = '';

// if (config.isProd) {
//   URI = config.dbUrl;
// } else {
//   const USER = encodeURIComponent(config.dbUser);
//   const PASSWORD = encodeURIComponent(config.dbPassword);
//   URI = `${config.dbEngine}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// }

const options = {
  dialect: config.dbEngine,
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

//sequelize.sync();

module.exports = sequelize;
