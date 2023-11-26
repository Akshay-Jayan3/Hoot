
const MusicMetadata = require("../models/MusicMetadataModel");
const Artistdata = require("../models/ArtistModel");
const Albumdata = require("../models/AlbumModel");
const Favouritedata = require("../models/FavoriteModel");
const Playlistdata = require("../models/PlaylistModel");

async function getAll(modelName) {
  const model = getModelByName(modelName);
  return model.findAll();
}

async function getById(modelName, id) {
  const model = getModelByName(modelName);
  return model.findByPk(id);
}

async function getByField(modelName, field, value) {
  const model = getModelByName(modelName);
  const query = {};
  query[field] = value;
  return model.findOne({ where: query });
}

async function add(modelName, data) {
  try {
    const model = getModelByName(modelName);
    if (!model) {
      throw new Error(`Model not found for ${modelName}`);
    }

    const addedSongs = await model.bulkCreate(data, { ignoreDuplicates: true });
    console.log(`Added ${addedSongs.length} songs to the database.`);
    return addedSongs;
  } catch (error) {
    console.error(`Error adding entity for ${modelName}:`, error.message);
    throw error;
  }
}


async function updateById(modelName, id, updatedData) {
  const model = getModelByName(modelName);
  const instance = await model.findByPk(id);
  if (!instance) {
    throw new Error(`${model.name} not found`);
  }

  return instance.update(updatedData);
}

async function deleteById(modelName, id) {
  const model = getModelByName(modelName);
  const instance = await model.findByPk(id);
  if (!instance) {
    throw new Error(`${model.name} not found`);
  }

  return instance.destroy();
}
async function deleteAll(modelName) {
  const model = getModelByName(modelName);

  // Delete all records from the table
  return model.destroy({
    where: {}, 
    truncate: true, 
  });
}

const addSongToPlaylist = async (modelName,modelName2,songId, playlistId) => {
 
  try {
    const Songmodel = getModelByName(modelName);
    const Playlistmodel = getModelByName(modelName2);
    if (!Songmodel || !Playlistmodel) {
      throw new Error(`Model not found`);
    }
    const song = await Songmodel.findByPk(songId);
    const playlist = await Playlistmodel.findByPk(playlistId);

    if (song && playlist) {
    
      const isSongInPlaylist = await playlist.hasSongs(song);

      if (!isSongInPlaylist) {
        
        await playlist.addSongs(song);
        console.log(`Song "${song.title}" added to playlist "${playlist.name}".`);
        return song;
      } else {
        console.log(`Song "${song.title}" is already in playlist "${playlist.name}".`);
        return null; // Song is already in the playlist
      }
    } else {
      throw new Error('Song or playlist not found.');
    }
  } catch (error) {
    console.error('Error adding song to playlist:', error.message);
    throw error;
  }
};

// Example: Get songs from a playlist
const getSongsFromPlaylist = async (modelName,playlistId) => {
  try {
    const model = getModelByName(modelName);
    if (!model) {
      throw new Error(`Model not found for ${modelName}`);
    }
    const playlist = await model.findByPk(playlistId, {
      include: Song,
    });

    if (playlist) {
      return playlist.Songs;
    } else {
      throw new Error('Playlist not found.');
    }
  } catch (error) {
    console.error('Error getting songs from playlist:', error.message);
    throw error;
  }
};


function getModelByName(modelName) {
  switch (modelName) {
    case "Songs":
      return MusicMetadata;
    case "Artists":
      return Artistdata;
    case "Albums":
      return Albumdata;
    case "Favourites":
      return Favouritedata;
    case "Playlists":
      return Playlistdata;
    default:
      throw new Error(`Model ${modelName} not recognized`);
  }
}

module.exports = {
  getAll,
  getById,
  getByField,
  add,
  updateById,
  deleteById,
  addSongToPlaylist,
  getSongsFromPlaylist,
  deleteAll
};
