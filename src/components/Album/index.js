import React, { useContext } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import musicicon from "../../assects/musical-note.png"

const Album = ({ album, HandleFile, setSelectedAlbum ,count,type}) => {
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
        HandleFile();
        setSelectedAlbum(album);
      }}
    >
      <div className={styles.info}>
        <div className={styles.picture}>
          <img src={type === "Album" && album.CoverArt ? album.CoverArt:musicicon} />
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.details}>
            <p className={styles.artist}>{truncateText(album.name, 20)}</p>
            <p className={styles.count}>{truncateText(`${count} songs` , 20)}</p>
          </div>

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
