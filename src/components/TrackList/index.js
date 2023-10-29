import React from "react";
import Track from "../Track";
import styles from "./styles.module.scss";

const TrackList = ({ tracks, setSelectedMusicFile }) => {
  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackNo}><p>{tracks && tracks.length} songs found</p></div>
      {tracks && tracks.length > 0
        ? tracks?.map((track, i) => (
            <Track
              track={track}
              key={i}
              setSelectedMusicFile={setSelectedMusicFile}
            />
          ))
        : "no songs"}
    </div>
  );
};

export default TrackList;
