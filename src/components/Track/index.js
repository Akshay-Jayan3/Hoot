import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MainContext } from "../../context/MainContext";
import { AudioContext } from "../../context/AudioContext";
import { Audio } from "react-loader-spinner";
import ScrollingText from "../ScrollingText";

const Track = ({
  track,
  toggleFavorite,
  playlistDetails,
  AddtoPlaylist,
  RemoveFromPlaylist,
  selectedPlaylist,
}) => {
  const { updateLastPlayed, updateNowPlaying, nowplaying } =
    useContext(MainContext);
  const { isPlaying } = useContext(AudioContext);


  return (
    <div
      className={`${styles.wrapper} ${
        nowplaying.id === track.id && styles.animateborder
      }`}
      onClick={() => {
        updateNowPlaying(track);
        updateLastPlayed(track);
        localStorage.setItem("lastplayed", JSON.stringify(track));
      }}
    >
      <div className={styles.info}>
        <div className={styles.thumbnail}>
          {nowplaying.id === track.id && isPlaying ? (
            <Audio
              height="20"
              width="20"
              radius="9"
              color="#FFD700"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          ) : (
            <img src={track.picture} alt="cover art"/>
          )}
        </div>
        <div className={styles.titleArtist}>
          <ScrollingText scroll={nowplaying.id === track.id}>
            <p style={{ color: nowplaying.id === track.id && "#FFD700" }} title={track?.title}>
              {nowplaying.id === track.id
                ? track?.title
                : track?.title}
            </p>
          </ScrollingText>
          <p className={styles.artist} title={track?.artist}>
            {track?.artist}
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={(e) => toggleFavorite(e, track.id, track)}
          className={`${styles.favouriteBtn}`}
        >
          {track.isFavorite ? (
            <FavoriteIcon style={{ color: "#FFD700" }} />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </button>
      </div>
      {playlistDetails && (
        <div>
          <button
            onClick={(e) =>
              AddtoPlaylist(e, playlistDetails?.playlistId, track.id)
            }
            className={`${styles.addPlaylist}`}
          >
            <AddCircleOutlineOutlinedIcon />
          </button>
        </div>
      )}
      {selectedPlaylist && (
        <div>
          <button
            onClick={(e) =>
              RemoveFromPlaylist(e, selectedPlaylist?.id, track.id)
            }
            className={`${styles.addPlaylist}`}
          >
            <RemoveCircleOutlineOutlinedIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Track;
