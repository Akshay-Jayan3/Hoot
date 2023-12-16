import React from "react";
import sidebarData from "../../utils/sidebarData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <button onClick={()=>navigate("/")}>Hoot</button>
      </div>
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
