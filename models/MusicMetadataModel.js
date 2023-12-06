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

const PlaylistMusicMetadata = sequelize.define('PlaylistMusicMetadata', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  playlistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model:Playlist,
        key:'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
  },
  MusicMetadatumId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
        model:MusicMetadata,
        key:"id"
    }
  },
});
PlaylistMusicMetadata.sync()
MusicMetadata.sync()
Playlist.sync()

MusicMetadata.belongsToMany(Playlist, { through: PlaylistMusicMetadata });
Playlist.belongsToMany(MusicMetadata, { through: PlaylistMusicMetadata});



module.exports = {MusicMetadata,Playlist};

