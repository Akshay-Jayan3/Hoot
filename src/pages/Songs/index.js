import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/ListView";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import CustomToast from "../../components/ToastMessage";
import ListView from "../../components/ListView";

const Songs = () => {
  const { updateNowPlaying, setAllSongs } = useContext(MainContext);
  const [metadData, setMetadData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const { playlistDetails } = state || {};
  const [searchString, setSearchString] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const res = await cachemanager.getAllEntities(cacheEntities.SONGS);
        setMetadData(res.data);
        setAllSongs(res.data);
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

  const performSearch = (value) => {
    setSearchString(value);
    setFilteredData(
      metadData.filter((item) =>
        item?.title?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const AddtoPlaylist = (e, playlistId, songId) => {
    e.stopPropagation();
    cachemanager
      .addsongsToplaylist(
        cacheEntities.PLAYLISTS,
        cacheEntities.SONGS,
        playlistId,
        songId
      )
      .then((res) => {
        handleShowToast();
      });
  };

  return (
    <>
      {isLoading && <LoadingScreen message={"Loading ..."} />}
      {showToast && (
        <CustomToast message="Added to playlist" onClose={handleCloseToast} />
      )}
      <div className="Songspage">
        <div className="mainsection">
          <Search
            showback={playlistDetails}
            onChange={performSearch}
            value={searchString}
            placeholder={"Search your favourite Songs"}
            HandleBack={() => navigate(-1)}
          />
          <Header
            heading={"Vibes Unleashed"}
            description={"Discover and immerse yourself in your favorite tunes"}
          />

          <div className="songs-container">
            {metadData && metadData.length > 0 && (
              <ListView
                tracks={
                  searchString && searchString !== "" ? filteredData : metadData
                }
                type={"track"}
                toggleFavorite={toggleFavorite}
                AddtoPlaylist={AddtoPlaylist}
                playlistDetails={playlistDetails}
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

export default Songs;
