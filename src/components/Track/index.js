import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MainContext } from "../../context/MainContext";
import { Audio } from "react-loader-spinner";

const Track = ({ track, toggleFavorite }) => {
  const { updateLastPlayed, updateNowPlaying } = useContext(MainContext);
  const [selectedSong, setSelectedSong] = useState("");

  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        updateNowPlaying(track);
        updateLastPlayed(track);
        setSelectedSong(track);
        localStorage.setItem("lastplayed", JSON.stringify(track));
      }}
    >
      <div className={styles.info}>
        <div className={styles.thumbnail}>
          {selectedSong === track ? (
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
          <p className={selectedSong === track ? styles.selected : styles.title}>
            {truncateText(track?.title, 30)}
          </p>
          <p className={styles.artist}>{truncateText(track?.artist, 20)}</p>
        </div>
      </div>
      <div>
        <p>{truncateText(track?.album, 10)}</p>
      </div>
      <div>
        <button
          onClick={(e) => toggleFavorite(e, track.id, track)}
          className={`${styles.favouriteBtn} ${
            track.isFavorite ? styles.favorite : ""
          }`}
        >
          {track.isFavorite ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderOutlinedIcon style={{ color: "#fff" }} />
          )}
        </button>
      </div>
      {/* <div>more</div> */}
    </div>
  );
};

export default Track;
