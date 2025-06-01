import React from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import RetroNeonPlayer from "../components/RadioUI";

const Layout = ({ children }) => {
  const { theme ,isRetroTheme } = useTheme();
  console.log(isRetroTheme);
 

  return (
    <div>
      {isRetroTheme ? <RetroNeonPlayer>{children}</RetroNeonPlayer> : <div className="container" style={{ background: theme.background, color: theme.textColor, transition: 'background-color 0.3s ease' }}>

        <div class="sidebar-container">
          <Sidebar />
        </div>
        <div class="main-content">{children}</div>
      </div>}
    </div>



  );
};

export default Layout;
