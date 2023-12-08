import React from "react";
import styles from "./styles.module.scss";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

const Search = ({ showback, HandleBack, value, onChange ,placeholder}) => {
  return (
    <div className={styles.SearchBar}>
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
