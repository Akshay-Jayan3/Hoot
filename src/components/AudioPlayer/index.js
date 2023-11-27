import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { Howl } from "howler";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { MainContext } from "../../context/MainContext";

const AudioPlayer = ({ selectedMusicFile, AllSongs, toggleFavorite }) => {
  const { lastPlayed, updateLastPlayed, isPlaying, setIsPlaying,updateNowPlaying } =
    useContext(MainContext);
  const isInitialMount = useRef(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(null);
  const [seekPosition, setSeekPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    if (selectedMusicFile) {
      setCurrentSong(selectedMusicFile);
    } else {
      setCurrentSong(lastPlayed);
    }

    if (!isInitialMount.current) {
      updateLastPlayed(selectedMusicFile);
      localStorage.setItem("lastplayed", JSON.stringify(selectedMusicFile));
    }

    // Set isInitialMount to false after the initial mount
    isInitialMount.current = false;
  }, [selectedMusicFile, lastPlayed]);

  useEffect(() => {
    if (currentSong) {
      // Stop the existing sound if it exists
      if (sound) {
        sound.stop();
      }

      const newSound = new Howl({
        src: [currentSong.path],
        onplay: () => {
          setIsPlaying(true);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onload: () => {
          setDuration(newSound.duration());
          setSeekPosition(0);
          newSound.play();
       
        },
        onend: () => {
          setIsPlaying(false);
          playNextSong();
        },
        html5: true,
      });

      setSound(newSound);
    }
    return () => {
      sound?.unload();
    };
  }, [currentSong]);

  useEffect(() => {
    if (duration) {
      const min = Math.floor(duration / 60);
      const secRemain = Math.floor(duration % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [currentSong]);

  const togglePlayback = () => {
    if (!isPlaying) {
      if (!sound.playing() || currentSong.title !== selectedMusicFile.title) {
        // Check if the sound is not already playing or the current song is different
        sound.pause();
        updateNowPlaying(selectedMusicFile); // Update the current song
        sound.play();
      }
    } else {
      sound.pause();
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && isPlaying) {
        setCurrentTime(sound.seek());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound, isPlaying]);

  const playNextSong = () => {
    sound.pause();
    if (AllSongs.length === 0) {
      console.error("No songs available in the playlist.");
      return;
    }
    const currentIndex = AllSongs.findIndex(
      (song) => song.title === currentSong.title
    );
    const nextIndex = (currentIndex + 1) % AllSongs.length;
    const nextSong = AllSongs[nextIndex];
    updateNowPlaying(nextSong);
    updateLastPlayed(nextSong);
    localStorage.setItem("lastplayed", JSON.stringify(nextSong));
  };
  const playPreviousSong = () => {
    sound.pause();
  
    if (AllSongs.length === 0) {
      console.error("No songs available in the playlist.");
      return;
    }
  
    const currentIndex = AllSongs.findIndex((song) => song.title === currentSong.title);
    const previousIndex = (currentIndex - 1 + AllSongs.length) % AllSongs.length;
    const previousSong = AllSongs[previousIndex];
    
    if (previousSong) {
      updateNowPlaying(previousSong);
      updateLastPlayed(previousSong);
      localStorage.setItem("lastplayed", JSON.stringify(previousSong));
    } else {
      console.error("No previous song available.");
    }
  };
  

  const handleSeekChange = (e) => {
    const newSeekPosition = parseFloat(e.target.value);
    setSeekPosition(newSeekPosition);
    sound.seek(newSeekPosition);
  };

  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
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
                onClick={(e) =>
                  toggleFavorite(
                    e,
                    selectedMusicFile.id,
                    selectedMusicFile,
                    true
                  )
                }
                className={`${styles.favouriteBtn} ${
                  selectedMusicFile?.isFavorite ? styles.favorite : ""
                }`}
              >
                {selectedMusicFile?.isFavorite ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon style={{ color: "#fff" }} />
                )}
              </button>
            </div>
            <div className={styles.playebackwrapper}>
              <button onClick={playPreviousSong} className={styles.skip}>
                <SkipPreviousRoundedIcon fontSize="large" />
              </button>
              <button onClick={togglePlayback} className={styles.playpause}>
                {isPlaying ? (
                  <PauseRoundedIcon />
                ) : (
                  <PlayArrowRoundedIcon fontSize="large" />
                )}
              </button>
              <button onClick={playNextSong} className={styles.skip}>
                <SkipNextRoundedIcon fontSize="large" />
              </button>
            </div>
            <div>
              <VolumeUpRoundedIcon />
            </div>
          </div>
        </div>
      ) : (
        <p>Start playing your first song</p>
      )}
    </div>
  );
};

export default AudioPlayer;
