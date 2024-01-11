import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../Layout";

const ProtectedRoute = ({ children }) => {
  const folderSelected = localStorage.getItem("selected-folder");
  return (
    <>{folderSelected ? <Layout>{children}</Layout> : <Navigate to={"/start"} />}</>
  );
};

export default ProtectedRoute;
