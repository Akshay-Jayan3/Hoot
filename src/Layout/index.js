import React from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useTheme();
  return (
    <>
      <div className="container" style={{ background: theme.background, color: theme.textColor }}>
    
        <div class="sidebar-container">
          <Sidebar />
        </div>
        <div class="main-content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
