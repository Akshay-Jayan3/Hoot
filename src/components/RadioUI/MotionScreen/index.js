import React from 'react';
import styles from './styles.module.scss';

const MotionScreen = ({ children, isRadioOn }) => {
  const screenContentClasses = `
    ${styles.screenContent}
    ${!isRadioOn ? styles.screenContentOff : ''}
  `;

  const motionScreenContainerClasses = `
    ${styles.motionScreenContainer}
    ${!isRadioOn ? styles.motionScreenContainerOff : ''}
  `;

  return (
    <div className={motionScreenContainerClasses.trim()}>
      <div className={styles.screenBorder}>
        <div className={screenContentClasses.trim()}>
          {isRadioOn && (
            <div className={styles.screenScrollArea}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotionScreen;