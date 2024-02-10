import React from "react";
import Track from "../Track";
import styles from "./styles.module.scss";
import ArtistList from "../ArtistList";
import norecord from "../../assects/nofile.png";

const ListView = ({
  tracks,
  type,
  toggleFavorite,
  HandleFile,
  AddtoPlaylist,
  RemoveFromPlaylist,
  playlistDetails,
  selectedPlaylist,
  toggleFavoriteArtists,
  count,
}) => {
  return (
    <div className={styles.trackContainer}>
      {tracks?.length > 0 && (
        <div className={styles.trackNo}>
          <p>
            {tracks && tracks?.length}{" "}
            {type === "track"
              ? "songs found"
              : type === "artist"
              ? "artists found"
              : null}
          </p>
        </div>
      )}

      {tracks && tracks?.length > 0 ? (
        tracks?.map((track, i) =>
          type === "track" ? (
            <Track
              track={track}
              key={i}
              toggleFavorite={toggleFavorite}
              AddtoPlaylist={AddtoPlaylist}
              RemoveFromPlaylist={RemoveFromPlaylist}
              playlistDetails={playlistDetails}
              selectedPlaylist={selectedPlaylist}
              count={count}
            />
          ) : type === "artist" ? (
            <ArtistList artist={track} key={i} HandleFile={HandleFile} toggleFavoriteArtists={toggleFavoriteArtists}/>
          ) : (
            <></>
          )
        )
      ) : (
        <div className={styles.notfound}>
          <img src={norecord} alt="no file found" />
          <p>no records found</p>
        </div>
      )}
    </div>
  );
};

export default ListView;
