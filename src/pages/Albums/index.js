import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import AlbumList from "../../components/AlbumList";

const Albums = () => {
  const {metadData,albums} = useContext(MainContext)
  const [selectedMusicFile,setSelectedMusicFile]=useState(null)
  const [showAlbums,setShowAlbums]=useState(true)
  console.log(albums)

  const filteredMetadata = metadData?.filter((item) => {
    return albums?.includes(item.album);
  });

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
            <AlbumList albums={albums} HandleFile={HandleSelectAlbum} />
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

export default Albums;
