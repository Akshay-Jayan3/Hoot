import React from "react";
import styles from "./styles.module.scss";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { useTheme } from "../../context/ThemeContext";

const Search = ({ showback, HandleBack, value, onChange ,placeholder}) => {
  const { theme } = useTheme();
  return (
    <div className={styles.SearchBar}  style={{ background: theme.background}}>
      {showback && (
        <button onClick={HandleBack}>
          <ChevronLeftOutlinedIcon fontSize="large" />
        </button>
      )}
      <input type="search" placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)}/>
    </div>
  );
};

export default Search;
