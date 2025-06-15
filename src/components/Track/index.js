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
import { useTheme } from "../../context/ThemeContext";

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
   const { theme, dynamicTheme } = useTheme();

  if (!track) {
    return null;
  }

  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div
      className={`${styles.wrapper} ${
        nowplaying?.id === track?.id && styles.animateborder
      }`}
      onClick={() => {
        updateNowPlaying(track);
        updateLastPlayed(track);
        localStorage.setItem("lastplayed", JSON.stringify(track));
      }}
    >
      <div className={styles.info}>
        <div className={styles.thumbnail}>
          {nowplaying?.id === track?.id && isPlaying ? (
            <Audio
              height="20"
              width="20"
              radius="9"
              color={dynamicTheme?.accent || theme?.accent || "#FFC916"}
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          ) : (
            <img src={track?.picture} alt="cover art"/>
          )}
        </div>
        <div className={styles.titleArtist}>
          <ScrollingText scroll={nowplaying?.id === track?.id}>
            <p style={{ color: nowplaying?.id === track?.id ? dynamicTheme?.accent || theme?.accent || "#FFC916" :"#fff"}}>
              {track?.title}
            </p>
          </ScrollingText>
          <p className={styles.artist} title={track?.artist}>
            {truncateText(track?.artist, 50)}
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={(e) => toggleFavorite(e, track?.id, track)}
          className={`${styles.favouriteBtn}`}
        >
          {track?.isFavorite ? (
            <FavoriteIcon style={{ color: dynamicTheme?.accent || theme?.accent || "#FFC916" }} />

          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </button>
      </div>
      {playlistDetails && (
        <div>
          <button
            onClick={(e) =>
              AddtoPlaylist(e, playlistDetails?.playlistId, track?.id)
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
              RemoveFromPlaylist(e, selectedPlaylist?.id, track?.id)
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
