import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastProvider } from "./context/ToastContext.tsx";
import Register from "./pages/register/Register.tsx";
// import { SidebarProvider } from "./context/SidebarContext.tsx";
// import { Page_Title } from "./hooks/Page_Title.tsx";

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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      {/* <SidebarProvider> */}
      {/* <Page_Title router={router} /> */}
      <RouterProvider router={router} />
      {/* </SidebarProvider> */}
    </ToastProvider>
  </StrictMode>,
);
