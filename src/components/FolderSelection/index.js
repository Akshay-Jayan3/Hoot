import React, { useContext, useState } from "react";
import styles from "./styles.module.scss"; 
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import * as cachemanager from '../../cacheStore/index'
import { cacheEntities } from "../../cacheStore/cacheEntities";

var jsmediatags = window.jsmediatags;

const FolderSelection = () => {
  const { updateFolder} = useContext(MainContext);
  const navigate = useNavigate();
  const notify = () => {
    toast.success('Folder selected successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    })};

  const selectFolder = async () => {
    try {
      const folderSelected = await window.electron.selectFolder();
      const fs = window.electron.fs;
      const path = window.electron.path;

      if (folderSelected) {
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
                      if( tag.tags.picture){
                        const {data,format} = tag.tags.picture;
                      
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
                        cachemanager.addEntity(cacheEntities.SONGS, metadata)
                          .then((res) => console.log(res))
                          .catch((error) => console.error(error)),
                      
                        cachemanager.addEntity(cacheEntities.ALBUMS, metadata.map((item) => ({ name: item.album, CoverArt: item.picture })))
                          .then((res) => console.log(res))
                          .catch((error) => console.error(error)),
                      
                        cachemanager.addEntity(cacheEntities.ARTISTS, metadata.map((item) => ({name:item.artist})))
                          .then((res) => console.log(res))
                          .catch((error) => console.error(error)),
                      ])
                        .then(() => {
                          notify()
                          console.log('All cache operations completed successfully.');
                        })
                        .catch((error) => {
                          console.error('Error in one or more cache operations:', error);
                        });
                      
                      // updateAlbums(metadata.map((item)=>({name:item.album,coverArt:item.picture})))
                      // updateArtists(metadata.map((item)=>(item.artist)))
                      // localStorage.setItem(
                      //   "AllSongs",
                      //   JSON.stringify(metadata)
                      // );
                    }
                  },
                  onError: function (error) {
                    console.log(":(", error.type, error.info);
                  },
                });
              }
            });
          });
          // // localStorage.setItem('AllSongs', JSON.stringify(metadata));
          // updateMetadata(metadata);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className={styles.selectButton} onClick={selectFolder}>
        Select Folder <FolderOpenOutlinedIcon />
      </button>
    </div>
  );
};

export default FolderSelection;
