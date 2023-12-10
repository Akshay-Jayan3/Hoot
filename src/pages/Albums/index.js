import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import AlbumList from "../../components/AlbumList";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";

const Albums = () => {
  const [metaData, setMetaData] = useState(null);
  const [albums, setAlbums] = useState(null);
  const {setAllSongs} = useContext(MainContext);
  const [showAlbums, setShowAlbums] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('')
  const [filteredData, setFilteredData] = useState([])

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
    setAllSongs(filteredSongs)
    
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


  return (
    <>
      {isLoading && <LoadingScreen message={"Loading ..."}/>}
      <div className="Songspage">
        <div className="mainsection">
          <Search showback={showAlbums} HandleBack={HandleSelectAlbum}  onChange={performSearch} value={searchString} placeholder={showAlbums ? "Search your favourite Songs":"Search your favourite Albums"}/>
          <Header
            heading={"Albums Extravaganza"}
            description={"Dive into a world of musical stories with your favourite curated albums"}
          />

          <div className="songs-container">
            {!showAlbums ? (
              albums && albums?.length > 0 && (
                <AlbumList
                  albums={searchString && searchString !== '' ? filteredData : albums}
                  HandleFile={HandleSelectAlbum}
                  HandleSelected={setSelectedAlbum}
                  type={"Album"}
                />
              )
            ) : filteredSongs && filteredSongs?.length > 0 && (
              <TrackList tracks={searchString && searchString !== '' ? filteredData : filteredSongs} type={"track"} />
            )}
          </div>
        </div>
        <div className="currentMusic">
          <div className="musicCard">
            <AudioPlayer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Albums;
