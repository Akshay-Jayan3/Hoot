const { DataTypes } = require("sequelize");
const sequelize = require("../electron/sequelize"); // Import your Sequelize instance

const Artist = sequelize.define("Artist", {
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
  // Add more fields as needed
});

Artist.sync();

module.exports = Artist;
