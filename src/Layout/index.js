import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div class="container">
      <div class="sidebar-container">
        <Sidebar />
      </div>

      <div class="main-content">{children}</div>

      {/* <div class="current-song">
        <h2>Currently Playing</h2>
        <p>Song Title</p>
        <p>Artist Name</p>
      </div> */}
    </div>
  );
};

export default Layout;
