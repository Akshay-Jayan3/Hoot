import React, { Suspense, useContext } from 'react';
import styles from './styles.module.scss';
import TopNavBar from './RadioTopMenu/TopNavBar';
import SpeakerGrill from './SpeakerGrill';
import MotionScreen from './MotionScreen';
import NowPlayingInfo from './NowPlayingInfo';
import logo from '../../assects/logo.svg';
import { useTheme } from '../../context/ThemeContext';
import StaticLoadingScreen from '../StaticLoadingScreen';
import { AudioContext } from "../../context/AudioContext";
import { MainContext } from '../../context/MainContext';

// ScreenOffDisplay component is no longer needed here, as MotionScreen handles its own off state.
// const ScreenOffDisplay = () => (
//   <div className={styles.screenOffDisplay}>
//   </div>
// );

const RetroNeonPlayer = ({children}) => {
  const { isPlaying } = useContext(AudioContext);
  const { isRadioOn, toggleRadioPower } = useContext(MainContext);

  const logoClasses = `
    ${styles.leftSideLogoContainer}
    ${isRadioOn ? styles.logoPowerOn : styles.logoPowerOff}
  `;

  return (
    <div className={styles.retroNeonContainer}>
      <div className={styles.radioOuterBody}>
        <div className={styles.leftSideContainer}>
          <div className={styles.powerSwitchArea}>
            <div className={logoClasses.trim()} onClick={toggleRadioPower}>
              <img src={logo} alt="Hoot Logo" className={styles.leftSideLogoImage} />
            </div>
            <div className={`${styles.powerLed} ${isRadioOn ? styles.ledOn : styles.ledOff}`}></div>
            <span className={styles.powerLabel}>POWER</span>
          </div>
          <SpeakerGrill isPlaying={isPlaying && isRadioOn} />
        </div>
        <div className={styles.centerContainer}>
          <div className={styles.topNavAreaWrapper}>
            <div className={styles.smallRoundSpeaker}>
              <div className={styles.speakerScrew}></div>
              <div className={styles.speakerScrew}></div>
              <div className={styles.speakerScrew}></div>
              <div className={styles.speakerScrew}></div>
            </div>
            <TopNavBar />
            <div className={styles.smallRoundSpeaker}>
              <div className={styles.speakerScrew}></div>
              <div className={styles.speakerScrew}></div>
              <div className={styles.speakerScrew}></div>
              <div className={styles.speakerScrew}></div>
            </div>
          </div>
          <div className={styles.centerContainerBody}>
            {/* MotionScreen is now always rendered, and manages its own on/off content display */}
         
            <MotionScreen isRadioOn={isRadioOn}> {/* Pass isRadioOn prop */}
              <Suspense fallback={<StaticLoadingScreen />}>
                {children} {/* Pass children, MotionScreen will show/hide them */}
              </Suspense>
            </MotionScreen>
      
          </div>
        </div>
        <div className={styles.rightSideContainer}>
          <NowPlayingInfo />
        </div>
      </div>
    </div>
  );
};

export default RetroNeonPlayer; 