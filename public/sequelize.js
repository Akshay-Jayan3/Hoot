const { app } = require('electron');
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs').promises;
const DB_FILENAME = 'AirtuneMusic.sqlite';
const DB_PATH = path.join(app.getPath('userData'), "CacheDB", DB_FILENAME);


async function createDir() {
  try {
    await fs.mkdir(DB_PATH, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }
}

createDir();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_PATH,
});
sequelize.sync();

// Handle database connection errors
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
