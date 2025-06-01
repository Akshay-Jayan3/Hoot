import React, { useContext } from 'react';
import styles from './styles.module.scss';
import placeholderAlbumArt from '../../../../assects/note.png'; // Assuming you have a placeholder
import musicNoteIcon from '../../../../assects/music.png'; // Assuming this path
import { MainContext } from '../../../../context/MainContext'; // Import MainContext

const SongDisplay = ({ 
  albumArt, 
  title, 
  artist, 
  currentTime, 
  duration, 
  isPlaying, 
  isSongActuallyLoaded // New prop
}) => {
  const { isRadioOn } = useContext(MainContext); // Get isRadioOn

  const screenClasses = `
    ${styles.songDisplayScreen}
    ${!isRadioOn ? styles.songDisplayScreenOff : ''} // Screen off if not playing OR radio is off
  `;

  // Content to display when radio is on but no song is loaded
  const noSongLoadedContent = (
    <div className={styles.noSongMessageContainer}>
      <img src={musicNoteIcon} alt="Music note icon" className={styles.noSongIcon} />
      <p>Start playing your first song</p>
    </div>
  );

  // Content to display when a song is loaded and radio is on
  const songLoadedContent = (
    <>
      <div className={styles.nowPlayingTitle}>Now Playing</div>
      <div className={styles.albumArtContainer}>
        {albumArt ? (
          <img src={albumArt} alt={`Album art for ${title}`} className={styles.albumArt} />
        ) : (
          <img src={placeholderAlbumArt} alt="Placeholder album art" className={styles.albumArtPlaceholder} />
          // Or <div className={styles.albumArtPlaceholder}>ART</div> if you prefer the text placeholder
        )}
      </div>
      <div className={styles.songInfoContainer}>
        <div className={styles.songTitle}>{title}</div>
        <div className={styles.artistName}>{artist}</div>
      </div>
      <div className={styles.digitalTiming}>
        <span className={styles.currentTimeDisplay}>{currentTime}</span>
        <span className={styles.timeSeparator}> / </span>
        <span className={styles.totalDurationDisplay}>{duration}</span>
      </div>

      {/* Visualizer: only if radio is on, song is loaded, AND isPlaying */}
      {isRadioOn && isSongActuallyLoaded && isPlaying && (
        <div className={styles.visualizerContainer}>
          {[...Array(15)].map((_, i) => (
            <div key={i} className={styles.visualizerBar}></div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={screenClasses.trim()}>
      {isRadioOn ? (
        isSongActuallyLoaded ? songLoadedContent : noSongLoadedContent
      ) : (
        null // When radio is off, .songDisplayScreenOff handles hiding via CSS
      )}
    </div>
  );
};

export default SongDisplay; 