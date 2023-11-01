// In a separate file, e.g., PlaylistMusicMetadata.js
const { DataTypes } = require('sequelize');
const sequelize = require('../electron/sequelize');
const MusicMetadata= require('./MusicMetadataModel')
const Playlist =  require('./PlaylistModel')

const PlaylistMusicMetadata = sequelize.define('PlaylistMusicMetadata', {
  playlistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model:Playlist,
        key:'id'
    }
  },
  musicMetadataId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model:MusicMetadata,
        key:"id"
    }
  },
});

module.exports = PlaylistMusicMetadata;
