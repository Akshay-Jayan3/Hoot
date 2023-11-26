import React from "react";
import styles from "./styles.module.scss";
import Album from "../Album";

const AlbumList = ({ albums, HandleFile,setSelectedAlbum,count,type}) => {
  return (
    <div
      className={styles.AlbumContainer}
    >
      {albums && albums?.length > 0
        ? albums?.map((album, i) => <Album album={album} HandleFile={HandleFile} setSelectedAlbum={setSelectedAlbum} count={count} type={type}/>)
        : "no songs"}
    </div>
  );
};

export default AlbumList;
