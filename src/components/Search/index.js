import React from 'react'
import styles from './styles.module.scss'

const Search = () => {
  return (
    <div className={styles.SearchBar}><input type='search' placeholder='Search your favourite Songs'/></div>
  )
}

export default Search