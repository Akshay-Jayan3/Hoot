import React from "react";
import FolderSelection from "../../components/FolderSelection";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import Header from "../../components/Header";

const Settings = () => {
  return (
    <div className="page">
      <Header heading={'Settings'} description={'Customize Your Experience'}/>
      <div className="section">
        <div className="setting-type"><SettingsSuggestOutlinedIcon/><h2>General Settings</h2></div>
       
        <div className="setting">
          <p>Please select the folder where you keep your music files. Once you've chosen your music folder, we'll organize your songs and make them accessible for you.</p>
          <FolderSelection/>
        </div>

        {/* <div className="setting">
          <p>Theme Selection:</p>
        </div>

        <div className="setting">
          <p>Language & Region:</p>
        </div> */}
      </div>
    </div>
  );
};

export default Settings;
