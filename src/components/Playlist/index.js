import React, { useState } from "react";
import TrackList from "../TrackList";
import styles from "./styles.module.scss";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddPlaylistModal from "../AddplaylistModal";
const PlaylistSongs = ({selectedPlaylist}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [tracks, setTracks] = useState([
    { title: "Orinary Person" },
    { title: "Orinary Person" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      {showModal ? (
        <AddPlaylistModal closeModal={closeModal}/>
      ) : (
        <>
          <div className={styles.wrapper}>
            <div className={styles.details}>
              <div className={styles.content}>
                <p className={styles.name}>{selectedPlaylist.name}</p>
                <p className={styles.count}>created on {new Date(selectedPlaylist.createdAt).toLocaleDateString('en-GB')}</p>
              </div>
              <div className={styles.edit}>
                <button onClick={openModal}><EditOutlinedIcon/></button>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.btns}>
                <div className={styles.addSong}>
                  <button>
                    <AddCircleOutlineOutlinedIcon />
                  </button>
                </div>
                <div className={styles.delete}>
                  <button>
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </div>
                <div className={styles.favourite}>
                  <button>
                    <FavoriteBorderOutlinedIcon />
                  </button>
                </div>
              </div>

              <div className={styles.Btn}>
                {" "}
                <button className={styles.playpause}>
                  {isPlaying ? (
                    <PauseRoundedIcon />
                  ) : (
                    <PlayArrowRoundedIcon fontSize="large" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <TrackList tracks={tracks} type={"track"} />
        </>
      )}
    </div>
  );
};

export default PlaylistSongs;
