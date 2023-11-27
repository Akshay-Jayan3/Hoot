import React, { lazy, Suspense } from "react";
import LoadingScreen from "../components/Loader";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "../Layout";
import ProtectedRoute from "./ProtectedRoute";

const Songs = lazy(() => import("../pages/Songs"));
const Albums = lazy(() => import("../pages/Albums"));
const Artists = lazy(() => import("../pages/Artists"));
const Playlists = lazy(() => import("../pages/Playlists"));
const Favourites = lazy(() => import("../pages/Favourites"));
const Settings = lazy(() => import("../pages/Setting"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen message={"Loading ..."}/>}>
        <Layout>
          <Routes>
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
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="*" element={<Error404 />} /> */}
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
