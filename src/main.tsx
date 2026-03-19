import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Register from "./pages/register/Register.tsx";
// import RequireAuth from "./components/RequireAuth.tsx";
import { Page_Title } from "./hooks/Page_Title.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Login from "./pages/Login";
import PostsList from "./pages/posts/PostsList.tsx";
import PostDetail from "./pages/posts/PostDetail.tsx";
import Menu_Login from "./pages/login/Menu_Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsList />,
  },
  {
    path: "/login",
    element: <Menu_Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/posts/:id",
    element: <PostDetail />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page_Title router={router} />
    <RouterProvider router={router} />
  </StrictMode>,
);
