import React from "react";
import sidebarData from "../../utils/sidebarData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "../../assects/logo.svg"
import { useTheme } from "../../context/ThemeContext";

const Sidebar = () => {
  const location = useLocation();
  const { toggleRetro, isRetro } = useTheme();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="Hoot Logo" />
      </div>
      
      {/* Reverted to a normal button for theme toggle */}
      <button 
        className={styles.themeToggleButton} 
        onClick={toggleRetro}
      >
        {isRetro ? "Main Theme" : "Retro Theme"}
      </button>

      <div className={styles.content}>
        <ul className={styles.sidebarLinks}>
          {sidebarData.map((link) => (
            <li key={link.id} className={styles.sidebarLink}>
              {
                <Link
                  to={link.path}
                  className={
                    link.path === location.pathname ? styles.active : ""
                  }
                >
                  {link.icon}
                  {link.title}
                </Link>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
