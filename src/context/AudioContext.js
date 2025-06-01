import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { MainContext } from "./MainContext";
import { Howl, Howler } from "howler";

// const EQ_FREQUENCIES = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]; // Hz

export const AudioContext = createContext({
  isPlaying: null,
  currentSong: null,
  AllSongs: null,
  seekPosition: null,
  currentTime: null,
  time: null,
  duration: null,
  isRepeat: null,
  isShuffle: null,
  volume: 1,
  setCurrentSong: () => {},
  setAllSongs: () => {},
  playNextSong: () => {},
  playPreviousSong: () => {},
  toggleShuffle: () => {},
  toggleRepeat: () => {},
  togglePlayback: () => {},
  handleSeekChange: () => {},
  changeVolume: () => {},
  // eqBands: EQ_FREQUENCIES,
  // eqGains: new Array(EQ_FREQUENCIES.length).fill(0),
  // setEqGain: (bandIndex, gainValue) => {},
});

export const AudioProvider = ({ children }) => {
  const { updateLastPlayed, updateNowPlaying, AllSongs } =
    useContext(MainContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(null);
  const [seekPosition, setSeekPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    const storedVolume = localStorage.getItem('playerVolume');
    return storedVolume ? parseFloat(storedVolume) : 1;
  });
  const [time, setTime] = useState({
    min: "00",
    sec: "00",
  });
  // const [eqGains, setEqGains] = useState(new Array(EQ_FREQUENCIES.length).fill(0));
  // const eqNodesRef = useRef([]);
  // const eqInputGainRef = useRef(null);
  // const eqOutputGainRef = useRef(null);
  // const sourceNodeRef = useRef(null);

  const changeVolume = (newVal) => {
    const clampedVolume = Math.max(0, Math.min(1, parseFloat(newVal)));
    setVolumeState(clampedVolume);
    if (sound) {
      sound.volume(clampedVolume);
    }
    Howler.volume(clampedVolume);
    localStorage.setItem('playerVolume', clampedVolume.toString());
  };

  const togglePlayback = () => {
    if (!sound) return;
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

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds === null || isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  const playNextSong = () => {
    if (!currentSong) return;
    sound?.pause();
    if (AllSongs?.length === 0) {
      console.error("No songs available in the playlist.");
      return;
    }
    let nextSongIndex = AllSongs?.findIndex((song) => song.id === currentSong.id);
    if (nextSongIndex === -1 && AllSongs?.length > 0) nextSongIndex = 0;

    let nextSong;
    if (isShuffle) {
      const shuffledSongs = shuffleArray(AllSongs.filter(s => s.id !== currentSong.id));
      nextSong = shuffledSongs.length > 0 ? shuffledSongs[0] : AllSongs[0];
    } else {
      nextSong = AllSongs[(nextSongIndex + 1) % AllSongs?.length];
    }

    if (nextSong) {
        updateNowPlaying(nextSong);
        updateLastPlayed(nextSong);
        localStorage.setItem("lastplayed", JSON.stringify(nextSong));
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const playPreviousSong = () => {
    if (!currentSong) return;
    sound?.pause();
    if (AllSongs?.length === 0) {
      console.error("No songs available in the playlist.");
      return;
    }
    let currentIndex = AllSongs?.findIndex((song) => song.id === currentSong.id);
    if (currentIndex === -1 && AllSongs?.length > 0) currentIndex = 0;

    let previousSong;
    if (isShuffle) {
      const shuffledSongs = shuffleArray(AllSongs.filter(s => s.id !== currentSong.id));
      previousSong = shuffledSongs.length > 0 ? shuffledSongs[shuffledSongs.length -1] : AllSongs[AllSongs.length -1] ;
    } else {
      previousSong = AllSongs[(currentIndex - 1 + AllSongs?.length) % AllSongs?.length];
    }
    if (previousSong){
        updateNowPlaying(previousSong);
        updateLastPlayed(previousSong);
        localStorage.setItem("lastplayed", JSON.stringify(previousSong));
    }
  };

  const handleSeekChange = (e) => {
    if (!sound) return;
    const newSeekPosition = parseFloat(e.target.value);
    sound.seek(newSeekPosition);
    setCurrentTime(newSeekPosition);
  };

  // useEffect(() => {
  //   if (!Howler.ctx) return;

  //   const audioCtx = Howler.ctx;

  //   eqInputGainRef.current = audioCtx.createGain();
  //   eqOutputGainRef.current = audioCtx.createGain();

  //   const newEqNodes = EQ_FREQUENCIES.map((freq, index) => {
  //     const filterNode = audioCtx.createBiquadFilter();
  //     filterNode.type = "peaking";
  //     filterNode.frequency.value = freq;
  //     filterNode.Q.value = 1; 
  //     filterNode.gain.value = eqGains[index]; 
  //     return filterNode;
  //   });

  //   eqInputGainRef.current.connect(newEqNodes[0]);
  //   for (let i = 0; i < newEqNodes.length - 1; i++) {
  //     newEqNodes[i].connect(newEqNodes[i + 1]);
  //   }
  //   newEqNodes[newEqNodes.length - 1].connect(eqOutputGainRef.current);

  //   eqOutputGainRef.current.connect(Howler.masterGain);
    
  //   eqNodesRef.current = newEqNodes;

  //   return () => {
  //     eqInputGainRef.current?.disconnect();
  //     eqOutputGainRef.current?.disconnect();
  //     newEqNodes.forEach(node => node.disconnect());
  //   };
  // }, [Howler.ctx]);

  // const setEqGain = (bandIndex, gainValue) => {
  //   if (eqNodesRef.current[bandIndex]) {
  //     const newGain = parseFloat(gainValue);
  //     eqNodesRef.current[bandIndex].gain.value = newGain;
  //     setEqGains(prevGains => {
  //       const nextGains = [...prevGains];
  //       nextGains[bandIndex] = newGain;
  //       return nextGains;
  //     });
  //   }
  // };

  useEffect(() => {
    Howler.volume(volume);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      if (event.key === " " || event.key === "Space") {
        event.preventDefault();
      }
      switch (event.key) {
        case " ":
          togglePlayback();
          break;
        case "ArrowRight":
          playNextSong();
          break;
        case "ArrowLeft":
          playPreviousSong();
          break;
        case "ArrowUp":
          changeVolume(volume + 0.1);
          break;
        case "ArrowDown":
          changeVolume(volume - 0.1);
          break;
        case "s":
        case "S":
          toggleShuffle();
          break;
        case "r":
        case "R":
          toggleRepeat();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, currentSong, AllSongs, isShuffle, isRepeat, volume, changeVolume, playNextSong, playPreviousSong, togglePlayback, toggleShuffle, toggleRepeat]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && isPlaying && sound.playing()) {
        const currentSeek = sound.seek();
        setCurrentTime(currentSeek);
        setSeekPosition(currentSeek);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [sound, isPlaying]);

  useEffect(() => {
    if (currentSong && currentSong.path) {
      if (sound) {
        sound.stop();
        // if (sourceNodeRef.current && eqInputGainRef.current) {
        //     try {
        //         sourceNodeRef.current.disconnect(eqInputGainRef.current);
        //     } catch (e) {
        //         console.warn("Error disconnecting previous sound node from EQ:", e);
        //     }
        // }
        // sourceNodeRef.current = null;
      }
      const newSound = new Howl({
        src: [currentSong.path],
        autoplay: true,
        volume: volume,
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onend: () => {
          setIsPlaying(false);
          if (isRepeat) {
            newSound.play();
          } else {
            playNextSong();
          }
        },
        onload: () => {
          setDuration(newSound.duration());
          // if (newSound._sounds.length > 0 && newSound._sounds[0]._node && eqInputGainRef.current) {
          //   const soundInternalNode = newSound._sounds[0]._node;
            
          //   sourceNodeRef.current = soundInternalNode;
            
          //   try {
          //     if (soundInternalNode.bufferSource) { 
          //     } else if (soundInternalNode.connect && soundInternalNode.disconnect) { 
          //       soundInternalNode.disconnect(); 
          //       soundInternalNode.connect(eqInputGainRef.current); 
          //     }
          //   } catch (e) {
          //     console.error("Error rerouting audio for EQ:", e);
          //   }
          // } else {
          //    console.warn("Could not get sound node for EQ or EQ input not ready.");
          // }
        },
        onloaderror: (id, err) => {
          console.error("Howler onloaderror:", err, "for song:", currentSong.title);
          setIsPlaying(false);
        },
        onplayerror: (id, err) => {
          console.error("Howler onplayerror:", err, "for song:", currentSong.title);
          setIsPlaying(false);
        },
      });
      setSound(newSound);
    } else {
      if (sound) {
        sound.stop();
        setSound(null);
      }
      setIsPlaying(false);
      setDuration(null);
      setCurrentTime(0);
      setSeekPosition(0);
      setTime({ min: "00", sec: "00" });
    }
    return () => {
      if (sound) {
        sound.stop();
        // if (sourceNodeRef.current && eqInputGainRef.current) {
        //     try {
        //         sourceNodeRef.current.disconnect(eqInputGainRef.current);
        //     } catch (e) {
        //         console.warn("Error disconnecting sound node from EQ on cleanup:", e);
        //     }
        // }
        // sourceNodeRef.current = null;
      }
    };
  }, [currentSong]);

  useEffect(() => {
    if (duration) {
      const min = "0" + Math.floor(duration / 60);
      const secRemain = Math.floor(duration % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [currentSong, duration]);

  const value = {
    isPlaying,
    currentSong,
    AllSongs,
    seekPosition,
    currentTime,
    duration,
    isShuffle,
    isRepeat,
    time,
    volume,
    // eqBands: EQ_FREQUENCIES,
    // eqGains,
    // setEqGain,
    changeVolume,
    setCurrentSong,
    togglePlayback,
    playNextSong,
    playPreviousSong,
    toggleShuffle,
    toggleRepeat,
    formatTime,
    handleSeekChange,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
