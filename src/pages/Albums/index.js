import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import GridView from "../../components//GridView";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";
import ListView from "../../components/ListView";
import { MainContext } from "../../context/MainContext";

const Albums = () => {
  const [metaData, setMetaData] = useState(null);
  const { updateNowPlaying } = useContext(MainContext);
  const [albums, setAlbums] = useState(null);
  const { setAllSongs } = useContext(MainContext);
  const [showAlbums, setShowAlbums] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const promises = [
      cachemanager.getAllEntities(cacheEntities.SONGS),
      cachemanager.getAllEntities(cacheEntities.ALBUMS),
    ];
    Promise.all(promises)
      .then(([songsRes, albumsRes]) => {
        setIsLoading(false);
        if (songsRes) {
          setMetaData(songsRes.data);
        }

        if (albumsRes) {
          setAlbums(albumsRes.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredSongs = selectedAlbum
    ? metaData?.filter((song) => song.album === selectedAlbum.name)
    : metaData;

  const HandleSelectAlbum = () => {
    setShowAlbums(!showAlbums);
    setAllSongs(filteredSongs);
  };

  const performSearch = (value) => {
    setSearchString(value);
    setFilteredData(
      showAlbums && filteredSongs
        ? filteredSongs.filter((item) =>
            item?.title?.toLowerCase().includes(value.toLowerCase())
          )
        : albums.filter((item) =>
            item?.name?.toLowerCase().includes(value.toLowerCase())
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
            showback={showAlbums}
            HandleBack={HandleSelectAlbum}
            onChange={performSearch}
            value={searchString}
            placeholder={
              showAlbums
                ? "Search your favourite Songs"
                : "Search your favourite Albums"
            }
          />
          <Header
            heading={"Albums Extravaganza"}
            description={
              "Dive into a world of musical stories with your favourite curated albums"
            }
          />

          <div className="songs-container">
            {!showAlbums
              ? albums &&
                albums?.length > 0 && (
                  <GridView
                    items={
                      searchString && searchString !== ""
                        ? filteredData
                        : albums
                    }
                    HandleFile={HandleSelectAlbum}
                    HandleSelected={setSelectedAlbum}
                    type={"Album"}
                  />
                )
              : filteredSongs &&
                filteredSongs?.length > 0 && (
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

export default Albums;
