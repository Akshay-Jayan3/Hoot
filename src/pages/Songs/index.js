import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";
const Songs = () => {
  const { nowplaying, updateNowPlaying } = useContext(MainContext);
  const [metadData, setMetadData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const res = await cachemanager.getAllEntities(cacheEntities.SONGS);
        setMetadData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchMetaData();
  }, []);

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
    {isLoading && <LoadingScreen message={"Loading ..."}/>}
      <div className="Songspage">
        <div className="mainsection">
          <Search />
          <Header
            heading={"Music For You"}
            description={"Listen to your favourite songs"}
          />

          <div className="songs-container">
            {metadData && metadData.length > 0 ? (
              <TrackList
                tracks={metadData}
                type={"track"}
                toggleFavorite={toggleFavorite}
              />
            ) : (
              <p>No songs found</p>
            )}
          </div>
        </div>
        <div className="currentMusic">
          <div className="musicCard">
            <AudioPlayer
              selectedMusicFile={nowplaying}
              AllSongs={metadData}
              toggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Songs;
