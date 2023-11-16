const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const dbfunctions = require("./dbfunctions");
const {
  GET_ALL,
  GET_BY_ID,
  GET_BY_FIELD,
  ADD,
  DELETE_BY_ID,
  UPDATE_BY_ID,
} = require("./constants");
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

ipcMain.handle(DELETE_BY_ID, async (event, modelName, id, updatedData) => {
  try {
    const updatedEntity = await dbfunctions.updateById(
      modelName,
      id,
      updatedData
    );
    return updatedEntity.toJSON();
  } catch (error) {
    console.error(`Error updating ${modelName.name} by ID:`, error.message);
    throw error;
  }
});

ipcMain.handle(UPDATE_BY_ID, async (event, modelName, id) => {
  try {
    await dbfunctions.deleteById(modelName, id);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting ${modelName.name} by ID:`, error.message);
    throw error;
  }
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
