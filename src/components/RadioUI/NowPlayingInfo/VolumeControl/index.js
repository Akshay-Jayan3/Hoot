import React, { useState, useEffect, useContext } from 'react';
import styles from './styles.module.scss';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { AudioContext } from '../../../../context/AudioContext';

const VolumeControl = () => {
  const { volume: contextVolume, changeVolume } = useContext(AudioContext);

  const [isMutedByButtonToggle, setIsMutedByButtonToggle] = useState(contextVolume === 0);
  const [previousVolumeForMute, setPreviousVolumeForMute] = useState(contextVolume > 0 ? contextVolume : 0.5);

  const handleSliderChange = (event) => {
    const newSliderValue = parseInt(event.target.value, 10);
    const newActualVolume = newSliderValue / 100;
    changeVolume(newActualVolume);
    
    if (newActualVolume > 0 && isMutedByButtonToggle) {
        setIsMutedByButtonToggle(false); 
    }
    if (newActualVolume === 0 && !isMutedByButtonToggle) {
        setIsMutedByButtonToggle(true);
    }
  };

  const executeToggleMute = () => {
    if (contextVolume > 0) {
      setPreviousVolumeForMute(contextVolume);
      changeVolume(0);
      setIsMutedByButtonToggle(true);
    } else {
      changeVolume(previousVolumeForMute > 0 ? previousVolumeForMute : 0.5);
      setIsMutedByButtonToggle(false);
    }
  };
  
  useEffect(() => {
    if (contextVolume === 0) {
        if(!isMutedByButtonToggle) setIsMutedByButtonToggle(true);
    } else {
        if(isMutedByButtonToggle) setIsMutedByButtonToggle(false);
    }
  }, [contextVolume]);

  const getVolumeIconToDisplay = () => {
    if (contextVolume === 0) return <VolumeOffIcon />;
    if (contextVolume < 0.5) return <VolumeDownIcon />;
    return <VolumeUpIcon />;
  };

  return (
    <div className={styles.volumeControlContainer}>
      <IconButton 
        onClick={executeToggleMute} 
        className={styles.volumeButton} 
        aria-label={contextVolume === 0 ? 'Unmute' : 'Mute'}
      >
        {getVolumeIconToDisplay()}
      </IconButton>
      <input
        type="range"
        min="0"
        max="100"
        value={Math.round(contextVolume * 100)} 
        onChange={handleSliderChange}
        className={styles.volumeSlider}
        aria-label="Volume"
        style={{ '--volume-before-width': `${Math.round(contextVolume * 100)}%` }}
      />
    </div>
  );
};

export default VolumeControl; 