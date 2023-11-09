const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const dbfunctions = require('./dbfunctions');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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
    win.loadFile(path.join(__dirname, "build/index.html")); // Load the production build
  }
}

ipcMain.on('getMusicMetadata', async (event) => {
  try {
    const metadata = await database.getMusicMetadata();
    event.reply('musicMetadata', metadata);
  } catch (error) {
    event.reply('musicMetadata', []);
  }
});
ipcMain.on('getArtist', async (event) => {
  try {
    const metadata = await database.getArtist();
    event.reply('musicMetadata', metadata);
  } catch (error) {
    event.reply('musicMetadata', []);
  }
});
ipcMain.on('getAlbum', async (event) => {
  try {
    const metadata = await database.getAlbum();
    event.reply('musicMetadata', metadata);
  } catch (error) {
    event.reply('musicMetadata', []);
  }
});

ipcMain.on('getFavorite', async (event) => {
  try {
    const metadata = await database.getFavorite();
    event.reply('musicMetadata', metadata);
  } catch (error) {
    event.reply('musicMetadata', []);
  }
});

ipcMain.on('getPlaylist', async (event) => {
  try {
    const metadata = await database.getPlaylist();
    event.reply('musicMetadata', metadata);
  } catch (error) {
    event.reply('musicMetadata', []);
  }
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

app.on("ready", createWindow);

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