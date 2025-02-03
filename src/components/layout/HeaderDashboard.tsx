import { Layout, Select } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetProfileQuery } from "../../redux/features/auth/authApi";
import CommonTitle from "../shared/CommonTitle";
import axios from "axios";
import { useLanguage } from "../shared/LanguageContext";

const { Header } = Layout;
const { Option } = Select;

const GOOGLE_TRANSLATE_API_KEY = "AIzaSyASGJuvRPz0iZEDGiULxeAm3jtNMtpDh84"; 

const HeaderDashboard = () => {
  const { data } = useGetProfileQuery(undefined);
  const profileData = data?.data;
  const location = useLocation();
  const { language, setLanguage } = useLanguage(); 

  const pathName = location?.pathname;

  const formattedPathName =
    pathName === "/"
      ? "Dashboard"
      : pathName
          .split("/")[1]
          ?.split("-")[0]
          ?.replace(/^\w/, (c) => c.toUpperCase());

  const [translatedText, setTranslatedText] = useState(formattedPathName);

  useEffect(() => {
    translateText(formattedPathName, language);
  }, [formattedPathName, language]); 

  const translateText = async (text: string, targetLang: string) => {
    if (!text) return;

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
        {
          q: text,
          target: targetLang,
        }
      );
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value); 
  };

  return (
    <Header
      style={{
        height: 100,
        background: "white",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div className="flex items-center justify-between h-full">
        <CommonTitle className="font-[600] text-[28px]">{translatedText}</CommonTitle>

        <div className="flex items-center justify-end gap-3 h-full">
          {/* Language Selector */}
          <Select
            value={language}
            style={{ width: 120, height: "50px" }}
            onChange={handleLanguageChange}
          >
            <Option value="en">
              <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
                <img
                  src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
                  alt="English Flag"
                  style={{ marginRight: 8, width: 16, height: 16 }}
                />
                English
              </div>
            </Option>
            <Option value="sw">
              <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
                <img src="/flag.png" alt="Swedish Flag" style={{ marginRight: 8, width: 16, height: 16 }} />
                Swedish
              </div>
            </Option>
          </Select>

          {/* Profile Section */}
          <Link
            to="/settings"
            style={{
              height: "55px",
              cursor: "pointer",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              margin: "10px",
            }}
          >
            <img
              src={profileData?.profile?.startsWith("https") ? profileData.profile : `/path/to/images/${profileData?.profile}`}
              alt={profileData?.name || "User Profile"}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
              }}
            />
            <h2 style={{ color: "black", fontSize: "16px", fontWeight: "600" }}>
              {profileData?.name || "Guest"}
            </h2>
          </Link>
        </div>
      </div>
    </Header>
  );
};

export default HeaderDashboard;
