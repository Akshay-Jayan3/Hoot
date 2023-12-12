import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const folderSelected = localStorage.getItem("selected-folder");
  return (
    <>{folderSelected ? <div>{children}</div> : <Navigate to={"/start"} />}</>
  );
};

export default ProtectedRoute;
