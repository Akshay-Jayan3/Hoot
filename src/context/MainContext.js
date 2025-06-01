import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";

export const MainContext = createContext({
  folderStored: null,
  lastPlayed: null,
  albums: null,
  artists: null,
  isPlaying: false,
  AllSongs: null,
  nowplaying: null,
  isRadioOn: true,
  updateFolder: () => {},
  updateAlbums: () => {},
  updateArtists: () => {},
  updateNowPlaying: () => {},
  setAllSongs: () => {},
  toggleRadioPower: () => {},
});

export const MainContextProvider = ({ children }) => {
  const [folderStored, setfolderStored] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [nowplaying, setNowplaying] = useState(null);
  const [AllSongs, setAllSongs] = useState(null);
  const [isRadioOn, setIsRadioOn] = useState(true);

  useEffect(() => {
    const storedFolder = localStorage.getItem("selected-folder");
    const lastplayed = localStorage.getItem("lastplayed");

    if (storedFolder) {
      setfolderStored(storedFolder);
    }
    if (lastplayed) {
      setLastPlayed(JSON.parse(lastplayed));
    }
  }, []);

  const updateFolder = (newfolder) => {
    setfolderStored(newfolder);
  };

  const updateLastPlayed = (lastPlayed) => {
    setLastPlayed(lastPlayed);
  };

  const updateNowPlaying = (song) => {
    if (isRadioOn) {
      setNowplaying(song);
    } else {
      setNowplaying(null);
    }
  };

  const toggleRadioPower = () => {
    setIsRadioOn(prevIsOn => {
      const newIsOn = !prevIsOn;
      if (!newIsOn) {
        setNowplaying(null);
      }
      return newIsOn;
    });
  };

  return (
    <MainContext.Provider
      value={{
        folderStored,
        lastPlayed,
        nowplaying,
        AllSongs,
        isRadioOn,
        setAllSongs,
        updateFolder,
        updateLastPlayed,
        updateNowPlaying,
        toggleRadioPower,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
