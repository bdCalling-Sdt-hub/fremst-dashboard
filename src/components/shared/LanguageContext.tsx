// LanguageContext.js
import  { createContext, useContext, useState } from "react";

// Create Context
const LanguageContext = createContext();

// Create a custom hook to use the LanguageContext
export const useLanguage = () => {
  return useContext(LanguageContext);
};

// Create a LanguageProvider to wrap your app
export const LanguageProvider = ({ children }:{children: React.ReactNode}) => {
  const [language, setLanguage] = useState("en"); // Default language is English

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
