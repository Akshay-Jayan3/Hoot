import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const folderSelected = localStorage.getItem('selected-folder')
  return (
    <div>{folderSelected ? children:<Navigate to={'/settings'}/>}</div>
  )
}

export default ProtectedRoute