import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const MainContext = createContext({
  folderStored:null,
  metadData:null,
  updateFolder:()=>{},
  updateMetadata:()=>{}
});

export const MainContextProvider = ({ children }) => {
  const [folderStored, setfolderStored] = useState(null);
  const [metadData, setMetadData] = useState(null);
  useEffect(() => {
    const storedFolder = localStorage.getItem("selected-folder");

    if (storedFolder) {
        setfolderStored(storedFolder);
    }
  }, []);

  const updateFolder = (newfolder) => {
    setfolderStored(newfolder);
  };
  const updateMetadata = (newfolder) => {
    setMetadData(newfolder);
  };
  return (
    <MainContext.Provider value={{ folderStored, updateFolder ,metadData,updateMetadata}}>
      {children}
    </MainContext.Provider>
  );
};
