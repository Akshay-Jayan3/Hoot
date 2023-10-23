import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [folderStored, setfolderStored] = useState(null);
  useEffect(() => {
    const storedFolder = localStorage.getItem("selected-folder");

    if (storedFolder) {
        setfolderStored(storedFolder);
    }
  }, []);

  const updateFolder = (newfolder) => {
    setfolderStored(newfolder);
  };
  return (
    <MainContext.Provider value={{ folderStored, updateFolder }}>
      {children}
    </MainContext.Provider>
  );
};
