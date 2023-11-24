import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
const Favourites = () => {
  const { nowplaying } = useContext(MainContext);
  const [metaData, setMetadData] = useState(null);

  console.log(metaData)
  useEffect(() => {
    cachemanager.getAllEntities(cacheEntities.SONGS).then((res) => {
      if (res) {
        setMetadData(res.data);
      }
    });
  }, []);

  const filteredSongs = metaData?.filter((song) => (song.isFavorite));

  return (
    <div className="Songspage">
      <div className="mainsection">
        <Search />
        <Header
          heading={"Music For You"}
          description={"Listen to your favourite songs"}
        />

        <div className="songs-container">
          {filteredSongs && filteredSongs.length > 0 ? (
            <TrackList
              tracks={filteredSongs}
              type={"track"}
              setMetadData={setMetadData}
            />
          ) : (
            <p>no songs</p>
          )}
        </div>
      </div>
      <div className="currentMusic">
        <div className="musicCard">
          <AudioPlayer selectedMusicFile={nowplaying} AllSongs={filteredSongs} />
        </div>
      </div>
    </div>
  );
};

export default Favourites;
