import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const MainContext = createContext({
  folderStored: null,
  lastPlayed: null,
  albums: null,
  artists: null,
  isPlaying:false,
  updateFolder: () => {},
  updateAlbums: () => {},
  updateArtists: () => {},
  updateNowPlaying: () => {}
});

export const MainContextProvider = ({ children }) => {
  const [folderStored, setfolderStored] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [nowplaying,setNowplaying] = useState('')
  const [albums, setAlbums] = useState(null);
  const [artists, setArtists] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
  const updateAlbums = (album) => {
    setAlbums(album);
  };
  const updateLastPlayed = (lastPlayed) => {
    setLastPlayed(lastPlayed);
  };
  const updateArtists = (artists) => {
    setArtists(artists);
  };
  const updateNowPlaying = (song) => {
    setNowplaying(song);
  };
 
  return (
    <MainContext.Provider
      value={{
        folderStored,
        lastPlayed,
        albums,
        artists,
        nowplaying,
        isPlaying,
        updateFolder,
        updateLastPlayed,
        updateAlbums,
        updateArtists,
        updateNowPlaying,
        setIsPlaying
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
