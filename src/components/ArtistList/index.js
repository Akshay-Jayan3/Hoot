import React, { useContext } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ArtistList = ({ artist, HandleFile, toggleFavoriteArtists }) => {
  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        HandleFile(artist);
      }}
    >
      <div className={styles.info}>
        <div className={styles.titleArtist}>
          <p className={styles.artist}>{artist.name}</p>
        </div>
      </div>
      <div>
        <button
          onClick={(e) => toggleFavoriteArtists(e, artist.id, artist)}
          className={styles.btn}
        >
          {artist.isFavorite ? (
            <FavoriteIcon style={{ color: "#FFD700" }} />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </button>
      </div>
    </div>
  );
};

export default ArtistList;
