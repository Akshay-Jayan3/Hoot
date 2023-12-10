import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";

const AddPlaylistModal = ({
  showModal,
  closeModal,
  setPlaylist,
  playlistDetails,
}) => {
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    if (playlistDetails && playlistDetails.name) {
      setPlaylistName(playlistDetails.name);
    }
  }, [playlistDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlistDetails) {
      cachemanager
        .updateEntityById(cacheEntities.PLAYLISTS, playlistDetails.id,
          { name: playlistName })
        .then((res) => {
          console.log(res.data)
          setPlaylistName("");
          closeModal();
          setPlaylist((prevTracks) =>
            prevTracks.map((prevTrack) =>
              prevTrack.id === playlistDetails.id
                ? { ...prevTrack, name: res.data.name }
                : prevTrack
            )
          );
          setPlaylist((prevTracks) => [
            ...prevTracks,
            { id: res.data.id, name: res.data.name },
          ]);
        })
        .catch((error) => closeModal());
    } else {
      cachemanager
        .addEntity(cacheEntities.PLAYLISTS, [{ name: playlistName }])
        .then((res) => {
          setPlaylistName("");
          closeModal();
          setPlaylist((prevTracks) => [
            ...prevTracks,
            { id: res.data[0].id, name: res.data[0].name },
          ]);
        })
        .catch((error) => closeModal());
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modelContent}>
        <div className={styles.heading}>
          <h2>New Playlist</h2>
          <CancelOutlinedIcon
            fontSize="small"
            onClick={closeModal}
            className={styles.close}
          />
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
