import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const MainContext = createContext({
  folderStored: null,
  lastPlayed: null,
  albums: null,
  artists: null,
  isPlaying: false,
  AllSongs: null,
  updateFolder: () => {},
  updateAlbums: () => {},
  updateArtists: () => {},
  updateNowPlaying: () => {},
  setAllSongs: () => {},
});

export const MainContextProvider = ({ children }) => {
  const [folderStored, setfolderStored] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [nowplaying, setNowplaying] = useState("");
  const [AllSongs, setAllSongs] = useState(null);
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
    setNowplaying(song);
  };

  return (
    <MainContext.Provider
      value={{
        folderStored,
        lastPlayed,
        nowplaying,
        AllSongs,
        setAllSongs,
        updateFolder,
        updateLastPlayed,
        updateNowPlaying,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
