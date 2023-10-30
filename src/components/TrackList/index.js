import React from "react";
import Track from "../Track";
import styles from "./styles.module.scss";
import ArtistList from "../ArtistList";

const TrackList = ({ tracks, HandleFile ,type}) => {
  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackNo}>
        <p>{tracks && tracks.length} {type==="track" ? "songs found":type ==="artist" ? "artists found" :null}</p>
      </div>
      {tracks && tracks?.length > 0
        ? tracks?.map((track, i) =>
            type === "track" ? (
              <Track track={track} key={i} HandleFile={HandleFile} />
            ) : type === "artist" ? (
              <ArtistList artist={track} HandleFile={HandleFile} key={i} />
            ) : (
              <></>
            )
          )
        : "no songs"}
    </div>
  );
};

export default TrackList;
