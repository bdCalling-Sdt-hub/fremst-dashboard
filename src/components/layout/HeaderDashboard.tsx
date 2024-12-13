import { Layout, Select } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import CommonTitle from '../shared/CommonTitle';
import { useGetProfileQuery } from '../../redux/features/auth/authApi';
import { imageUrl } from '../../redux/base/baseApi';
const { Header } = Layout; 
const { Option } = Select;

const HeaderDashboard = () => {  
    const {data} = useGetProfileQuery(undefined)  
    const profileData = data?.data 



      const location = useLocation();     

      const pathName = location?.pathname;
      const formattedPathName = pathName === "/" 
      ? "Dashboard" 
      : pathName
          .split('/')[1] 
          ?.split('-')[0] 
          ?.charAt(0).toUpperCase() + 
        pathName.split('/')[1]?.split('-')[0]?.slice(1);

    return (
        <Header className=''
            style={{
                height: 100,
                background: 'white',
                width: '100%',
                overflow: 'hidden',
            }}
        > 

        <div className='flex items-center justify-between h-full'> 
 <CommonTitle className='font-[600] text-[28px] '>{formattedPathName}</CommonTitle>
            <div className="flex items-center justify-end gap-3 h-full">
                <div>
                    {/* languages */}
                    <Select
                // value={selectedLanguage} 
                style={{ width: 120 , height:"50px" }}
                // onChange={handleSelectLanguage}
              >
                <Option value="en">
                  <div style={{ display: "flex", alignItems: "center", height:"40px"  }}>
                    <img
                      src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
                      alt="English"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    English
                  </div>
                </Option>
                <Option value="es">
                  <div style={{ display: "flex", alignItems: "center" , height:"40px" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    German
                  </div>
                </Option>
              </Select> 
                </div>
                <div>
                    {/* profile */}

                    <Link
                        to={'/profile'}
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
                            src={profileData?.profile?.startsWith("https") ? profileData?.profile : `${imageUrl}${profileData?.profile}`}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '100%',
                            }}
                            alt=""
                        />
                        <h2
                            style={{
                                color: 'black',
                                fontSize: '16px',
                                fontWeight: '600',
                            }}
                        >
                           {profileData?.name}
                        </h2>
                    </Link>
                </div>
            </div>
        </div> 

        </Header>
    );
};

export default HeaderDashboard;
