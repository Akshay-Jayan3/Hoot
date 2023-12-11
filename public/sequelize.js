const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const consts = require('./constants');
const DBSOURCE = consts.DB_PATH;

const dirPath =consts.APP_CACHE_DIR;

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
} 


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DBSOURCE,
});

module.exports = sequelize;
