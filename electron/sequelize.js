const { Sequelize } = require('sequelize');

// Load the configuration based on the current environment
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  // Other options such as logging, pool, etc.
});

module.exports = sequelize;
