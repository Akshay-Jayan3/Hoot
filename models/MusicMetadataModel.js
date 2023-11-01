const { DataTypes } = require('sequelize');
const sequelize = require('../electron/sequelize');

const MusicMetadata = sequelize.define('MusicMetadata', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
  },
  album: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.INTEGER, // Store duration in seconds, for example
  },
  // Add more fields as needed
});

// Create the table if it doesn't exist
MusicMetadata.sync();



module.exports = MusicMetadata;
