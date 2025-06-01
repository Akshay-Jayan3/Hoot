const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");
const path = require("path");
const dbfunctions = require("./dbfunctions");
const log = require('electron-log');
const {
  GET_ALL,
  GET_BY_ID,
  GET_BY_FIELD,
  ADD,
  DELETE_BY_ID,
  DELETE_ALL,
  UPDATE_BY_ID,
  ADD_SONG_TO_PLAYLIST,
  REMOVE_SONG_FROM_PLAYLIST,
  GET_SONGS_FROM_PLAYLIST
} = require("./constants");

// Configure logging
log.transports.file.level = 'info';
autoUpdater.logger = log;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon:path.join(__dirname, "/favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  

  if (isDev) {
    win.loadURL("http://localhost:3000"); // When in development mode
    win.webContents.openDevTools();
  } else {
    win.loadURL(`file://${path.join(__dirname, "../build/index.html")}`); // Load the production build
  }

  // Check for updates after the window is created
  autoUpdater.checkForUpdatesAndNotify();
}

app.on("ready", () => {
  createWindow();
});

autoUpdater.on('update-available', () => {
  log.info('Update available.');
  // Optionally, notify the user via a dialog or a custom UI element
  // dialog.showMessageBox({
  //   type: 'info',
  //   title: 'Update Available',
  //   message: 'A new version of Hoot is available. It will be downloaded in the background.',
  // });
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  log.info('Update downloaded; will install now');
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on('error', (err) => {
  log.error('Error in auto-updater. ' + err);
  // Optionally, notify the user that an error occurred
  // dialog.showErrorBox('Update Error', 'Failed to update the application. Please try again later.');
});

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    title: "Select a Folder with Music Files",
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }

  return null;
});

ipcMain.handle(GET_ALL, async (event, modelName) => {
  try {
    const entities = await dbfunctions.getAll(modelName);
    return entities.map((item) => item.toJSON());
  } catch (error) {
    console.error(`Error getting ${modelName.name}:`, error.message);
    throw error;
  }
});

ipcMain.handle(GET_BY_ID, async (event, modelName, id) => {
  try {
    const entity = await dbfunctions.getById(modelName, id);
    return entity ? entity.toJSON() : null;
  } catch (error) {
    console.error(`Error getting ${modelName.name} by ID:`, error.message);
    throw error;
  }
});

ipcMain.handle(GET_BY_FIELD, async (event, modelName, field, value) => {
  try {
    const entity = await dbfunctions.getByField(modelName, field, value);
    return entity ? entity.toJSON() : null;
  } catch (error) {
    console.error(`Error getting ${modelName.name} by field:`, error.message);
    throw error;
  }
});

ipcMain.handle(GET_SONGS_FROM_PLAYLIST, async (event, modelName, modelName2) => {
  try {
    const songs = await dbfunctions.getAllPlaylists(modelName, modelName2);
    console.log(songs)
    return songs; // Returning the result directly
  } catch (error) {
    console.error(`Error getting ${modelName.name} by field:`, error.message);
    throw error;
  }
});


ipcMain.handle(ADD, async (event, modelName, data) => {
  try {
    const addedEntity = await dbfunctions.add(modelName, data);
    return {
      status: 'S',
      data: addedEntity,
      message: 'Entity added successfully',
    };
  } catch (error) {
    console.error(`Error adding ${modelName.name}:`, error);
    throw error;
  }
});

ipcMain.handle(ADD_SONG_TO_PLAYLIST, async (event, modelName,modelName2 ,playlistId,songId) => {
  try {
    const addedEntity = await dbfunctions.addSongToPlaylist(modelName, modelName2 ,playlistId,songId);
    return {
      status: 'S',
      data: {song:addedEntity.song,playlist:addedEntity.playlist},
      message: `Song "${addedEntity.song.title}" added to playlist "${addedEntity.playlist.name}".`,
    };
  } catch (error) {
    console.error(`Error adding ${modelName.name}:`, error);
    throw error;
  }
});

ipcMain.handle(REMOVE_SONG_FROM_PLAYLIST, async (event, modelName,modelName2 ,playlistId,songId) => {

  try {
    const removedEntity = await dbfunctions.removeSongFromPlaylist(modelName, modelName2 ,playlistId,songId);
    console.log(removedEntity,)
    return {
      status: 'S',
      data: {song:removedEntity.song,playlist:removedEntity.playlist},
      message: `Song "${removedEntity.song.title}" remove from  playlist "${removedEntity.playlist.name}".`,
    };
  } catch (error) {
    console.error(`Error deleting ${modelName.name}:`, error);
    throw error;
  }
});

ipcMain.handle(UPDATE_BY_ID, async (event, modelName, id, updatedData) => {
  try {
    const updatedEntity = await dbfunctions.updateById(
      modelName,
      id,
      updatedData
    );
    return {
      status: 'S',
      data: updatedEntity,
      message: 'Entity updated successfully',
    };
  } catch (error) {
    console.error(`Error updating ${modelName.name} by ID:`, error.message);
    throw error;
  }
});

ipcMain.handle(DELETE_BY_ID, async (event, modelName, id) => {
  try {
    await dbfunctions.deleteById(modelName, id);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting ${modelName.name} by ID:`, error.message);
    throw error;
  }
});

ipcMain.handle(DELETE_ALL, async (event, modelName) => {
  try {
    await dbfunctions.deleteAll(modelName);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting ${modelName.name} by ID:`, error.message);
    throw error;
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
