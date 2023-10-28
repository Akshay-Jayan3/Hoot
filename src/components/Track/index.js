import React from "react";
import styles from "./styles.module.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Track = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.thumbnail}><img/></div>
        <div className={styles.titleArtist}><p className={styles.title}>title</p><p className={styles.artist}>Singer</p></div>
      </div>
      <div>Album</div>
      <div>duration</div>
      <div><FavoriteBorderOutlinedIcon/></div>
      {/* <div>more</div> */}
    </div>
  );
};

export default Track;
