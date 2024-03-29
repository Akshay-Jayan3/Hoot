import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assects/logo.svg"
const Start = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div
      className="start"
      style={{
        background: theme.background,
        color: theme.textColor,
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="startSection">
        <img src={logo} alt="logo"/>
        <h1>Welcome to Hoot</h1>

        <div className="content">
          <h3>
            Ready to Set the Vibe? Customize your experience in the settings to get's
            started!
          </h3>
          <p>
            📁 Add your beats! Don't forget to include a folder in the music
            settings
          </p>
        </div>

        <button className="gotosetting" onClick={() => navigate("/settings")}>
          Customize Your Experience
        </button>
      </div>
    </div>
  );
};

export default Start;
