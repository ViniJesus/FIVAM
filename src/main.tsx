import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Register from "./pages/register/Register.tsx";
import Posts from "./pages/posts/Posts.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import { Page_Title } from "./hooks/Page_Title.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PostsList from "./pages/PostsList";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <PostsList />
      </RequireAuth>
    ),
  },

  {
    path: "/posts/:id",
    element: (
      <RequireAuth>
        <PostDetail />
      </RequireAuth>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page_Title router={router} />
    <RouterProvider router={router} />
  </StrictMode>,
);
