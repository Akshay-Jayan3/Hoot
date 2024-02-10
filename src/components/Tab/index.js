import React from 'react'
import styles from "./styles.module.scss"

const Tab = ({activeTab,tabName,setActiveTab}) => {
  return (
    <button className={activeTab === tabName ? styles.active :styles.normal} onClick={()=>setActiveTab(tabName)}>{tabName}</button>
  )
}

export default Tab