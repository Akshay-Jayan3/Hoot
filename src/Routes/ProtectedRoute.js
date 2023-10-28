import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const folderSelected = localStorage.getItem('selected-folder')
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute