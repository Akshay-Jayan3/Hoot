import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

const ScrollingText = ({ text, scroll }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  function truncateText(text, maxLength) {
    if (text?.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }
 
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
      <div className={`${styles.scrollingText} ${scroll ? styles.animate : ''}`} style={{ transform: `translateX(-${scrollPosition}%)`}}>
        {scroll ? text : truncateText(text,30)}
      </div>
    </div>
  );
};

export default ScrollingText;
