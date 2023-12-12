import React from "react";
import { useNavigate } from "react-router-dom";
const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="start">
      <div className="startSection">
        <h3>
          {" "}
          Ready to Set the Vibe? Customize your experience in Settings to
          Gets started!
        </h3>
        <div>
          {" "}
          <p>
            📁 Add your beats! Don't forget to include a folder in the Music
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
