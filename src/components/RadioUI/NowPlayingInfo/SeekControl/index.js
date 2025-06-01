import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { MainContext } from '../../../../context/MainContext';

const SeekControl = ({ seekPosition, duration, handleSeekChange }) => {
  const { isRadioOn } = useContext(MainContext);
  const validSeekPosition = typeof seekPosition === 'number' && seekPosition >= 0 && seekPosition <= 100 ? seekPosition : 0;

  return (
    <div className={styles.seekControlContainer}>
      <input
        type="range"
        min="0"
        max="100"
        value={validSeekPosition}
        onChange={handleSeekChange}
        className={styles.seekBar}
        aria-label="Song progress"
        disabled={!isRadioOn || !duration || duration === 0}
        style={{ '--seek-before-width': `${validSeekPosition}%` }}
      />
    </div>
  );
};

export default SeekControl; 