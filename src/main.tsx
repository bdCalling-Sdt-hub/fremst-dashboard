import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import ReduxProvider from "./redux/lib/ReduxProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode> 
    <ReduxProvider > 

    <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>
);
