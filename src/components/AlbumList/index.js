import React from "react";
import styles from "./styles.module.scss";
import Album from "../Album";

const AlbumList = ({
  albums,
  HandleFile,
  HandleSelected,
  type,
  HandleAction,
}) => {
  return (
    <div className={styles.AlbumContainer}>
      {albums && albums?.length > 0
        ? albums?.map((album, i) => (
            <Album
              album={album}
              HandleFile={HandleFile}
              HandleSelected={HandleSelected}
              type={type}
              HandleAction={HandleAction}
              key={i}
            />
          ))
        : "no songs"}
    </div>
  );
};

export default AlbumList;
