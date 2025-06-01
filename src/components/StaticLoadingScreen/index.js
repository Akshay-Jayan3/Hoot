import React from 'react';
import styles from './styles.module.scss';

const StaticLoadingScreen = () => {
  return (
    <div className={styles.staticContainer}>
      <div className={styles.staticOverlay}></div>
      {/* Optional: Add a "Loading..." text or a retro Hoot logo here if desired */}
      {/* <p className={styles.loadingText}>TUNING...</p> */}
    </div>
  );
};

export default StaticLoadingScreen; 