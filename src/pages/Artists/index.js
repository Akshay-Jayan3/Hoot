import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";

const Artists = () => {
  const {metadData,artists} = useContext(MainContext)
  const [selectedMusicFile,setSelectedMusicFile]=useState(null)
  const [showArtists,setShowArtist]=useState(true)

  const filteredMetadata = metadData?.filter((item) => {
    return artists?.includes(item.artist);
  });

  const HandleSelectArtist=()=>{
    setShowArtist(!showArtists)
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
          {showArtists? artists && artists?.length > 0 ? (
            <TrackList tracks={artists} HandleFile={HandleSelectArtist} type={'artist'} />
          ) : (
            <p>no artists</p>
          ):filteredMetadata && filteredMetadata?.length > 0 ? (
            <TrackList tracks={filteredMetadata} HandleFile={setSelectedMusicFile} type={'track'} />
          ) : (
            <p>no songs</p>
          )}
          
        </div>
      </div>
      <div className="currentMusic">
        <div className="musicCard">
          <AudioPlayer selectedMusicFile={selectedMusicFile} AllSongs={metadData} setSelectedMusicFile={setSelectedMusicFile}/>
        </div>
      </div>
    </div>
  );
};

export default Artists;
