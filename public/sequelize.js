const { app } = require('electron');
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs').promises;
const DB_FILENAME = 'Hoot.sqlite';
const DB_PATH = path.join(app.getPath('userData'), "CacheDB", DB_FILENAME);

async function deleteOldDatabase() {
  try {
    const oldDatabasePath = DB_PATH;
    await fs.access(oldDatabasePath);
    await fs.unlink(oldDatabasePath);
  } catch (error) {
    console.error('Error deleting directory:', error);
  }
}
async function createDir() {
  try {
    await deleteOldDatabase();
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
