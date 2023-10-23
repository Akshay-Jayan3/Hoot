import React, { useState, useEffect ,useRef } from "react";

const MusicPlayer = ({ selectedMusicFile }) => {
  
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef]);

   // Re-render when a new music file is selected or isPlaying changes

  return (
    <div>
      {selectedMusicFile && (
        <div>
          <h3>Now Playing: {selectedMusicFile}</h3>
          <div>
            <audio src={selectedMusicFile} ref={audioRef} />
          </div>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
