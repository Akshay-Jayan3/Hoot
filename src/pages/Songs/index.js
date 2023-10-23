import React , { useContext } from "react";
import Header from "../../components/Header";
import { MainContext } from "../../context/MainContext";

const Songs = () => {
  const {folderStored} = useContext(MainContext)
  return (
    <div className="page">
      <div className="search-container"></div>
      <Header heading={'Music For You'} description={'Listen to your favourite songs'}/>
     
      <div className="songs-container">
      </div>
    </div>
  );
};

export default Songs;
