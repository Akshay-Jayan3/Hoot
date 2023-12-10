import React, { useState, useEffect ,useContext} from "react";
import Header from "../../components/Header";
import TrackList from "../../components/TrackList";
import Search from "../../components/Search";
import { MainContext } from "../../context/MainContext";
import AudioPlayer from "../../components/AudioPlayer";
import * as cachemanager from "../../cacheStore/index";
import { cacheEntities } from "../../cacheStore/cacheEntities";
import LoadingScreen from "../../components/Loader";

const Artists = () => {
  const [metaData, setMetaData] = useState(null);
  const [artists, setArtists] = useState(null);
  const {setAllSongs} = useContext(MainContext);
  const [selectedMusicFile, setSelectedMusicFile] = useState(null);
  const [showArtists, setShowArtist] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('')
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    const promises = [
      cachemanager.getAllEntities(cacheEntities.SONGS),
      cachemanager.getAllEntities(cacheEntities.ARTISTS),
    ];
    Promise.all(promises)
      .then(([songsRes, artistRes]) => {
        setIsLoading(false);
        if (songsRes) {
          setMetaData(songsRes.data);
        }

        if (artistRes) {
          setArtists(artistRes.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredSongs = selectedArtist
    ? metaData?.filter((song) => song.artist === selectedArtist.name)
    : metaData;

  const HandleSelectArtist = (artist) => {
    setSelectedArtist(artist);
    setShowArtist(!showArtists);
    setAllSongs(filteredSongs)
  };

  const performSearch = (value) => {
    setSearchString(value);
    setFilteredData(
      showArtists && filteredSongs
        ? filteredSongs.filter((item) =>
            item?.title?.toLowerCase().includes(value.toLowerCase())
          )
        : artists.filter((item) =>
            item?.name?.toLowerCase().includes(value.toLowerCase())
          )
    );
  };

  return (
    <>
      {isLoading && <LoadingScreen message={"Loading ..."}/>}
      <div className="Songspage">
        <div className="mainsection">
        <Search showback={showArtists} HandleBack={HandleSelectArtist}  onChange={performSearch} value={searchString} placeholder={showArtists ? "Search your favourite Songs":"Search your favourite Artists"}/>
          <Header
            heading={"Discover the Maestros"}
            description={"Dive into the world of musical genius with your favorite artists"}
          />

          <div className="songs-container">
            {!showArtists ? (
              artists && artists?.length > 0 ? (
                <TrackList
                  tracks={searchString && searchString !== '' ? filteredData : artists}
                  HandleFile={HandleSelectArtist}
                  type={"artist"}
                />
              ) : (
                <p>no artists</p>
              )
            ) : filteredSongs && filteredSongs?.length > 0 ? (
              <TrackList tracks={searchString && searchString !== '' ? filteredData : filteredSongs} type={"track"} />
            ) : (
              <p>no songs</p>
            )}
          </div>
        </div>
        <div className="currentMusic">
          <div className="musicCard">
            <AudioPlayer
              selectedMusicFile={selectedMusicFile}
              AllSongs={metaData}
              setSelectedMusicFile={setSelectedMusicFile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Artists;
