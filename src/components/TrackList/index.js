import React from 'react'
import Track from '../Track'

const TrackList = ({tracks}) => {
  return (
    <div>{tracks && tracks.length > 0 ? <ul>{ tracks?.map((track)=>(<li key={track.id}><Track/></li>))}</ul>:'no songs'}</div>
  )
}

export default TrackList