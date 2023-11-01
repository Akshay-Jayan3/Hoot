const { DataTypes } = require("sequelize");
const sequelize = require("../electron/sequelize"); // Import your Sequelize instance

const Album = sequelize.define("Album", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CoverArt: {
    type: DataTypes.STRING,
  },
  // Add more fields as needed
});

Album.sync();

module.exports = Album;
