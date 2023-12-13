import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";
import ListView from "../../components/ListView";
const Favourites = () => {
  const { updateNowPlaying } = useContext(MainContext);
  const [metaData, setMetaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    cachemanager
      .getAllEntities(cacheEntities.SONGS)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          setMetaData(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredSongs = metaData?.filter((song) => song.isFavorite);
  const performSearch = (value) => {
    setSearchString(value);
    setFilteredData(
      filteredSongs.filter((item) =>
        item?.title?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

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
        setMetaData((prevTracks) =>
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
          <Search
            onChange={performSearch}
            value={searchString}
            placeholder={"Search your favourite Songs"}
          />
          <Header
            heading={"Heartbeats Collection"}
            description={"Your personal sanctuary of beloved songs"}
          />

          <div className="songs-container">
            {filteredSongs && filteredSongs.length > 0 && (
              <ListView
                tracks={
                  searchString && searchString !== ""
                    ? filteredData
                    : filteredSongs
                }
                type={"track"}
                toggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </div>
        <div className="currentMusic">
          <div className="musicCard">
            <AudioPlayer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourites;
