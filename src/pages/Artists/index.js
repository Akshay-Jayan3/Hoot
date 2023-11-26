import React, { useState ,useEffect} from "react";
import Header from "../../components/Header";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";

const Artists = () => {
  const [metaData,setMetaData] =useState(null)
  const [artists,setArtists] =useState(null)
  const [selectedMusicFile,setSelectedMusicFile]=useState(null)
  const [showArtists,setShowArtist]=useState(false)
  const [selectedAlbum,setSelectedAlbum]=useState([])

  useEffect(() => {
    cachemanager.getAllEntities(cacheEntities.SONGS).then((res) => {
      if (res) {
        setMetaData(res.data);
      }
    });
    cachemanager.getAllEntities(cacheEntities.ARTISTS).then((res) => {
      if (res) {
        setArtists(res.data);
      }
    });
  }, [])
  const filteredSongs = selectedAlbum
      ? metaData?.filter((song) => song.artist === selectedAlbum.name)
      : metaData;

  const HandleSelectArtist=(artist)=>{
    setSelectedAlbum(artist)
    setShowArtist(!showArtists)
  }

   

  return (
    <div className="Songspage">
      <div className="mainsection">
        <Search showback={showArtists} HandleBack={()=> setShowArtist(!showArtists)}/>
        <Header
          heading={"Music For You"}
          description={"Listen to your favourite songs"}
        />

        <div className="songs-container">
          {!showArtists ? artists && artists?.length > 0 ? (
            <TrackList tracks={artists} HandleFile={HandleSelectArtist} type={'artist'} />
          ) : (
            <p>no artists</p>
          ):filteredSongs && filteredSongs?.length > 0 ? (
            <TrackList tracks={filteredSongs} type={'track'} />
          ) : (
            <p>no songs</p>
          )}
          
        </div>
      </div>
      <div className="currentMusic">
        <div className="musicCard">
          <AudioPlayer selectedMusicFile={selectedMusicFile} AllSongs={metaData} setSelectedMusicFile={setSelectedMusicFile}/>
        </div>
      </div>
    </div>
  );
};

export default Artists;
