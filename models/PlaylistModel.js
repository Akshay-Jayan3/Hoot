const { DataTypes } = require("sequelize");
const sequelize = require("../electron/sequelize");
const MusicMetadata = require("./MusicMetadataModel"); // Import the MusicMetadata model

const Playlist = sequelize.define("Playlist", {
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
});
Playlist.sync()
// Define a many-to-many relationship with MusicMetadata
Playlist.belongsToMany(MusicMetadata, { through: "PlaylistMusicMetadata" });

module.exports = Playlist;
