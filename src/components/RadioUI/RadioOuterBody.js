import React from 'react';
import styles from './styles.module.scss';

const RadioOuterBody = ({ children }) => {
  return (
    <div className={styles.radioOuterBody}>
      {children}
    </div>
  );
};

export default RadioOuterBody; 