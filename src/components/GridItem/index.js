import React, { useContext } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import musicicon from "../../assects/musical-note.png"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const GridItem = ({ item, HandleFile, HandleSelected ,type,HandleAction }) => {
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
        HandleSelected(item);
      }}
    >
      <div className={styles.info}>
        <div className={styles.picture}>
          <img src={type === "Album" && item.CoverArt ? item.CoverArt:musicicon} alt="album art"/>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.details}>
            <p className={styles.artist}>{truncateText(item.name, 20)}</p>
          </div>

          <div>
            <button onClick ={(e)=>HandleAction(e,item.id)} className={styles.btn}>{type === "Album" ? <FavoriteBorderOutlinedIcon />:<DeleteOutlineOutlinedIcon/>}</button>
          </div>
        </div>
      </div>

      {/* <div>more</div> */}
    </div>
  );
};

export default GridItem;
