import React, { useContext } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";

const Songs = () => {
  // const {metadData} = useContext(MainContext)
  const metadData = [
    { title: "music" },
    { title: "music" },
    { title: "music" },
    { title: "music" },
    { title: "music" },
    { title: "music" },
    { title: "music" },
    { title: "music" },
  ];
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
            <TrackList tracks={metadData} />
          ) : (
            <p>no songs</p>
          )}
        </div>
      </div>
      <div className="currentMusic">
        <div className="musicCard"></div>
      </div>
    </div>
  );
};

export default Songs;
