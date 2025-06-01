import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import Header from "../../components/Header";
import LoadingScreen from "../../components/Loader";
import CustomToast from "../../components/ToastMessage";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/Sidebar";

var jsmediatags = window.jsmediatags;

const Settings = () => {
  const { updateFolder } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [message, setMessage] = useState("");

  const handleShowToast = (message) => {
    setMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const selectFolder = async () => {
    try {
      const folderSelected = await window.electron.selectFolder();
      // const fs = window.electron.fs; // Removed
      // const path = window.electron.path; // Removed
  
      if (folderSelected) {
        setIsLoading(true);
        updateFolder(folderSelected);
        localStorage.setItem("selected-folder", folderSelected);
  
        // Recursive function to get all files in folder + subfolders
        const getAllFiles = (dirPath) => {
          let localArrayOfFiles = [];
          const files = window.electron.readdirSync(dirPath);
  
          files.forEach((file) => {
            const fullPath = window.electron.joinPath(dirPath, file);
            const statInfo = window.electron.getStat(fullPath);
  
            if (statInfo && statInfo.isDirectory) {
              localArrayOfFiles = localArrayOfFiles.concat(getAllFiles(fullPath));
            } else if (statInfo && statInfo.isFile) {
              localArrayOfFiles.push(fullPath);
            }
          });
  
          return localArrayOfFiles;
        };
  
        // Get all files recursively
        const allFiles = getAllFiles(folderSelected);
  
        // Filter only music files
        const musicFiles = allFiles.filter((file) =>
          /\.(mp3|wav|flac|aac|ogg|m4a)$/i.test(file)
        );
        
  
        if (musicFiles.length === 0) {
          setIsLoading(false);
          handleShowToast("Oops! No music files found");
          return;
        }
  
        let metadata = [];
        let fileCount = 0;
  
        // musicFiles.forEach((filePath) => { // Old loop
        //  fs.readFile(filePath, (err, data) => { // Old readFile
        for (const filePath of musicFiles) { // New loop for async readFile
          try {
            const data = await window.electron.readFile(filePath); // Changed
            const fileName = window.electron.basename(filePath); // Changed
            const file = new File([data], fileName, { type: "audio/mpeg" });
  
            // jsmediatags.read is synchronous in its success/error callbacks, 
            // so we'll wrap it in a promise to use await properly in the loop.
            const tag = await new Promise((resolve, reject) => {
              jsmediatags.read(file, {
                onSuccess: resolve,
                onError: reject
              });
            });
            
            let imgUrl = null;
            if (tag.tags) {
              if (tag.tags.picture) {
                const { data: picData, format } = tag.tags.picture;
                if (picData) {
                  let base64String = "";
                  for (let i = 0; i < picData.length; i++) {
                    base64String += String.fromCharCode(picData[i]);
                  }
                  imgUrl = `data:${format};base64,${window.btoa(base64String)}`;
                }
              }
  
              metadata.push({
                title: tag.tags.title,
                album: tag.tags.album,
                artist: tag.tags.artist,
                picture: imgUrl,
                path: encodeURI(`file:///${filePath.replace(/\\/g, "/")}`),
              });
            }
            fileCount++;

          } catch (error) {
            console.log("Error processing file:", filePath, error);
            // Decide if you want to show a toast for individual file errors or just log
            // For now, let's just log and continue, but increment fileCount to avoid hanging.
            // handleShowToast(`Error processing ${window.electron.basename(filePath)}`);
            fileCount++; // Ensure fileCount increments even on error to finish the loop condition
          }
        } // End of for...of loop

        if (fileCount === musicFiles.length) {
          if (metadata.length === 0 && musicFiles.length > 0) {
            setIsLoading(false);
            handleShowToast(
              "Found music files, but could not read metadata from any."
            );
            return;
          } else if (metadata.length === 0 && musicFiles.length === 0) {
            // This case is already handled earlier
          }

          Promise.all([
            cachemanager.addEntity(cacheEntities.SONGS, metadata),
            cachemanager.addEntity(
              cacheEntities.ALBUMS,
              metadata.map((item) => ({
                name: item.album,
                CoverArt: item.picture,
              }))
            ),
            cachemanager.addEntity(
              cacheEntities.ARTISTS,
              metadata.map((item) => ({ name: item.artist }))
            ),
          ])
            .then(() => {
              setIsLoading(false);
              handleShowToast("Songs scanned successfully!");
              setTimeout(() => {
                navigate("/");
              }, 1000);
            })
            .catch((error) => {
              setIsLoading(false);
              console.error("Cache operation error:", error);
              handleShowToast(
                "Something went wrong. Please try again later."
              );
            });
        }
      }
    } catch (error) {
      console.error(error);
      handleShowToast(
        "Oops! Something went wrong while scanning songs. Please try again."
      );
    }
  };
  

  return (
    <>
      {isLoading && 
        <LoadingScreen
          message={
            "Discovering your music collection. Just a few more moments!"
          }
          setting={true}
        />
      }
      {showToast && (
        <CustomToast
          message={message}
          onClose={handleCloseToast}
          right={true}
        />
      )}
      <>
        <>
          <div
            className="container"
            style={{
              background: theme.background,
              color: theme.textColor,
              transition: "background-color 0.3s ease",
            }}
          >
            <div class="sidebar-container">
              <Sidebar />
            </div>
            <div class="main-content">
              <div className="page">
                <Header
                  heading={"Settings"}
                  description={"Customize Your Experience"}
                />
                <div className="section">
                  <div className="setting-type">
                    <SettingsSuggestOutlinedIcon />
                    <h2>General Settings</h2>
                  </div>

                  <div className="setting">
                    <p>
                      Please select the folder where you keep your music files.
                      Once you've chosen your music folder, we'll organize your
                      songs and make them accessible for you.
                    </p>
                    <button className="selectButton" onClick={selectFolder}>
                      Select Folder <FolderOpenOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                  <div className="setting-type">
                    <SettingsSuggestOutlinedIcon />
                    <h2>Theme</h2>
                  </div>
                  <div className="setting">
                    <p>Customize your view, your way !</p>
                    <div className="theme">
                      <p>Enable dark mode</p>
                      <button
                        className={`theme-toggle-btn ${
                          theme?.themeMode === "dark" ? "dark" : ""
                        }`}
                        onClick={toggleTheme}
                      >
                        <div className="toggle-indicator"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </>
  );
};

export default Settings;
