const MusicMetadata = require('../models/MusicMetadataModel');
const Artistdata = require('../models/ArtistModel'); 
const Albumdata = require('../models/AlbumModel'); 
const Favouritedata = require('../models/FavoriteModel'); 
const Playlistdata = require('../models/PlaylistModel'); 

async function getMusicMetadata() {
  try {
    const metadata = await MusicMetadata.findAll();
    return metadata;
  } catch (error) {
    throw error;
  }
}
async function getArtist() {
  try {
    const artistData = await Artistdata.findAll();
    return artistData;
  } catch (error) {
    throw error;
  }
}
async function getAlbum() {
  try {
    const albumData = await Albumdata.findAll();
    return albumData;
  } catch (error) {
    throw error;
  }
}
async function getFavorite() {
  try {
    const favouriteData = await Favouritedata.findAll();
    return favouriteData;
  } catch (error) {
    throw error;
  }
}
async function getPlaylist() {
  try {
    const playlistData = await Playlistdata.findAll();
    return playlistData;
  } catch (error) {
    throw error;
  }
}


// Define other database-related functions as needed

module.exports = {
  getMusicMetadata,
  getArtist,
  getAlbum,
  getFavorite,
  getPlaylist
  // Export other functions here
};
