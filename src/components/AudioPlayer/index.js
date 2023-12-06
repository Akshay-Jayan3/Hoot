import React, { useEffect, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import RepeatOneOutlinedIcon from "@mui/icons-material/RepeatOneOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { AudioContext } from "../../context/AudioContext";
import musicNote from "../../assects/musical-note (2).png";



const AudioPlayer = ({ selectedMusicFile, AllSongs }) => {
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
    handleSeekChange,
  } = useContext(AudioContext);

  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }


  useEffect(() => {
    if (selectedMusicFile) {
      setCurrentSong(selectedMusicFile);
    }
  }, [selectedMusicFile]);

  return (
    <div className={styles.container}>
      {currentSong ? (
        <div className={styles.wrapper}>
          <h1>Now Playing</h1>
          <div className={isPlaying ? styles.start : styles.picture}>
            <img src={currentSong?.picture} />
          </div>
          <div className={styles.metadata}>
            <h3 title={currentSong?.title}>
              {truncateText(currentSong?.title, 30)}
            </h3>
            <p title={currentSong?.artist}>
              {truncateText(currentSong?.artist, 30)}
            </p>
          </div>
          <div className={styles.time}>
            <p>{currentTime.toFixed(2)}</p>
            <input
              type="range"
              min={0}
              max={duration | 0.0}
              step={0.01}
              value={seekPosition}
              onChange={handleSeekChange}
            />
            <p>
              {time.min}:{time.sec}
            </p>
          </div>

          <div className={styles.controls}>
            <div>
              <button
                onClick={toggleRepeat}
                className={`${styles.otherBtn} 
                }`}
              >
                <RepeatOneOutlinedIcon
                  style={{ color: isRepeat ? "#ff09d4" : "#fff" }}
                  // fontSize="small"
                />
              </button>
            </div>
            <div className={styles.playebackwrapper}>
              <button
                onClick={() => playPreviousSong(AllSongs)}
                className={styles.skip}
              >
                <SkipPreviousRoundedIcon fontSize="large" />
              </button>
              <button onClick={togglePlayback} className={styles.playpause}>
                {isPlaying ? (
                  <PauseRoundedIcon />
                ) : (
                  <PlayArrowRoundedIcon fontSize="large" />
                )}
              </button>
              <button
                onClick={() => playNextSong(AllSongs)}
                className={styles.skip}
              >
                <SkipNextRoundedIcon fontSize="large" />
              </button>
            </div>
            <div className={styles.otherBtn}>
              <button onClick={toggleShuffle} className={`${styles.otherBtn}`}>
                <ShuffleOutlinedIcon
                  fontSize="small"
                  style={{ color: isShuffle ? "#ff09d4" : "#fff" }}
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.musicNote}>
          <img src={musicNote} />
          <p>Start playing your first song</p>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
