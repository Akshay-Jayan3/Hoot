import React, { useContext } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { MainContext } from "../../context/MainContext";

const Track = ({ track, HandleFile }) => {
  const { updateLastPlayed } = useContext(MainContext);

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
        HandleFile(track);
        updateLastPlayed(track);
        localStorage.setItem("lastplayed", JSON.stringify(track));
      }}
    >
      <div className={styles.info}>
        <div className={styles.thumbnail}>
          <img src={track.picture} />
        </div>
        <div className={styles.titleArtist}>
          <p className={styles.title}>{truncateText(track?.title, 30)}</p>
          <p className={styles.artist}>{truncateText(track?.artist, 20)}</p>
        </div>
      </div>
      <div>
        <p>{truncateText(track?.album, 10)}</p>
      </div>
      <div>
        <FavoriteBorderOutlinedIcon />
      </div>
      {/* <div>more</div> */}
    </div>
  );
};

export default Track;
