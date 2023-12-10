import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

const ScrollingText = ({ scroll ,children}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let scrollInterval;

    if (scroll) {
      scrollInterval = setInterval(() => {
        setScrollPosition((prevPosition) => (prevPosition < 100 ? prevPosition + 1 : 0));
      }, 50);
    }

    return () => clearInterval(scrollInterval);
  }, [scroll]);

  return (
    <div className={styles.scrollingTextContainer}>
      <div className={`${styles.scrollingText} ${scroll && styles.animate }`}style={{ transform: scroll ? `translateX(-${scrollPosition}%)` : 'translateX(0%)' }}>
        {children}
      </div>
    </div>
  );
};

export default ScrollingText;
