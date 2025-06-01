import React from 'react';
import styles from '../styles.module.scss';
import sidebarData from '../../../utils/sidebarData';
import { Link, useLocation } from 'react-router-dom';

const TopNavBar = () => {
  const location = useLocation();

  return (
    <nav className={styles.topNavBar}>
      {sidebarData.map((item) => {
        if (item.title === 'Settings') {
          return null;
        }
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`${styles.topNavItem} ${location.pathname === item.path ? styles.active : ''}`}
            aria-label={item.title}
          >
            {item.icon}
          </Link>
        );
      })}
    </nav>
  );
};

export default TopNavBar; 