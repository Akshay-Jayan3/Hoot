// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs'); // Import fs at the top
const path = require('path'); // Import path at the top
const util = require('util'); // For promisify

// Promisify fs.readFile
const readFilePromise = util.promisify(fs.readFile);

const {
  GET_ALL,
  GET_BY_ID,
  GET_BY_FIELD,
  ADD,
  DELETE_BY_ID,
  UPDATE_BY_ID,
  SELECT_FOLDER,
  ADD_SONG_TO_PLAYLIST,
  REMOVE_SONG_FROM_PLAYLIST,
  DELETE_ALL,
  GET_SONGS_FROM_PLAYLIST
} = require("./constants");

contextBridge.exposeInMainWorld('electron', {
  selectFolder: () => ipcRenderer.invoke(SELECT_FOLDER),
  getallEntities:(modelName) => ipcRenderer.invoke(GET_ALL,modelName),
  getentityById:(modelName, id) => ipcRenderer.invoke(GET_BY_ID,modelName, id),
  getentityByField:(modelName, value) => ipcRenderer.invoke(GET_BY_FIELD,modelName, value),
  updateEntity:(modelName, id, updatedData) => ipcRenderer.invoke(UPDATE_BY_ID,modelName, id, updatedData),
  deleteEntity:(modelName,id) => ipcRenderer.invoke(DELETE_BY_ID,modelName,id),
  addentity:(modelName,data) => ipcRenderer.invoke(ADD,modelName,data),
  deleteAllentity:(modelName) => ipcRenderer.invoke(DELETE_ALL,modelName),
  getsongfromPlaylist:(modelName,modelName2) => ipcRenderer.invoke(GET_SONGS_FROM_PLAYLIST,modelName,modelName2),
  addsongtoPlaylist:(modelName,modelName2,playlistId,songId) => ipcRenderer.invoke(ADD_SONG_TO_PLAYLIST,modelName,modelName2,playlistId,songId),
  removeSongfromplaylist:(modelName,modelName2,playlistId,songId) => ipcRenderer.invoke(REMOVE_SONG_FROM_PLAYLIST,modelName,modelName2,playlistId,songId),
  
  // Filesystem and path utilities
  getStat: (filePath) => {
    try {
      const stats = fs.statSync(filePath);
      return {
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        // Add any other properties you need, e.g., size: stats.size
      };
    } catch (error) {
      console.error(`Error in getStat for ${filePath}:`, error);
      return null; 
    }
  },
  joinPath: (...args) => path.join(...args),
  basename: (filePath) => path.basename(filePath),
  readdirSync: (dirPath) => {
    try {
      return fs.readdirSync(dirPath);
    } catch (error) {
      console.error(`Error in readdirSync for ${dirPath}:`, error);
      return []; // Return empty array on error
    }
  },
  readFile: (filePath) => readFilePromise(filePath) // Expose the promisified version
});
