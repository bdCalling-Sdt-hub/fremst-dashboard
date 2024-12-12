import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import ReduxProvider from "./redux/lib/ReduxProvider.tsx";
import { InspectionProvider } from "./context/InspectionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>  
    <ReduxProvider > 
 <InspectionProvider > 
    <RouterProvider router={router} />
 </InspectionProvider>
    </ReduxProvider>
  </StrictMode>
);
