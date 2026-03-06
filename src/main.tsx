import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext.tsx";
// import { SidebarProvider } from "./context/SidebarContext.tsx";
import { Page_Title } from "./hooks/Page_Title.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
