'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const Category = psqlCon.sequelize.define('categories', {
  // attributes
  id: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING },
}, {
  freezeTableName: true,
  tableName: 'categories',
  createdAt: false,
  updatedAt: false,
});


module.exports = {
  Category
};

