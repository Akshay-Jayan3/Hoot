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
  const { nowplaying } = useContext(MainContext);
  const [showAlbums, setShowAlbums] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  };

  return (
    <>
      {isLoading && <LoadingScreen message={"Loading ..."}/>}
      <div className="Songspage">
        <div className="mainsection">
          <Search showback={showAlbums} HandleBack={HandleSelectAlbum} />
          <Header
            heading={"Music For You"}
            description={"Listen to your favourite songs"}
          />

          <div className="songs-container">
            {!showAlbums ? (
              albums && albums?.length > 0 ? (
                <AlbumList
                  albums={albums}
                  HandleFile={HandleSelectAlbum}
                  setSelectedAlbum={setSelectedAlbum}
                  count={filteredSongs.length}
                  type={"Album"}
                />
              ) : (
                <p>Loading...</p>
              )
            ) : filteredSongs && filteredSongs?.length > 0 ? (
              <TrackList tracks={filteredSongs} type={"track"} />
            ) : (
              <p>no songss</p>
            )}
          </div>
        </div>
        <div className="currentMusic">
          <div className="musicCard">
            <AudioPlayer selectedMusicFile={nowplaying} AllSongs={metaData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Albums;
