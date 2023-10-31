const { DataTypes } = require('sequelize');
const sequelize = require('../electron/sequelize'); // Import your Sequelize instance

const Track = sequelize.define('Tracks', {
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  album: DataTypes.STRING,
  path: DataTypes.STRING,
  duration: DataTypes.INTEGER,
  release_year: DataTypes.INTEGER,
  genre: DataTypes.STRING,
  picture: DataTypes.STRING,
});

// Define Album model
const Album = sequelize.define('Album', {
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  release_year: DataTypes.INTEGER,
  cover_art: DataTypes.STRING,
});

// Define Artist model
const Artist = sequelize.define('Artist', {
  name: DataTypes.STRING,
  bio: DataTypes.TEXT,
  website: DataTypes.STRING,
});

// Define Favorites model
const Favorites = sequelize.define('Favorites', {
  // Associations for user_id and track_id
});

// Define Playlists model
const Playlists = sequelize.define('Playlists', {
  name: DataTypes.STRING,
  // User association
});

// Define PlaylistTracks model
const PlaylistTracks = sequelize.define('PlaylistTracks', {
  // Associations for playlist_id and track_id
});

// Define associations between models;
Track.belongsToMany(Playlists, { through: PlaylistTracks });
Playlists.belongsToMany(Track, { through: PlaylistTracks });

// Synchronize the models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database and tables are synchronized.');
}).catch((err) => {
  console.error('Error synchronizing the database:', err);
});

// Export your models for use in your application
module.exports = {
  Track,
  Album,
  Artist,
  Favorites,
  Playlists,
  PlaylistTracks,
};