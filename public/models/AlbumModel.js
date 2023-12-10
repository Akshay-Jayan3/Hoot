const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Import your Sequelize instance

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
    unique: true,
  },
  CoverArt: {
    type: DataTypes.STRING,
  },
  isFavorite:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

Album.sync();

module.exports = Album;
