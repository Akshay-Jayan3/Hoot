const { dialog, app } = require('electron');

function selectFolder() {
  const window = BrowserWindow.getFocusedWindow();

  dialog.showOpenDialog(window, {
    title: 'Select a Folder with Music Files',
    properties: ['openDirectory'],
  })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const selectedFolder = result.filePaths[0];
        console.log('Selected folder:', selectedFolder);

        // You can call the scanMusicFiles function here, passing the selected folder path.
        // scanMusicFiles(selectedFolder);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
export default selectFolder;