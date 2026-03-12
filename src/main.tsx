import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/register/Register.tsx";
import Posts from "./pages/posts/Posts.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import { Page_Title } from "./hooks/Page_Title.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login" />,
  },
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/postagens",
    element: (
      <RequireAuth>
        <Posts />
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
