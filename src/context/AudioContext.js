import React, { createContext, useState, useContext,useEffect, useRef } from "react"
import { MainContext } from "./MainContext";
import { Howl } from "howler";

export const AudioContext = createContext({
    isPlaying:null,
    currentSong:null,
    seekPosition:null,
    currentTime:null,
    time:null,
    duration:null,
    isRepeat:null,
    isShuffle:null,
    setCurrentSong:()=>{},
    playNextSong:()=>{},
    playPreviousSong:()=>{},
    toggleShuffle:()=>{},
    toggleRepeat:()=>{},
    togglePlayback:()=>{},
    handleSeekChange:()=>{},
});

export const AudioProvider = ({ children }) => {
  const { updateLastPlayed, updateNowPlaying } =
    useContext(MainContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(null);
  const [seekPosition, setSeekPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });

  const togglePlayback = () => {
    if (!isPlaying) {
      sound.play();
    } else {
      sound.pause();
    }
  };

  function shuffleArray(array) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const playNextSong = (AllSongs) => {
    sound.pause();

    if (AllSongs.length === 0) {
      console.error("No songs available in the playlist.");
      return;
    }

    let nextSong;

    if (isShuffle) {
      // Shuffle is enabled, randomly select the next song
      const shuffledSongs = shuffleArray(AllSongs);
      const currentIndex = shuffledSongs.findIndex(
        (song) => song.id === currentSong.id
      );
      nextSong = shuffledSongs[(currentIndex + 1) % shuffledSongs.length];
    } else {
      // Shuffle is not enabled, select the next song in order
      const currentIndex = AllSongs.findIndex(
        (song) => song.id === currentSong.id
      );
      nextSong = AllSongs[(currentIndex + 1) % AllSongs.length];
    }

    updateNowPlaying(nextSong);
    updateLastPlayed(nextSong);
    localStorage.setItem("lastplayed", JSON.stringify(nextSong));
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const playPreviousSong = (AllSongs) => {
    sound.pause();

    if (AllSongs.length === 0) {
      console.error("No songs available in the playlist.");
      return;
    }

    let previousSong;

    if (isShuffle) {
      // Shuffle is enabled, randomly select the previous song
      const shuffledSongs = shuffleArray(AllSongs);
      const currentIndex = shuffledSongs.findIndex(
        (song) => song.id === currentSong.id
      );
      previousSong =
        shuffledSongs[
          (currentIndex - 1 + shuffledSongs.length) % shuffledSongs.length
        ];
    } else {
      // Shuffle is not enabled, select the previous song in order
      const currentIndex = AllSongs.findIndex(
        (song) => song.id === currentSong.id
      );
      previousSong =
        AllSongs[(currentIndex - 1 + AllSongs.length) % AllSongs.length];
    }

    updateNowPlaying(previousSong);
    updateLastPlayed(previousSong);
    localStorage.setItem("lastplayed", JSON.stringify(previousSong));
  };

  const handleSeekChange = (e) => {
    const newSeekPosition = parseFloat(e.target.value);
    setSeekPosition(newSeekPosition);
    sound.seek(newSeekPosition);
  };

  const audioFunctions = {
    playNextSong,
    playPreviousSong,
    toggleShuffle,
    toggleRepeat,
    togglePlayback,
    handleSeekChange,
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " " || event.key === "Space") {
        event.preventDefault();
      }
      switch (event.key) {
        case " ":
        case "Space":
          togglePlayback();
          break;
        case "ArrowRight":
          playNextSong();
          break;
        case "ArrowLeft":
          playPreviousSong();
          break;
        case "ArrowUp":
          // Increase volume
          // You may need to implement a function to handle volume change
          // For example, setVolume(volume + 0.1);
          break;
        case "ArrowDown":
          // Decrease volume
          // You may need to implement a function to handle volume change
          // For example, setVolume(volume - 0.1);
          break;
        case "S":
          toggleShuffle();
          break;
        case "R":
          toggleRepeat();
          break;
        // Add more shortcuts as needed
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    togglePlayback,
    playNextSong,
    playPreviousSong,
    toggleShuffle,
    toggleRepeat,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && isPlaying) {
        setCurrentTime(sound.seek());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound, isPlaying]);

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
          if (isRepeat) {
            newSound.play();
          } else {
            playNextSong();
          }
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

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
        seekPosition,
        currentTime,
        time,
        duration,
        isRepeat,
        isShuffle,
        ...audioFunctions,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

