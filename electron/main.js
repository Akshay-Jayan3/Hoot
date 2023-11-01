const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const sqlite3 = require("sqlite3").verbose();
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
  const dbPath = path.join(__dirname, '../db', 'music.sqlite');
  console.log(dbPath)
  let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
      console.log("Connected to the SQLite database.");
      db.run(
        `CREATE TABLE IF NOT EXISTS metadata (
          id INTEGER PRIMARY KEY,
          title TEXT,
          artist TEXT,
          album TEXT,
          filePath TEXT
        )`,
        (err) => {
          if (err) {
            console.log("Table creation error: ", err);
          } else {
            console.log("Table created successfully.");
          }
        }
      );
    }
    // const newData = {
    //   title: 'Sample Song',
    //   artist: 'Sample Artist',
    //   album: 'Sample Album',
    //   filePath: '/path/to/sample-song.mp3', // Replace with the actual file path
    // };
    
    // // Insert the data into the 'metadata' table
    // db.run(
    //   'INSERT INTO metadata (title, artist, album, filePath) VALUES (?, ?, ?, ?)',
    //   [newData.title, newData.artist, newData.album, newData.filePath],
    //   (err) => {
    //     if (err) {
    //       console.error('Error inserting data:', err.message);
    //     } else {
    //       console.log('Data inserted successfully.');
    //     }
    //   }
    // );
    
    
    db.all("SELECT * FROM metadata", (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Data from the "metadata" table:', rows);
      }
    });
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
