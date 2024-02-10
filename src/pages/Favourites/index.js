import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";
import ListView from "../../components/ListView";
import Tab from "../../components/Tab";
import GridView from "../../components//GridView";
const Favourites = () => {
  const { updateNowPlaying, setAllSongs } = useContext(MainContext);
  const [filteredSongs, setfilteredSongs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("Songs");
  const [metaData, setMetaData] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [showAlbums, setShowAlbums] = useState(false);
  const [filteredSongsfromAlbum, setFilteredSongsfromAlbum] = useState(null);
  const [artists, setArtists] = useState(null);
  const [showArtists, setShowArtist] = useState(false);
  const [filteredSongsFromArtist, setFilteredSongsFromArtist] = useState(null);

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
  useEffect(() => {
    cachemanager
      .getAllEntities(cacheEntities.SONGS)
      .then((res) => {
        setIsLoading(false);
        if (res) {
          setfilteredSongs(res.data?.filter((song) => song.isFavorite));
          setAllSongs(res.data?.filter((song) => song.isFavorite));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    cachemanager
      .getAllEntities(cacheEntities.ALBUMS)
      .then((albumsRes) => {
        setIsLoading(false);
        if (albumsRes) {
          setAlbums(albumsRes.data?.filter((album) => album.isFavorite));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    cachemanager
      .getAllEntities(cacheEntities.ARTISTS)
      .then((artistRes) => {
        setIsLoading(false);
        if (artistRes) {
          setArtists(artistRes.data?.filter((artist) => artist.isFavorite));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const HandleSelectAlbum = (album) => {
    setFilteredSongsfromAlbum(
      metaData?.filter((song) => song.album === album.name)
    );
    setShowAlbums(!showAlbums);
    setAllSongs(metaData?.filter((song) => song.album === album.name));
  };

  const HandleSelectArtist = (artist) => {
    setFilteredSongsFromArtist(
      metaData?.filter((song) => song.artist === artist.name)
    );
    setShowArtist(!showArtists);
    setAllSongs(metaData?.filter((song) => song.artist === artist.name));
  };

  const performSearch = (value) => {
    setSearchString(value);

    switch (activeTab) {
      case "Songs":
        setFilteredData(
          filteredSongs.filter((item) =>
            item?.title?.toLowerCase().includes(value.toLowerCase())
          )
        );
        break;
      case "Albums":
        setFilteredData(
          showAlbums && filteredSongsfromAlbum
            ? filteredSongsfromAlbum.filter((item) =>
                item?.title?.toLowerCase().includes(value.toLowerCase())
              )
            : albums.filter((item) =>
                item?.name?.toLowerCase().includes(value.toLowerCase())
              )
        );
        break;
      case "Artists":
        setFilteredData(
          showAlbums && filteredSongsFromArtist
            ? filteredSongsFromArtist.filter((item) =>
                item?.title?.toLowerCase().includes(value.toLowerCase())
              )
            : artists.filter((item) =>
                item?.name?.toLowerCase().includes(value.toLowerCase())
              )
        );
        break;
      default:
        break;
    }
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
        setfilteredSongs((prevTracks) =>
        prevTracks.filter((prevTrack) => prevTrack.id !== trackId)
        );
      })
      .catch((error) => console.error("Error editing:", error));
  };
  const toggleFavoriteAlbums = (event, albumId, album) => {
    event.stopPropagation();
    cachemanager
      .updateEntityById(cacheEntities.ALBUMS, albumId, {
        ...album,
        isFavorite: !album.isFavorite,
      })
      .then(() => {
        setAlbums((prevAlbums) =>
        prevAlbums.filter((prevAlbum) => prevAlbum.id !== albumId)
        );
      })
      .catch((error) => console.error("Error editing:", error));
  };
  const toggleFavoriteArtists = (event, artistId, artist) => {
    event.stopPropagation();
    cachemanager
      .updateEntityById(cacheEntities.ARTISTS, artistId, {
        ...artist,
        isFavorite: !artist.isFavorite,
      })
      .then(() => {
        setArtists((prevArtists) =>
        prevArtists.filter((prevArtist) => prevArtist.id !== artistId)
        )
      })
      .catch((error) => console.error("Error editing:", error));
  };

  return (
    <>
      {isLoading && <LoadingScreen message={"Loading ..."} />}
      <div className="Songspage">
        <div className="mainsection">
          <Search
            showback={showAlbums || showArtists}
            HandleBack={
              showAlbums
                ? HandleSelectAlbum
                : showArtists
                ? HandleSelectArtist
                : null
            }
            onChange={performSearch}
            value={searchString}
            placeholder={
              showAlbums | (activeTab === "Albums")
                ? "Search your favourite Albums"
                : showArtists | (activeTab === "Artists")
                ? "Search your favourite Artists"
                : "Search your favourite Songs"
            }
          />
          <Header
            heading={"Heartbeats Collection"}
            description={"Your personal sanctuary of beloved songs"}
          />
          <div className="tabWrapper">
            <Tab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabName={"Songs"}
            />
            <Tab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabName={"Albums"}
            />
            <Tab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabName={"Artists"}
            />
          </div>

          <div className="songs-container">
            {activeTab === "Songs" ? (
              <ListView
                tracks={
                  searchString && searchString !== ""
                    ? filteredData
                    : filteredSongs
                }
                type={"track"}
                toggleFavorite={toggleFavorite}
              />
            ) : activeTab === "Albums" ? (
              <>
                {!showAlbums ? (
                  <GridView
                    items={
                      searchString && searchString !== ""
                        ? filteredData
                        : albums
                    }
                    HandleFile={HandleSelectAlbum}
                    type={"Album"}
                    toggleFavoriteAlbums={toggleFavoriteAlbums}
                  />
                ) : (
                  <ListView
                    tracks={
                      searchString && searchString !== ""
                        ? filteredData
                        : filteredSongsfromAlbum
                    }
                    type={"track"}
                    toggleFavorite={toggleFavorite}
                  />
                )}
              </>
            ) : activeTab === "Artists" ? (
              <>
                {!showArtists ? (
                  <ListView
                    tracks={
                      searchString && searchString !== ""
                        ? filteredData
                        : artists
                    }
                    HandleFile={HandleSelectArtist}
                    type={"artist"}
                    toggleFavoriteArtists={toggleFavoriteArtists}
                  />
                ) : (
                  <ListView
                    tracks={
                      searchString && searchString !== ""
                        ? filteredData
                        : filteredSongsFromArtist
                    }
                    type={"track"}
                    toggleFavorite={toggleFavorite}
                  />
                )}
              </>
            ) : null}
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
