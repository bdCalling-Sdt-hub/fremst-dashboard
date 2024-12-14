import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_en from "./en/en.global.json";
import global_sw from "./sw/sw.global.json";

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "sw",
  fallbackLng: "sw",
  defaultNS: "global",
  resources: {
    en: { global: global_en },
    sw: { global: global_sw },
  },
});

export default i18n;