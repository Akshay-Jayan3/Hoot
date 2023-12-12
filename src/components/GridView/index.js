import React from "react";
import styles from "./styles.module.scss";
import Album from "../GridItem";

const GridView = ({
  items,
  HandleFile,
  HandleSelected,
  type,
  HandleAction,
}) => {
  return (
    <div className={styles.AlbumContainer}>
      {items && items?.length > 0
        ? items?.map((item, i) => (
            <Album
              item={item}
              HandleFile={HandleFile}
              HandleSelected={HandleSelected}
              type={type}
              HandleAction={HandleAction}
              key={i}
            />
          ))
        : "no records found"}
    </div>
  );
};

export default GridView;
