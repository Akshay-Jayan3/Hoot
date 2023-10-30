import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";

const Songs = () => {
  const {metadData} = useContext(MainContext)
  const [selectedMusicFile,setSelectedMusicFile]=useState('')
  // localStorage.setItem('AllSongs', JSON.stringify(metadData));

  return (
    <div className="Songspage">
      <div className="mainsection">
        <Search />
        <Header
          heading={"Music For You"}
          description={"Listen to your favourite songs"}
        />

        <div className="songs-container">
          {metadData && metadData.length > 0 ? (
            <TrackList tracks={metadData} HandleFile={setSelectedMusicFile} type={'track'} />
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

export default Songs;
