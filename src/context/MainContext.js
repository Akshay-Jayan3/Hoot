import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const MainContext = createContext({
  folderStored: null,
  metadData: null,
  lastPlayed:null,
  updateFolder: () => {},
  updateMetadata: () => {},
});

export const MainContextProvider = ({ children }) => {
  const [folderStored, setfolderStored] = useState(null);
  const [metadData, setMetadData] = useState(null);
  const [lastPlayed, setLastPlayed] = useState(null);
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
  const updateLastPlayed = (lastPlayed) => {
    setLastPlayed(lastPlayed);
  };
  return (
    <MainContext.Provider
      value={{ folderStored, updateFolder, metadData, lastPlayed,updateMetadata ,updateLastPlayed}}
    >
      {children}
    </MainContext.Provider>
  );
};
