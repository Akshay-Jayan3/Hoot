const { Track, Album, Artist, Favorites, Playlists, PlaylistTracks } = require('../models/Models'); // Import your model

async function getMusicMetadata() {
  try {
    const metadata = await Track.findAll();
    return metadata;
  } catch (error) {
    throw error;
  }
}

// Define other database-related functions as needed

module.exports = {
  getMusicMetadata,
  // Export other functions here
};
