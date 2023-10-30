import React from "react";
import styles from "./styles.module.scss";
import Album from "../Album";

const AlbumList = ({ albums, HandleFile}) => {
  return (
    <div
      className={styles.AlbumContainer}
      onClick={() => {
        HandleFile();
        // updateLastPlayed(track);
        // localStorage.setItem("lastplayed", JSON.stringify(track));
      }}
    >
      {albums && albums?.length > 0
        ? albums?.map((album, i) => <Album album={album} />)
        : "no songs"}
    </div>
  );
};

export default AlbumList;
