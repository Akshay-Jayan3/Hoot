const { DataTypes } = require("sequelize");
const sequelize = require("../electron/sequelize");
const MusicMetadata = require("./MusicMetadataModel");

const Favorite = sequelize.define("Favorite", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  musicItemId: {
    type: DataTypes.INTEGER, // Reference to the music item that was favorited
    allowNull: false,
  },
  // Add more fields as needed
});

Favorite.sync();
Favorite.belongsTo(MusicMetadata);

module.exports = Favorite;
