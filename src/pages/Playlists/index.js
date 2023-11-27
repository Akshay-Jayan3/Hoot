import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import AlbumList from "../../components/AlbumList";
import PlaylistSongs from "../../components/Playlist";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import AddPlaylistModal from "../../components/AddplaylistModal";
import LoadingScreen from "../../components/Loader";

const Playlists = () => {
  const [metaData, setMetaData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState([
    { name: "playlist 1" },
    { name: "playlist 1" },
    { name: "playlist 1" },
    { name: "playlist 1" },
  ]);
  const { nowplaying } = useContext(MainContext);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    cachemanager.getAllEntities(cacheEntities.SONGS).then((res) => {
      if (res) {
        setMetaData(res.data);
      }
    });
  }, []);

  // const filteredSongs = selectedAlbum
  //   ? metaData?.filter((song) => song.album === selectedAlbum.name)
  //   : metaData;

  const HandleSelectPlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  return (
    <>
    {isLoading && <LoadingScreen message={"Loading ..."} />}
      <div className="Songspage">
        <div className="mainsection">
          <Search showback={showPlaylist} HandleBack={HandleSelectPlaylist} />
          <Header
            heading={"Music For You"}
            description={"Listen to your favourite songs"}
          />

          <div className="songs-container">
            {showModal ? (
              <AddPlaylistModal closeModal={closeModal} />
            ) : !showPlaylist ? (
              albums && albums?.length > 0 ? (
                <>
                  <button className="Addplaylist" onClick={openModal}>
                    <ControlPointOutlinedIcon fontSize="small" />
                    Add New Playlist
                  </button>
                  <AlbumList
                    albums={albums}
                    HandleFile={HandleSelectPlaylist}
                    setSelectedAlbum={setSelectedAlbum}
                  />
                </>
              ) : (
                !showModal && <p>no playlist found</p>
              )
            ) : (
              <PlaylistSongs />
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

export default Playlists;
