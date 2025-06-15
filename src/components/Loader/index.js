// LoadingScreen.js

import React from "react";
import styles from "./styles.module.scss";
import { Bars,MagnifyingGlass } from "react-loader-spinner";
import { useTheme } from "../../context/ThemeContext";

const LoadingScreen = ({ message, setting }) => {
   const { theme, dynamicTheme } = useTheme();
  return (
    <div className={styles.loadingScreen}>
      {setting ? (
        <MagnifyingGlass
          visible={true}
          height="100"
          width="100"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#465285"
          color={dynamicTheme?.accent || theme?.accent || "#FFC916"}
        />
      ) : (
        <Bars
          height="60"
          width="60"
          color={dynamicTheme?.accent || theme?.accent || "#FFC916"}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}

      <p>{message}</p>
    </div>
  );
};

export default LoadingScreen;
