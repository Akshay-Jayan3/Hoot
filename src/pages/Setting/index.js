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

var jsmediatags = window.jsmediatags;

const Settings = () => {
  const { updateFolder } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const selectFolder = async () => {
    try {
      const folderSelected = await window.electron.selectFolder();
      const fs = window.electron.fs;
      const path = window.electron.path;

      if (folderSelected) {
        setIsLoading(true);
        updateFolder(folderSelected);
        localStorage.setItem("selected-folder", folderSelected);
        fs.readdir(folderSelected, (err, files) => {
          if (err) {
            console.error(err);
            return;
          }
          let metadata = [];
          let fileCount = 0;
          let imgUrl;
          const musicFiles = files.filter((file) => {
            return /\.(mp3|wav)$/.test(file);
          });

          musicFiles.forEach((fileName) => {
            const filePath = path.join(folderSelected, fileName);
            fs.readFile(filePath, (err, data) => {
              if (err) {
                // Handle file read error if needed
              } else {
                const file = new File([data], fileName, { type: "audio/mpeg" });
                jsmediatags.read(file, {
                  onSuccess: function (tag) {
                    if (tag.tags) {
                      if (tag.tags.picture) {
                        const { data, format } = tag.tags.picture;

                        if (data) {
                          let base64String = "";
                          for (let i = 0; i < data.length; i++) {
                            base64String += String.fromCharCode(data[i]);
                          }
                          imgUrl = `data:${format};base64,${window.btoa(
                            base64String
                          )}`;
                        }
                      }

                      const filedata = {
                        title: tag.tags.title,
                        album: tag.tags.album,
                        artist: tag.tags.artist,
                        picture: imgUrl,
                        path: `file:///${folderSelected}\\${fileName}`,
                      };
                      metadata.push(filedata);
                    }
                    fileCount++;
                    if (fileCount === musicFiles.length) {
                      Promise.all([
                        cachemanager
                          .addEntity(cacheEntities.SONGS, metadata)
                          .then((res) => console.log(res))
                          .catch((error) => console.error(error)),

                        cachemanager
                          .addEntity(
                            cacheEntities.ALBUMS,
                            metadata.map((item) => ({
                              name: item.album,
                              CoverArt: item.picture,
                            }))
                          )
                          .then((res) => console.log(res))
                          .catch((error) => console.error(error)),

                        cachemanager
                          .addEntity(
                            cacheEntities.ARTISTS,
                            metadata.map((item) => ({ name: item.artist }))
                          )
                          .then((res) => console.log(res))
                          .catch((error) => console.error(error)),
                      ])
                        .then(() => {
                          setIsLoading(false);
                          handleShowToast();
                          navigate("/");
                          console.log(
                            "All cache operations completed successfully."
                          );
                        })
                        .catch((error) => {
                          setIsLoading(false);
                          console.error(
                            "Error in one or more cache operations:",
                            error
                          );
                        });
                    }
                  },
                  onError: function (error) {
                    console.log(":(", error.type, error.info);
                  },
                });
              }
            });
          });
        });
      }
    } catch (error) {
      console.error(error);
      console.log(
        "Oops! Something went wrong while scanning songs. Please try again."
      );
    }
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen
          message={
            "Discovering your music collection. Just a few more moments!"
          }
          setting={true}
        />
      )}
      {showToast && (
        <CustomToast
          message="Songs scanned successfully !"
          onClose={handleCloseToast}
        />
      )}
      <>
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
                Please select the folder where you keep your music files. Once
                you've chosen your music folder, we'll organize your songs and
                make them accessible for you.
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
      </>
    </>
  );
};

export default Settings;
