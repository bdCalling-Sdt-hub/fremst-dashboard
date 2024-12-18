import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import ReduxProvider from "./redux/lib/ReduxProvider.tsx";
import { InspectionProvider } from "./context/InspectionContext.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./Translation/i18n.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>   
    <PrivateRoute>
    <ReduxProvider > 
 <InspectionProvider >  
 <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} /> 
    </I18nextProvider>
 </InspectionProvider>
    </ReduxProvider> 
    </PrivateRoute>
  </StrictMode>
);
