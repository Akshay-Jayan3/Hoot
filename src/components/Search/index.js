import React from 'react'
import styles from './styles.module.scss'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

const Search = ({showback,HandleBack}) => {
  return (
    <div className={styles.SearchBar}>{showback && <button onClick={HandleBack}><ChevronLeftOutlinedIcon fontSize="large"/></button>}<input type='search' placeholder='Search your favourite Songs'/></div>
  )
}

export default Search