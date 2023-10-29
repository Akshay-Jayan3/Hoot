import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
    
        <div class="sidebar-container">
          <Sidebar />
        </div>
        <div class="main-content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
