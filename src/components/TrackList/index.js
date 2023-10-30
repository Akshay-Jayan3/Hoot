import React from "react";
import Track from "../Track";
import styles from "./styles.module.scss";
import ArtistList from "../ArtistList";

const TrackList = ({ tracks, setSelectedMusicFile ,type}) => {
  console.log(tracks)
  console.log(type)
  return (
    <div className={styles.trackContainer}>
      <div className={styles.trackNo}><p>{tracks && tracks.length} songs found</p></div>
      {tracks && tracks?.length > 0
        ? tracks?.map((track, i) => (
          type==="track"?

            <Track
              track={track}
              key={i}
              setSelectedMusicFile={setSelectedMusicFile}
            />: type==="artist" ?<ArtistList artist={track}
            key={i}/>:<></>
          ))
        : "no songs"}
    </div>
  );
};

export default TrackList;
