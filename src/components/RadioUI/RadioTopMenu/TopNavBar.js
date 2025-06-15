import React from 'react';
import styles from '../styles.module.scss';
import sidebarData from '../../../utils/sidebarData';
import { Link, useLocation } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '../../../context/ThemeContext';

const TopNavBar = () => {
  const location = useLocation();
  const { toggleRetro } = useTheme();

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
      <button className={`${styles.topNavItem}`} onClick={toggleRetro}><LogoutIcon/></button>
    </nav>
  );
};

export default TopNavBar; 