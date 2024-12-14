import React from 'react';
import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import { useTranslation } from 'react-i18next';


const Profile: React.FC = () => { 
    const {t} = useTranslation(); 

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: t('editProfile'),
            children: <EditProfile />,
        },
    
        {
            key: '3',
            label: t('changePassword') ,
            children: <ChangePassword />,
        },
    ];
     
    return (
        <div className=" p-6 bg-white rounded-lg">
        <ConfigProvider>
            <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
    </div>
) 
}
   


export default Profile;
