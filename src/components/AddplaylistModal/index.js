import React, { useState } from "react";
import styles from "./styles.module.scss";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const AddPlaylistModal = ({ showModal, closeModal, addPlaylist }) => {
    const [playlistName, setPlaylistName] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addPlaylist(playlistName);
      setPlaylistName("");
      closeModal();
    };
  
    return (
      <div className={styles.modal}>
        <div className={styles.modelContent}>
          <div className={styles.heading}>
            <h2>New Playlist</h2>
            <CancelOutlinedIcon fontSize="small" onClick={closeModal} className={styles.close}/>
          </div>
  
          <form onSubmit={handleSubmit} className={styles.playlistForm}>
            <label htmlFor="playlistName"></label>
            <input
              type="text"
              id="playlistName"
              name="playlistName"
              placeholder="New Playlist"
              value={playlistName}
              className={styles.playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              required
            />
            <div className={styles.btns}>
              <button type="submit" className={styles.btn} onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className={styles.btn}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  export default AddPlaylistModal;