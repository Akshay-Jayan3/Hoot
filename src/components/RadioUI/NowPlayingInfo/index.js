import React, { useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import { AudioContext } from '../../../context/AudioContext';

// Placeholder for sub-components we'll create later
import SongDisplay from './SongDisplay';
import SeekControl from './SeekControl';
import PlaybackControls from './PlaybackControls';
import VolumeControl from './VolumeControl';
import { MainContext } from '../../../context/MainContext';
// import VolumeControl from './VolumeControl';

const NowPlayingInfo = () => {
  const {
    isPlaying,
    currentSong,
    seekPosition,
    currentTime,
    time,
    duration,
    isRepeat,
    isShuffle,
    setCurrentSong,
    playNextSong,
    playPreviousSong,
    toggleShuffle,
    toggleRepeat,
    togglePlayback,
    formatTime,
    handleSeekChange,
    // sound, // Howler instance, useful for volume: sound?.volume(newVolume)
  } = useContext(AudioContext);

  const { nowplaying } = useContext(MainContext);

  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  useEffect(() => {
    setCurrentSong(nowplaying || null);
  }, [nowplaying, setCurrentSong]);

  // Fallback for display purposes if currentSong is null initially or during transitions
  const safeDisplaySong = currentSong || {
    title: '-',
    artist: '-',
    picture: null,
  };

  const displayCurrentTime = formatTime && currentTime != null ? formatTime(currentTime) : '00:00';
  const displayDuration = formatTime && duration != null ? formatTime(duration) : '00:00';

  return (
    <div className={styles.nowPlayingContainer}>
      {/* <h2 className={styles.heading}>Now Playing</h2> */}
      <SongDisplay
        albumArt={safeDisplaySong.picture}
        title={truncateText(safeDisplaySong.title, 20)}
        artist={truncateText(safeDisplaySong.artist, 30)}
        currentTime={displayCurrentTime}
        duration={displayDuration}
        isPlaying={isPlaying}
        isSongActuallyLoaded={!!currentSong}
      />
      {/* <div className={styles.placeholder}>Song Display Area (Art, Title, Digital Timing)</div> */}
      <SeekControl
        seekPosition={seekPosition || 0}
        duration={duration || 0}
        handleSeekChange={handleSeekChange}
        disabled={!currentSong}
      />
      {/* <div className={styles.placeholder}>Seek Control Area</div> */}
      <PlaybackControls
        isPlaying={isPlaying}
        togglePlayback={togglePlayback}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
        isRepeat={isRepeat}
        toggleRepeat={toggleRepeat}
        isShuffle={isShuffle}
        toggleShuffle={toggleShuffle}
        isSongLoaded={!!currentSong}
      />
      {/* <div className={styles.placeholder}>Playback Controls Area</div> */}
      <VolumeControl
        // sound={sound} // Pass sound object for direct volume control if needed
      />
      {/* <div className={styles.placeholder}>Volume Control Area</div> */}
    </div>
  );
};

export default NowPlayingInfo; 