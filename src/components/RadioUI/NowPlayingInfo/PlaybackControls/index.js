import React, { useContext } from 'react';
import styles from './styles.module.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import LoopIcon from '@mui/icons-material/Loop';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { MainContext } from '../../../../context/MainContext';

const PlaybackControls = ({ 
  isPlaying, 
  togglePlayback, 
  playNextSong, 
  playPreviousSong, 
  isRepeat,
  toggleRepeat,
  isShuffle,
  toggleShuffle,
  isSongLoaded
}) => {
  const { isRadioOn } = useContext(MainContext);

  const commonDisabled = !isSongLoaded || !isRadioOn;
  const powerOffDisabled = !isRadioOn;

  return (
    <div className={styles.playbackControlsContainer}>
      <button 
        aria-label="Shuffle" 
        onClick={toggleShuffle} 
        className={`${styles.controlButton} ${isShuffle ? styles.toggled : ''}`}
        disabled={powerOffDisabled}
      >
        <ShuffleIcon fontSize="large" />
      </button>
      <button 
        aria-label="Previous track" 
        onClick={playPreviousSong} 
        className={styles.controlButton}
        disabled={commonDisabled}
      >
        <SkipPreviousIcon fontSize="large" />
      </button>
      <button 
        aria-label={isPlaying ? 'Pause' : 'Play'} 
        onClick={togglePlayback} 
        className={`${styles.controlButton} ${styles.playPauseButton}`}
        disabled={commonDisabled}
      >
        {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
      </button>
      <button 
        aria-label="Next track" 
        onClick={playNextSong} 
        className={styles.controlButton}
        disabled={commonDisabled}
      >
        <SkipNextIcon fontSize="large" />
      </button>
      <button 
        aria-label="Loop" 
        onClick={toggleRepeat} 
        className={`${styles.controlButton} ${isRepeat ? styles.toggled : ''}`}
        disabled={powerOffDisabled}
      >
        <LoopIcon fontSize="large" />
      </button>
    </div>
  );
};

export default PlaybackControls; 