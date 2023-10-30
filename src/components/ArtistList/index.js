import React, { useContext } from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const ArtistList = ({ artist, setSelectedMusicFile }) => {;
    console.log(artist)


  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        setSelectedMusicFile(artist);
        // updateLastPlayed(track);
        // localStorage.setItem("lastplayed", JSON.stringify(track));
      }}
    >
      <div className={styles.info}>
        <div className={styles.titleArtist}>
          
          <p className={styles.artist}>{artist}</p>
        </div>
      </div>
      <div>
        <FavoriteBorderOutlinedIcon />
      </div>
      {/* <div>more</div> */}
    </div>
  );
};

export default ArtistList;
