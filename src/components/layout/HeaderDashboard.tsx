import { Layout, Select } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import CommonTitle from '../shared/CommonTitle';
import { useGetProfileQuery } from '../../redux/features/auth/authApi';
import { imageUrl } from '../../redux/base/baseApi';
import { useTranslation } from 'react-i18next';

const { Header } = Layout;
const { Option } = Select;

const HeaderDashboard = () => {
  const { i18n } = useTranslation();
  const { data } = useGetProfileQuery(undefined);
  const profileData = data?.data; 


  const location = useLocation();
  const pathName = location?.pathname;
  const formattedPathName =
    pathName === '/'
      ? 'Dashboard'
      : pathName
          .split('/')[1]
          ?.split('-')[0]
          ?.replace(/^\w/, (c) => c.toUpperCase()); // Capitalizes the first letter

  const handleSelectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Header
      style={{
        height: 100,
        background: 'white',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div className="flex items-center justify-between h-full">
        <CommonTitle className="font-[600] text-[28px]">{formattedPathName}</CommonTitle>

        <div className="flex items-center justify-end gap-3 h-full">
          {/* Language Selector */}
          <Select
            defaultValue={"sw"} // Use the current language
            style={{ width: 120, height: '50px' }}
            onChange={handleSelectLanguage}
          >
            <Option value="en">
              <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                <img
                  src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
                  alt="English Flag"
                  style={{ marginRight: 8, width: 16, height: 16 }}
                />
                English
              </div>
            </Option>
            <Option value="sw">
              <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                <img
                  src="/flag.png"
                  alt="Swedish Flag"
                  style={{ marginRight: 8, width: 16, height: 16 }}
                />
                Swedish
              </div>
            </Option>
          </Select>

          {/* Profile Section */}
          <Link
            to="/settings"
            style={{
              height: '55px',
              cursor: 'pointer',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              margin: '10px',
            }}
          >
            <img
              src={
                profileData?.profile?.startsWith('https')
                  ? profileData.profile
                  : `${imageUrl}${profileData?.profile}`
              }
              alt={profileData?.name || 'User Profile'}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '100%',
              }}
            />
            <h2
              style={{
                color: 'black',
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              {profileData?.name || 'Guest'}
            </h2>
          </Link>
        </div>
      </div>
    </Header>
  );
};

export default HeaderDashboard;
