'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const Course = psqlCon.sequelize.define('courses', {
  // attributes
  id: { type: Sequelize.STRING, primaryKey: true },
  user_id: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  excerpt: { type: Sequelize.STRING },
  learn_summary: { type: Sequelize.STRING },
  requirement: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },

  created_at: { type: Sequelize.DATE },
  updated_at: { type: Sequelize.DATE },
}, {
  freezeTableName: true,
  tableName: 'courses',
  createdAt: false,
  updatedAt: false,
});


module.exports = {
  Course
};

