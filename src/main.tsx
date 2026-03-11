import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PostsList from "./pages/PostsList";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";

import PrivateRoute from "./routes/PrivateRoute";

import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <PostsList />
      </PrivateRoute>
    )
  },
  {
    path: "/posts/:id",
    element: (
      <PrivateRoute>
        <PostDetail />
      </PrivateRoute>
    )
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);