import { Layout, Select } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import CommonTitle from '../shared/CommonTitle';
const { Header } = Layout; 
const { Option } = Select;

const HeaderDashboard = () => { 
    const statusOptions = [
        { value: 'eng', text: 'ENG', imgSrc: '/eng.svg' },
       
      ]; 

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
                    <Select defaultValue="eng" className="w-[114px] h-[48px] rounded-md">
                    {statusOptions.map((option) => (
        <Option key={option.value} value={option.value}>
          <div className="flex items-center">
            <img src={option.imgSrc} alt={option.text} className="w-8 h-4 mr-2" />
            <span>{option.text}</span>
          </div>
        </Option>
      ))}
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
                            src={'/user.svg'}
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
                           Anna Watson
                        </h2>
                    </Link>
                </div>
            </div>
        </div> 

        </Header>
    );
};

export default HeaderDashboard;
