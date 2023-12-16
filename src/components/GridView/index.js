import React from "react";
import styles from "./styles.module.scss";
import Album from "../GridItem";
import norecord from "../../assects/nofile.png";

const GridView = ({
  items,
  HandleFile,
  HandleSelected,
  type,
  HandleAction,
}) => {
  return (
    <>
      {items?.length > 0 && (
        <div className={styles.itemNo}>
          <p>{items && items?.length} {items?.length > 1 ? 'albums found':"album found" }</p>
        </div>
      )}
      <div className={styles.AlbumContainer}>
        {items && items?.length > 0 ? (
          items?.map((item, i) => (
            <Album
              item={item}
              HandleFile={HandleFile}
              HandleSelected={HandleSelected}
              type={type}
              HandleAction={HandleAction}
              key={i}
            />
          ))
        ) : (
          <div className={styles.notfound}>
            <img src={norecord} alt="no file found" />
            <p>no records found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default GridView;
