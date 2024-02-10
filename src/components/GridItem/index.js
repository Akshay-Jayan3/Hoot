import React, { useContext } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import musicicon from "../../assects/note.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const GridItem = ({
  item,
  HandleFile,
  type,
  HandleAction,
  toggleFavoriteAlbums,
}) => {
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
        HandleFile(item);
      }}
    >
      <div className={styles.info}>
        <div className={styles.picture}>
          <img
            src={type === "Album" && item.CoverArt ? item.CoverArt : musicicon}
            alt="album art"
          />
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.details}>
            <p className={styles.artist}>{truncateText(item.name, 20)}</p>
          </div>

          <div>
            {type === "Album" ? (
              <button
                onClick={(e) => toggleFavoriteAlbums(e, item.id, item)}
                className={styles.btn}
              >
                {item.isFavorite ? (
                  <FavoriteIcon style={{ color: "#FFD700" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </button>
            ) : (
              <button
                onClick={(e) => HandleAction(e, item.id)}
                className={styles.btn}
              >
                <DeleteOutlineOutlinedIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* <div>more</div> */}
    </div>
  );
};

export default GridItem;
