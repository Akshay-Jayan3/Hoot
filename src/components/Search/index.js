import React from "react";
import styles from "./styles.module.scss";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTheme } from "../../context/ThemeContext";

const Search = ({ showback, HandleBack, value, onChange, placeholder }) => {
  const { dynamicTheme } = useTheme();
  return (
    <div className={styles.SearchBar}>
      {showback && (
        <button onClick={HandleBack}>
          <ChevronLeftOutlinedIcon fontSize="large" />
        </button>
      )}
      <div className={styles.inputContainer}>
      <label htmlFor="search">
        <SearchRoundedIcon className={styles.searchIcon}/>
        <input
          id="search"
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.search}
        ></input>
      </label>
      </div>
     
    </div>
  );
};

export default Search;
