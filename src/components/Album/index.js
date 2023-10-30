import React, { useContext } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Album = ({ album, HandleFile }) => {
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + "...";
        }
        return text;
      }

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        HandleFile();
        // updateLastPlayed(track);
        // localStorage.setItem("lastplayed", JSON.stringify(track));
      }}
    >
      <div className={styles.info}>
        <div className={styles.picture}>
          <img src={album.thumbnail} />
        </div>
        <div className={styles.details}>
          <p className={styles.artist}>{truncateText(album.album,20)}</p>
          <div>
            <FavoriteBorderOutlinedIcon />
          </div>
        </div>
      </div>

      {/* <div>more</div> */}
    </div>
  );
};

export default Album;
