import React from "react";
import styles from "./styles.module.scss";
import Album from "../Album";

const AlbumList = ({
  albums,
  HandleFile,
  HandleSelected,
  count,
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
              count={count}
              type={type}
              HandleAction={HandleAction}
            />
          ))
        : "no songs"}
    </div>
  );
};

export default AlbumList;
