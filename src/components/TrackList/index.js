import React from 'react'
import Track from '../Track'
import styles from './styles.module.scss'

const TrackList = ({tracks}) => {
  return (
    <div className={styles.trackContainer}>{tracks && tracks.length > 0 ? tracks?.map((track,i)=>(<Track track={track} key={i}/>)):'no songs'}</div>
  )
}

export default TrackList