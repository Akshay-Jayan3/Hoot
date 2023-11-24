import React, { useContext, useState ,useEffect} from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import AlbumList from "../../components/AlbumList";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";


const Albums = () => {
  const [metaData,setMetaData] =useState(null)
  const [albums,setAlbums]=useState(null)
  const {nowplaying} = useContext(MainContext)
  const [showAlbums,setShowAlbums]=useState(true)
  const [selectedAlbum,setSelectedAlbum]=useState([])
  

  useEffect(() => {
    cachemanager.getAllEntities(cacheEntities.SONGS).then((res) => {
      if (res) {
        setMetaData(res.data);
      }
    });
    cachemanager.getAllEntities(cacheEntities.ALBUMS).then((res) => {
      if (res) {
        setAlbums(res.data);
      }
    });
  }, [])
  
  const filteredSongs = selectedAlbum
      ? metaData?.filter((song) => song.album === selectedAlbum.name)
      : metaData;
  

  const HandleSelectAlbum=()=>{
    setShowAlbums(!showAlbums)
  }

  return (
    <div className="Songspage">
      <div className="mainsection">
        <Search />
        <Header
          heading={"Music For You"}
          description={"Listen to your favourite songs"}
        />

        <div className="songs-container">
          {showAlbums ? albums && albums?.length > 0 ? (
            <AlbumList albums={albums} HandleFile={HandleSelectAlbum} setSelectedAlbum={setSelectedAlbum}/>
          ) : (
            <p>no artists</p>
          ):filteredSongs && filteredSongs?.length > 0 ? (
            <TrackList tracks={filteredSongs} type={'track'} />
          ) : (
            <p>no songss</p>
          )}
          
        </div>
      </div>
      <div className="currentMusic">
        <div className="musicCard">
          <AudioPlayer selectedMusicFile={nowplaying} AllSongs={metaData}/>
        </div>
      </div>
    </div>
  );
};

export default Albums;
