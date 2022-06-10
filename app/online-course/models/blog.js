'use strict';

const Sequelize = require('sequelize');
const psqlCon = require('../connectors/psql');

const Blog = psqlCon.sequelize.define('blog', {
    // attributes
    id: { type: Sequelize.STRING, primaryKey: true },
    post_id: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING },
    category_id: { type: Sequelize.STRING },
    deskripsi: { type: Sequelize.STRING },

    created_at: { type: Sequelize.DATE },
    updated_at: { type: Sequelize.DATE },
}, {
    freezeTableName: true,
    tableName: 'blog',
    createdAt: false,
    updatedAt: false,
});


module.exports = {
    Blog
};

