import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const MainContext = createContext({
  folderStored: null,
  metadData: null,
  lastPlayed:null,
  albums:null,
  artists:null,
  updateFolder: () => {},
  updateMetadata: () => {},
  updateAlbums: () => {},
  updateArtists: () => {},
});

export const MainContextProvider = ({ children }) => {
  const [folderStored, setfolderStored] = useState(null);
  const [metadData, setMetadData] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [artists, setArtists] = useState(null);
  useEffect(() => {
    const storedFolder = localStorage.getItem("selected-folder");
    const Allsongs = localStorage.getItem("AllSongs");
    const lastplayed = localStorage.getItem("lastplayed");

  

    if (storedFolder) {
      setfolderStored(storedFolder);
    }
    if (Allsongs) {
       setMetadData(JSON.parse(Allsongs));

    }
    if (lastplayed) {
      setLastPlayed(JSON.parse(lastplayed));

   }
  }, []);

  const updateFolder = (newfolder) => {
    setfolderStored(newfolder);
  };
  const updateMetadata = (newfolder) => {
    setMetadData(newfolder);
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
  return (
    <MainContext.Provider
      value={{ folderStored, updateFolder, metadData, lastPlayed,albums,artists,updateMetadata ,updateLastPlayed,updateAlbums,updateArtists}}
    >
      {children}
    </MainContext.Provider>
  );
};
