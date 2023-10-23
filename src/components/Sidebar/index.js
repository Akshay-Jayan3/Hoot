import React from "react";
import sidebarData from "../../utils/sidebarData";
import { Link ,useLocation} from "react-router-dom";
import styles from "./styles.module.scss";

const Sidebar = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div className={styles.container}>
      <div>
        <p>Logo</p>
      </div>
      <div className={styles.content}>
        <ul className={styles.sidebarLinks}>
          {sidebarData.map((link) => (
            <li key={link.id} className={styles.sidebarLink}>
              {<Link to={link.path} className={link.path === location.pathname ? styles.active : ''}>{link.icon}{link.title}</Link >}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
