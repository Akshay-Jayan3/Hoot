import React, { useState, useEffect, useContext } from "react";
import TrackList from "../TrackList";
import styles from "./styles.module.scss";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import AddPlaylistModal from "../AddplaylistModal";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { AudioContext } from "../../context/AudioContext";
import CustomToast from "../ToastMessage";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
const PlaylistSongs = ({
  selectedPlaylist,
  AddtoPlaylist,
  songs,
  showToast,
  handleCloseToast,
  RemoveFromPlaylist,
}) => {
  const { updateNowPlaying, setAllSongs } = useContext(MainContext);
  const { isPlaying, setIsPlaying } = useContext(AudioContext);

  const HandlePlayback = () => {
    setIsPlaying(!isPlaying);
    updateNowPlaying(songs[0]);
    setAllSongs(songs);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", {
      state: {
        playlistDetails: {
          playlistId: selectedPlaylist.id,
          PlaylistName: selectedPlaylist.name,
        },
      },
    });
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showToast && (
        <CustomToast
          message="Removed from playlist"
          onClose={handleCloseToast}
        />
      )}
      <div className={styles.container}>
        {showModal ? (
          <AddPlaylistModal
            closeModal={closeModal}
            playlistDetails={selectedPlaylist}
          />
        ) : (
          <>
            <div className={styles.wrapper}>
              <div className={styles.details}>
                <div className={styles.content}>
                  <p className={styles.name}>{selectedPlaylist.name}</p>
                  <p className={styles.count}>
                    created on{" "}
                    {new Date(selectedPlaylist.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
                <div className={styles.edit}>
                  <button onClick={openModal}>
                    <EditOutlinedIcon />
                  </button>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.btns}>
                  <div>
                    <button className={styles.btn} onClick={handleClick}>
                      Add songs{" "}
                      <AddCircleOutlineOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </div>

                <div className={styles.Btn}>
                  {" "}
                  <button className={styles.playpause} onClick={HandlePlayback}>
                    {isPlaying ? (
                      <PauseRoundedIcon />
                    ) : (
                      <PlayArrowRoundedIcon fontSize="large" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <TrackList
              tracks={songs}
              type={"track"}
              selectedPlaylist={selectedPlaylist}
              AddtoPlaylist={AddtoPlaylist}
              RemoveFromPlaylist={RemoveFromPlaylist}
              count={songs?.length}
            />
          </>
        )}
      </div>
    </>
  );
};

export default PlaylistSongs;
