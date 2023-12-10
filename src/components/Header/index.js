import React from "react";
import styles from "./styles.module.scss"

const Header = ({ heading, description }) => {
  return (
    <div className={styles.wrapper}>
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Header;
