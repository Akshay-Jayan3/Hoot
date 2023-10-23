import React from 'react';
import './index.css'; // Import a CSS file for styling

function MusicPlayer() {
    return (
        <div className="glass-overlay">
          <div className="ui-container">
            <div className="song-info">
              <h2>Song Title</h2>
              <p>Artist Name</p>
            </div>
            <div className="player-controls">
              <button className="neumorphic-button play-button">Play</button>
              <button className="neumorphic-button pause-button">Pause</button>
              <button className="neumorphic-button next-button">Next</button>
            </div>
          </div>
        </div>
  );
}

export default MusicPlayer;
