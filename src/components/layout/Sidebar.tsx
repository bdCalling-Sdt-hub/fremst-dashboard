import { ConfigProvider, Layout, Menu } from 'antd';
import { sidebarItemsGenerator, TSidebarItem } from '../../utils/generateSidebarItems';

import { BsBox } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { RxDashboard } from 'react-icons/rx';
import { LuUser2 } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'; 
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import your CSS file
import logo from "../../assets/logo.png"
const { Sider } = Layout;

const Sidebar = () => {  
    const {t} = useTranslation();

    const sidebarItems: TSidebarItem[] = [
        {
            key: 'dashboard',
            label: t('dashboard'),
            path: '',
            icon: <RxDashboard size={24} />,
        },
        {
            key: 'products',
            label: t('products'),
            path: 'products',
            icon: <BsBox size={24} />,
        },
        {
            key: 'customers',
            label: t('customer'),
            path: 'customers',
            icon: <LuUser2 size={24} />,
        },
        {
            key: 'employees',
            label: t('employees'),
            path: 'employees',
            icon: <LuUser2 size={24} />,
        },
        {
            key: 'inspections',
            label: t('inspection'),
            path: 'inspections',
            icon: <HiOutlineClipboardDocumentList size={24} />,
        },
        {
            key: 'settings',
            label: t('settings'),
            path: 'settings',
            icon: <IoSettingsOutline size={24} />,
        },
        {
            key: 'logout',
            label: t('logOut'),
            path: 'login',
            icon: <TbLogout size={24} />,
        },
    ]; 

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
