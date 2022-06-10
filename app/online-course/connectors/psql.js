'use strict';

const Sequelize = require('sequelize');
const psqlConfig = require('../configs').psql;

function connectionConfig() {
  if (psqlConfig.ssl) {
    return {
      host: psqlConfig.host,
      port: psqlConfig.port,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
      },
    };
  }

  return {
    host: psqlConfig.host,
    port: psqlConfig.port,
    dialect: 'postgres',
  };
}

const sequelize = new Sequelize(psqlConfig.database, psqlConfig.user, psqlConfig.password, connectionConfig());

module.exports = {
  sequelize,
};
