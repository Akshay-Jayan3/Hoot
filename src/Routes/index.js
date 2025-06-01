import React, { lazy, Suspense } from "react";
import LoadingScreen from "../components/Loader";
import StaticLoadingScreen from "../components/StaticLoadingScreen";
import { useTheme } from "../context/ThemeContext";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Songs = lazy(() => import("../pages/Songs"));
const Albums = lazy(() => import("../pages/Albums"));
const Artists = lazy(() => import("../pages/Artists"));
const Playlists = lazy(() => import("../pages/Playlists"));
const Favourites = lazy(() => import("../pages/Favourites"));
const Settings = lazy(() => import("../pages/Setting"));
const Start = lazy(() => import("../pages/Start"));

const AppRouter = () => {
  const { isRetroTheme } = useTheme();

  return (
    <Router basename="/">
      <Suspense fallback={<LoadingScreen message={"Loading ..."} />}>
        <Routes>
          <Route path="/start" element={<Start />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Songs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/albums"
            element={
              <ProtectedRoute>
                <Albums />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artists"
            element={
              <ProtectedRoute>
                <Artists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlists"
            element={
              <ProtectedRoute>
                <Playlists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={         
              
                <Settings />
            }
          />
          {/* <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
