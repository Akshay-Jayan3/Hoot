import React from 'react';
import styles from './styles.module.scss';
// No longer importing logo from here as it's not used in the center mesh anymore
// import logo from '../../../assects/logo.svg'; 

const SpeakerGrill = ({ isPlaying }) => {
  // Determine number of dots based on a desired density or fixed number
  const numberOfRows = 25; // Increased for denser mesh
  const numberOfCols = 18; // Increased for denser mesh
  const totalDots = numberOfRows * numberOfCols;

  // grillFrameClasses no longer needs to be dynamic for vibration
  const grillFrameClasses = styles.speakerGrillFrame;

  const grillMeshClasses = `
    ${styles.speakerGrillMesh}
    ${isPlaying ? styles.grillVibrating : ''} // Apply vibrating class to mesh
  `;

  return (
    <div className={grillFrameClasses}> {/* Frame does not vibrate */}
      {/* Screw elements - direct children of the frame */}
      <div className={`${styles.grillScrew} ${styles.topLeft}`}></div>
      <div className={`${styles.grillScrew} ${styles.topRight}`}></div>
      <div className={`${styles.grillScrew} ${styles.bottomLeft}`}></div>
      <div className={`${styles.grillScrew} ${styles.bottomRight}`}></div>

      <div className={grillMeshClasses.trim()}> {/* Mesh vibrates */}
        {/* Metallic Text in the center of the mesh */}
        <div className={styles.metallicPlate}>
        <div className={styles.engravedLabel}>HOOT</div>
      </div>
        {/* Grill dots - rendered after logo so logo can be on top if needed with z-index */}
        {Array.from({ length: totalDots }).map((_, index) => (
          <div key={`dot-${index}`} className={styles.grillDot}></div>
        ))}
      </div>
    </div>
  );
};

export default SpeakerGrill; 