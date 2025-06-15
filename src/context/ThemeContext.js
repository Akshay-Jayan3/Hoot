import React, { createContext, useState, useContext } from 'react';
import { lightTheme, darkTheme } from '../utils/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);
  const [isRetroTheme, setIsRetroTheme] = useState(false);
  const [isDynamicEnabled, setIsDynamicEnabled] = useState(true);
  const [dynamicTheme, setDynamicTheme] = useState({
            background:  theme.background,
            text:  theme.textColor,
            accent:theme.accent,
            themeMode:'dynamic'
          }); 

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  const toggleRetro = () => {
    setIsRetroTheme((prev) => !prev);
  };

   const toggleDynamicColor = () => {
    setIsDynamicEnabled((prev) => !prev);
  };

  const setColorFromImage = (colors) => {
    setDynamicTheme(colors); // 🔥 Store the new theme
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isRetroTheme,
        toggleTheme,
        toggleRetro,
        dynamicTheme,       // 🔥 Expose it
        setColorFromImage,  // 🔥 Expose setter
        toggleDynamicColor,
        isDynamicEnabled
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
