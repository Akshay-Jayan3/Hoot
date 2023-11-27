import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";
const Favourites = () => {
  const { nowplaying, updateNowPlaying } = useContext(MainContext);
  const [metaData, setMetadData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(metaData);
  useEffect(() => {
    cachemanager
      .getAllEntities(cacheEntities.SONGS)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          setMetadData(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredSongs = metaData?.filter((song) => song.isFavorite);

  const toggleFavorite = (event, trackId, track, nowplaying) => {
    event.stopPropagation();
    cachemanager
      .updateEntityById(cacheEntities.SONGS, trackId, {
        ...track,
        isFavorite: !track.isFavorite,
      })
      .then(() => {
        if (nowplaying) {
          updateNowPlaying({ ...track, isFavorite: !track.isFavorite });
        }
        setMetadData((prevTracks) =>
          prevTracks.map((prevTrack) =>
            prevTrack.id === trackId
              ? { ...prevTrack, isFavorite: !prevTrack.isFavorite }
              : prevTrack
          )
        );
      })
      .catch((error) => console.error("Error editing:", error));
  };

  return (
    <>
      {isLoading && <LoadingScreen message={"Loading ..."} />}
      <div className="Songspage">
        <div className="mainsection">
          <Search />
          <Header
            heading={"Music For You"}
            description={"Listen to your favourite songs"}
          />

          <div className="songs-container">
            {filteredSongs && filteredSongs.length > 0 ? (
              <TrackList
                tracks={filteredSongs}
                type={"track"}
                toggleFavorite={toggleFavorite}
              />
            ) : (
              <p>no songs</p>
            )}
          </div>
        </div>
        <div className="currentMusic">
          <div className="musicCard">
            <AudioPlayer
              selectedMusicFile={nowplaying}
              AllSongs={filteredSongs}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourites;
