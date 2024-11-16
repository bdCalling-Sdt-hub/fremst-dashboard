import { TSidebarItem } from './generateSidebarItems';
import { BsBox } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { RxDashboard } from 'react-icons/rx';
import { LuUser2 } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <RxDashboard size={24} />,
    },
    {
        key: 'products',
        label: 'Products',
        path: 'products',
        icon: <BsBox size={24} />,
    },
    {
        key: 'customers',
        label: 'Customers',
        path: 'customers',
        icon: <LuUser2 size={24} />,
    },
    {
        key: 'users',
        label: 'Users',
        path: 'users',
        icon: <LuUser2 size={24} />,
    },
    {
        key: 'inspections',
        label: 'Inspection',
        path: 'inspections',
        icon: <HiOutlineClipboardDocumentList size={24} />,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: 'settings',
        icon: <IoSettingsOutline size={24} />,
    },
    {
        key: 'logout',
        label: 'Log Out',
        path: 'login',
        icon: <TbLogout size={24} />,
    },
];

export default sidebarItems;
