import React, { useContext } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { MainContext } from "../../context/MainContext";

const ArtistList = ({ artist, HandleFile }) => {
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
        <FavoriteBorderOutlinedIcon />
      </div>
    </div>
  );
};

export default ArtistList;
