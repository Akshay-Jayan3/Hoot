const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { Sequelize } = require('sequelize');
const isDev = require("electron-is-dev");
const path = require("path");

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
  const sequelize = new Sequelize({
    dialect: 'sqlite', // Use the appropriate database dialect
    storage: path.join(__dirname, '../db', 'music.sqlite')
  });
  
  // const User = require('./models/User')(sequelize);
  
  // Test the connection
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

  if (isDev) {
    win.loadURL("http://localhost:3000"); // When in development mode
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "build/index.html")); // Load the production build
  }
}

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
