// models/MusicMetadata.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MusicMetadata = sequelize.define('MusicMetadata', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.FLOAT, // Store duration in seconds as a floating-point number
    },
  });

  // Define associations with other models, if necessary
  // For example, if you have a separate "Genre" model and want to associate it with music tracks:
  // MusicMetadata.belongsTo(models.Genre, {
  //   foreignKey: 'genreId',
  //   as: 'genre',
  // });

  return MusicMetadata;
};
