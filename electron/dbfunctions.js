
const MusicPlaylist = require("../models/MusicMetadataModel");
const Artistdata = require("../models/ArtistModel");
const Albumdata = require("../models/AlbumModel");


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
     const addedData = addedSongs.map(song => song.get({ plain: true }));
    return addedData;
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

const addSongToPlaylist = async (modelName,modelName2, playlistId,songId) => {
 
  try {
    const Playlistmodel = getModelByName(modelName);
    const Songmodel = getModelByName(modelName2);
    if (!Songmodel || !Playlistmodel) {
      throw new Error(`Model not found`);
    }
    const song = await Songmodel.findByPk(songId);
    const playlist = await Playlistmodel.findByPk(playlistId);

    if (song && playlist) {
    
      const isSongInPlaylist = await playlist.hasMusicMetadata(song);

      if (!isSongInPlaylist) {
        
        await playlist.addMusicMetadata(song, { through: { playlistId } });
        console.log(`Song "${song.title}" added to playlist "${playlist.name}".`);
        return {song ,playlist};
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

const getAllPlaylists = async (modelName, modelName2) => {
  try {
    const PlaylistModel = getModelByName(modelName);
    const MusicMetadata = getModelByName(modelName2);

    if (!PlaylistModel || !MusicMetadata) {
      throw new Error(`Model not found`);
    }

    // Fetch all playlists with associated songs
    const playlists = await PlaylistModel.findAll({
      attributes: ['id', 'name','createdAt'],
      include: [{
        model: MusicMetadata,
        through: { attributes: [] },
      }],
    });

    // Serialize the data before returning
    const playlistsWithSongs = playlists.map(playlist => {
      const plainPlaylist = playlist.get({ plain: true });
      plainPlaylist.MusicMetadata = playlist.MusicMetadata.map(song => song.get({ plain: true }));
      return plainPlaylist;
    });

    return playlistsWithSongs;
  } catch (error) {
    console.error('Error getting all playlists:', error.message);
    throw error;
  }
};


function getModelByName(modelName) {
  switch (modelName) {
    case "Songs":
      return MusicPlaylist.MusicMetadata;
    case "Artists":
      return Artistdata;
    case "Albums":
      return Albumdata;
    case "Playlists":
      return MusicPlaylist.Playlist;
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
  getAllPlaylists,
  deleteAll
};
