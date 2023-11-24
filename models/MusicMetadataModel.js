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
    unique: true,
  },
  artist: {
    type: DataTypes.STRING,
  },
  album: {
    type: DataTypes.STRING,
  },
  path: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING, 
  },
  isFavorite:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
  
});


MusicMetadata.sync();



module.exports = MusicMetadata;
