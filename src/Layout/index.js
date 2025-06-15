import React from "react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import RetroNeonPlayer from "../components/RadioUI";

const Layout = ({ children }) => {
  const { theme, isRetroTheme, dynamicTheme } = useTheme();
  console.log(dynamicTheme.background
  )

  return (
    <div key={isRetroTheme ? "retro" : "normal"}>
      {isRetroTheme ? (
        <RetroNeonPlayer>{children}</RetroNeonPlayer>
      ) : (
        <div
          className="container"
          style={{
            background: dynamicTheme?.background || theme.background ,
            color: dynamicTheme.textColor || theme.textColor ,
            transition: "background 0.6s ease, color 0.4s ease",
          }}
        >
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="main-content">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
