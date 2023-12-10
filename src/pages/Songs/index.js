import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import { AudioContext } from "../../context/AudioContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";
import { useLocation, useNavigate} from 'react-router-dom';

const Songs = () => {
  const { updateNowPlaying } = useContext(MainContext);
  const { setAllSongs } = useContext(AudioContext);
  const [metadData, setMetadData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const { playlistDetails } = state || {};
  const [searchString, setSearchString] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const navigate= useNavigate()

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const res = await cachemanager.getAllEntities(cacheEntities.SONGS);
        setMetadData(res.data);
        setAllSongs(res.data)
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
    setSearchString(value)
    setFilteredData(
      metadData.filter((item) =>
        item?.title?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };




  const AddtoPlaylist=(e,playlistId,songId)=>{
    e.stopPropagation();
    cachemanager.addsongsToplaylist(cacheEntities.PLAYLISTS,cacheEntities.SONGS,playlistId,songId).then((res)=>{
      console.log(res)
    })

  }

  return (
    <>
    {isLoading && <LoadingScreen message={"Loading ..."}/>}
      <div className="Songspage">
        <div className="mainsection">
          <Search showback={playlistDetails} onChange={performSearch} value={searchString} placeholder={"Search your favourite Songs"} HandleBack={()=>navigate(-1)}/>
          <Header
            heading={"Music For You"}
            description={"Listen to your favourite songs"}
          />

          <div className="songs-container">
            {metadData && metadData.length > 0 ? (
              <TrackList
                tracks={searchString && searchString !== '' ? filteredData : metadData}
                type={"track"}
                toggleFavorite={toggleFavorite}
                AddtoPlaylist={AddtoPlaylist}
                playlistDetails={playlistDetails}
              />
            ) : (
              <p>No songs found</p>
            )}
          </div>
        </div>
        <div className="currentMusic">
          <div className="musicCard">
            <AudioPlayer
              AllSongs={metadData}
              toggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Songs;
