import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlaylistAddCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCircleOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MainContext } from "../../context/MainContext";
import { Audio } from "react-loader-spinner";
import ScrollingText from "../ScrollingText";

const Track = ({ track, toggleFavorite, playlistDetails, AddtoPlaylist }) => {
  const { updateLastPlayed, updateNowPlaying, nowplaying, isPlaying } =
    useContext(MainContext);

  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div
      className={`${styles.wrapper} ${nowplaying.id === track.id && styles.animateborder}`}
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
              color="#ff09d4"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          ) : (
            <img src={track.picture} />
          )}
        </div>
        <div className={styles.titleArtist}>
          <ScrollingText
            text={track?.title}
            scroll={nowplaying.id === track.id}
          />
          <p className={styles.artist} title={track?.artist}>
            {truncateText(track?.artist, 50)}
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={(e) => toggleFavorite(e, track.id, track)}
          className={`${styles.favouriteBtn}`}
        >
          {track.isFavorite ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </button>
      </div>
      {playlistDetails && (
        <div>
          <button
            onClick={(e) => AddtoPlaylist(e,playlistDetails?.playlistId, track.id)}
            className={`${styles.addPlaylist}`}
          >
            <PlaylistAddCircleOutlinedIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Track;
