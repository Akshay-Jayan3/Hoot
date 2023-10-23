import React, { useEffect, useState } from "react";


const useFetchSongs = ({ selectedFolder }) => {
  const [musicFiles, setMusicFiles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fs = window.electron.fs;

  const fetchMusic = useCallback(async () => {
    try {
      if (selectedFolder) {
        // Check if the result is already cached
        fs.readdir(selectedFolder, (err, files) => {
          if (err) {
            console.error(err);
            setError(err);
          } else {
            const musicFiles = files.filter((file) => {
              // Filter files with allowed extensions (e.g., .mp3, .wav)
              return /\.(mp3|wav)$/.test(file);
            });
            setMusicFiles(musicFiles);
          }
        });
      }
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  }, [selectedFolder]);

  useEffect(() => {
    fetchMusic();
  }, [selectedFolder]);

  return { musicFiles, loading, error };
};

export default useFetchSongs;
