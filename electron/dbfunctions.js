const MusicMetadata = require('../models/MusicMetadataModel'); // Import your model

async function getMusicMetadata() {
  try {
    const metadata = await MusicMetadata.findAll();
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
