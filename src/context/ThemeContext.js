// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { lightTheme, darkTheme } from '../utils/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);
  const [isRetroTheme, setIsRetroTheme] = useState(false);
  

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  const toggleRetro = () => {
    console.log("CALLED: toggleRetro. Current isRetroTheme state:", isRetroTheme);
    setIsRetroTheme((prevIsRetroTheme) => {
      const newRetroState = !prevIsRetroTheme;
      console.log("UPDATING: isRetroTheme from", prevIsRetroTheme, "to", newRetroState);
      return newRetroState;
    });
  };

  return (
    <ThemeContext.Provider value={{isRetroTheme, theme, toggleTheme,toggleRetro }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
