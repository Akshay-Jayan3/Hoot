import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import Search from "../../components/Search";
import { MainContext } from "../../context/MainContext";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";
import StaticLoadingScreen from "../../components/StaticLoadingScreen";
import ListView from "../../components/ListView";
import { useTheme } from "../../context/ThemeContext";

const Artists = () => {
  const [metaData, setMetaData] = useState(null);
  const { updateNowPlaying } = useContext(MainContext);
  const [artists, setArtists] = useState(null);
  const { setAllSongs } = useContext(MainContext);
  const [showArtists, setShowArtist] = useState(false);
  const [filteredSongs, setfilteredSongs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { isRetroTheme } = useTheme();

  useEffect(() => {
    const promises = [
      cachemanager.getAllEntities(cacheEntities.SONGS),
      cachemanager.getAllEntities(cacheEntities.ARTISTS),
    ];
    Promise.all(promises)
      .then(([songsRes, artistRes]) => {
        setIsLoading(false);
        if (songsRes) {
          setMetaData(songsRes.data);
        }

        if (artistRes) {
          setArtists(artistRes.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const HandleSelectArtist = (artist) => {
    setfilteredSongs(metaData?.filter((song) => song.artist === artist.name));
    setShowArtist(!showArtists);
    setAllSongs(metaData?.filter((song) => song.artist === artist.name));
  };

  const performSearch = (value) => {
    setSearchString(value);
    setFilteredData(
      showArtists && filteredSongs
        ? filteredSongs.filter((item) =>
            item?.title?.toLowerCase().includes(value.toLowerCase())
          )
        : artists.filter((item) =>
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
      {isLoading && (isRetroTheme ? <StaticLoadingScreen /> : <LoadingScreen message={"Loading ..."} />)}
      {isRetroTheme ? <div className="songs-container">
        {!showArtists ? (
          <ListView
            tracks={
              searchString && searchString !== "" ? filteredData : artists
            }
            HandleFile={HandleSelectArtist}
            type={"artist"}
          />
        ) : (
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
      </div> : <div className="Songspage">
        <div className="mainsection">
          <Search
            showback={showArtists}
            HandleBack={HandleSelectArtist}
            onChange={performSearch}
            value={searchString}
            placeholder={
              showArtists
                ? "Search your favourite Songs"
                : "Search your favourite Artists"
            }
          />
          <Header
            heading={"Discover the Maestros"}
            description={
              "Dive into the world of musical genius with your favorite artists"
            }
          />

          <div className="songs-container">
            {!showArtists ? (
              <ListView
                tracks={
                  searchString && searchString !== "" ? filteredData : artists
                }
                HandleFile={HandleSelectArtist}
                type={"artist"}
              />
            ) : (
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
      }
    </>
  );
};

export default Artists;
