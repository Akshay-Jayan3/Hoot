import React, { useContext, useState } from "react";
import MusicPlayer from "../AudioPlayer/index";
import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

const FolderSelection = () => {
  const {updateFolder} = useContext(MainContext)
  const navigate = useNavigate()
  const [musicFiles, setMusicFiles] = useState([]);
  const [selectedMusicFile, setSelectedMusicFile] = useState("");
  const [selectedFolder, setselectedFolder] = useState("");

  const selectFolder = async () => {
    try {
      const folderSelected = await window.electron.selectFolder();
      const fs = window.electron.fs;
      if (folderSelected) {
        setselectedFolder(folderSelected);
        updateFolder(folderSelected)
        localStorage.setItem("selected-folder", folderSelected);
        navigate('/')
        fs.readdir(folderSelected, (err, files) => {
          if (err) {
            console.error(err);
          } else {
            const musicFiles = files.filter((file) => {
              // Filter files with allowed extensions (e.g., .mp3, .wav)
              return /\.(mp3|wav)$/.test(file);
            });
            setMusicFiles(musicFiles);
          }
        });

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className ={styles.selectButton} onClick={selectFolder}>Select Folder <FolderOpenOutlinedIcon /></button>
      {selectedFolder && (
          <div className="selected-folder">
            <p>Selected Folder:</p>
            <span>{selectedFolder}</span>
          </div>
        )}
      {/* <ul>
        {musicFiles.map((file, index) => (
          <>
            <li key={index}>{file}</li>
            <button
              onClick={() =>
                setSelectedMusicFile(`file:///${selectedFolder}\\${file}`)
              }
            >
              Select
            </button>
          </>
        ))}
      </ul> */}
      {/* <div>
        <MusicPlayer selectedMusicFile={selectedMusicFile} />
      </div> */}
    </div>
  );
};

export default FolderSelection;
