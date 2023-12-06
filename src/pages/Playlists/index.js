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
import { useLocation } from "react-router-dom";

const Playlists = () => {
  const [metaData, setMetaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylist] = useState([]);
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
    const promises = [
      cachemanager.getAllEntities(cacheEntities.SONGS),
      cachemanager.getSongsFromplaylist(cacheEntities.PLAYLISTS,cacheEntities.SONGS),
    ];
    Promise.all(promises)
      .then(([songsRes, playlistRes]) => {
        setIsLoading(false);
        if (songsRes) {
          setMetaData(songsRes.data);
        }

        if (playlistRes) {
          setPlaylist(playlistRes.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const HandleSelectPlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const deletePlaylist = (event, PlaylistId) => {
    event.stopPropagation();
    cachemanager
      .deleteEntityById(cacheEntities.PLAYLISTS, PlaylistId)
      .then((res) => {
        console.log(res);
        setPlaylist((prevTracks) =>
          prevTracks.filter((prevTrack) => prevTrack.id !== PlaylistId)
        );
      })
      .catch((error) => console.error("Error deleting playlist:", error));
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
              <AddPlaylistModal
                closeModal={closeModal}
                setPlaylist={setPlaylist}
              />
            ) : !showPlaylist ? (
              playlists && playlists?.length > 0 ? (
                <>
                  <button className="Addplaylist" onClick={openModal}>
                    <ControlPointOutlinedIcon fontSize="small" />
                    Add New Playlist
                  </button>
                  <AlbumList
                    albums={playlists}
                    HandleFile={HandleSelectPlaylist}
                    setSelectedAlbum={setSelectedAlbum}
                    HandleAction={deletePlaylist}
                  />
                </>
              ) : (
                !showModal && (
                  <button className="Addplaylist" onClick={openModal}>
                    <ControlPointOutlinedIcon fontSize="small" />
                    Add New Playlist
                  </button>
                )
              )
            ) : (
              <PlaylistSongs selectedPlaylist={selectedAlbum}/>
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
