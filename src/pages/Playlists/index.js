import React, { useState, useEffect ,useContext} from "react";
import Header from "../../components/Header";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import PlaylistSongs from "../../components/Playlist";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import AddPlaylistModal from "../../components/AddplaylistModal";
import LoadingScreen from "../../components/Loader";
import StaticLoadingScreen from "../../components/StaticLoadingScreen";
import GridView from "../../components/GridView";
import { MainContext } from "../../context/MainContext";
import { useTheme } from "../../context/ThemeContext";

const Playlists = () => {
  const [songs, setSongs] = useState(null);
  const { updateNowPlaying } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylist] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const { isRetroTheme } = useTheme();

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const res = await cachemanager.getSongsFromplaylist(
          cacheEntities.PLAYLISTS,
          cacheEntities.SONGS
        );
        setPlaylist(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchMetaData();
  }, []);

  useEffect(() => {
    setSongs(selectedPlaylist.MusicMetadata);
  }, [selectedPlaylist]);

  const performSearch = (value) => {
    setSearchString(value);
    setFilteredData(
      showPlaylist && songs
        ? songs.filter((item) =>
            item?.title?.toLowerCase().includes(value.toLowerCase())
          )
        : playlists.filter((item) =>
            item?.name?.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  const HandleSelectPlaylist = (playlist) => {
    setShowPlaylist(!showPlaylist);
    setSelectedPlaylist(playlist)
  };

  const deletePlaylist = (event, PlaylistId) => {
    event.stopPropagation();
    cachemanager
      .deleteEntityById(cacheEntities.PLAYLISTS, PlaylistId)
      .then((res) => {
        setPlaylist((prevTracks) =>
          prevTracks.filter((prevTrack) => prevTrack.id !== PlaylistId)
        );
      })
      .catch((error) => console.error("Error deleting playlist:", error));
  };
  const RemoveFromPlaylist = (e, playlistId, songId) => {
    e.stopPropagation();
    cachemanager
      .removeSongfromPlaylist(
        cacheEntities.PLAYLISTS,
        cacheEntities.SONGS,
        playlistId,
        songId
      )
      .then((res) => {
        handleShowToast();
        setSongs((prevTracks) =>
          prevTracks.filter((prevTrack) => prevTrack.id !== songId)
        );
      });
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
        setSongs((prevTracks) =>
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
      {isRetroTheme ? 
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
              <GridView
                items={
                  searchString && searchString !== ""
                    ? filteredData
                    : playlists
                }
                HandleFile={HandleSelectPlaylist}
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
          <PlaylistSongs
            selectedPlaylist={selectedPlaylist}
            songs={
              searchString && searchString !== "" ? filteredData : songs
            }
            RemoveFromPlaylist={RemoveFromPlaylist}
            showToast={showToast}
            handleCloseToast={handleCloseToast}
            toggleFavorite={toggleFavorite}
          />
        )}
      </div> :
        <div className="Songspage">
          <div className="mainsection">
            <Search
              showback={showPlaylist}
              HandleBack={HandleSelectPlaylist}
              onChange={performSearch}
              value={searchString}
              placeholder={
                showPlaylist
                  ? "Search your favourite Songs"
                  : "Search your favourite Playlists"
              }
            />
            <Header
              heading={"Rhythmic Playgrounds"}
              description={
                "Immerse yourself in handpicked playlists for every mood"
              }
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
                    <GridView
                      items={
                        searchString && searchString !== ""
                          ? filteredData
                          : playlists
                      }
                      HandleFile={HandleSelectPlaylist}
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
                <PlaylistSongs
                  selectedPlaylist={selectedPlaylist}
                  songs={
                    searchString && searchString !== "" ? filteredData : songs
                  }
                  RemoveFromPlaylist={RemoveFromPlaylist}
                  showToast={showToast}
                  handleCloseToast={handleCloseToast}
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
        </div>}
    </>
  );
};

export default Playlists;
