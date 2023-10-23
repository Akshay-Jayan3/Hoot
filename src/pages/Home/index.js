import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <Link to={"/library"}>Library</Link>
    </div>
  );
};

export default Home;
