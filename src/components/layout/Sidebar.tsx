import { ConfigProvider, Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import your CSS file
import logo from "../../assets/logo.png"
const { Sider } = Layout;

const Sidebar = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: '#292C61', 
                    colorText: '#fff',
                },
                components: {
                    Menu: {
                        itemSelectedColor: '#fff',
                        itemBorderRadius: 0,
                        itemHeight: 50,
                    },
                },
            }}
        >
            <Sider
                width={290}
                theme="light"
                style={{ background: '#292C61' }}
                breakpoint="lg"
                collapsedWidth="0"
            >
                {/* Logo */}
                <Link to="/">
                    <div className=' mt-[48px] flex items-center justify-center border-b-[2px] border-[#154F92] mx-5 mb-[32px] '
                    >
                     <img src={logo} alt="" className='w-[190px]' /> 
                    
                    </div>
                </Link>
                

                <Menu
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={sidebarItemsGenerator(sidebarItems)}
                    className="custom-menu"
                />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
