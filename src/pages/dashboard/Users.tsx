// @ts-nocheck 
import { ConfigProvider, Flex, Table } from 'antd';
import { useGetAllUsersQuery, useHoldUserMutation } from '../../redux/features/Dashboard/userApi';
import { useEffect, useState } from 'react';
import AddUserModal from './AddUserModal';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../components/shared/LanguageContext';
import { translateText } from '../../components/shared/translationUtils';

const Users = () => {  
    const [page , setPage] = useState(1); 
    const [open , setOpen] = useState(false);
    const { data: allUsers, refetch } = useGetAllUsersQuery(page);   
    const [holdUser] = useHoldUserMutation();
    const { t } = useTranslation(); 
    const { language } = useLanguage();  
    const [translatedUsers, setTranslatedUsers] = useState([]);   
   

    useEffect(() => {
        if (allUsers && allUsers.data) {
            translateUserData(allUsers.data, language);
        }
    }, [language, allUsers]);  

    const handleHold = async (id: string) => {
        await holdUser(id).then((res) => {
            if (res?.data?.success) {
                Swal.fire({
                    text: res?.data?.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    refetch();
                });
            } else {
                Swal.fire({
                    title: 'Oops',
                    text: res?.error?.data?.message,
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };


    
    const translateUserData = async (usersData: any[], targetLang: string) => {
        try {
            const translatedData = await Promise.all(
                usersData.map(async (user , index) => {
                    const translatedName = await translateText(user?.name, targetLang);
                    const translatedAddress = await translateText(user?.address, targetLang);
                    const translatedCompanyName = await translateText(user?.companyName, targetLang);
                    return {
                        ...user, 
                        key: index+1 , 
                        userName: translatedName,
                        address: translatedAddress,
                        companyName: translatedCompanyName, 
                        userId: user?._id , 
                        phoneNumber: user?.contact

                    };
                })
            );
            setTranslatedUsers(translatedData); 
        } catch (error) {
            console.error('Error translating user data:', error);
        }
    };

    const columns = [
        {
            title: t("serial"),
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: t("userName"),
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: t('email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('address'),
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: t('phone'),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: t('companyName'),
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: t('overview'),
            key: 'Overview',
            render: (_: any, record: any) => (
                <div className="flex items-center gap-3">
                    <button
                        className={`w-[115px] h-[44px] ${record?.status === 'active' ? 'bg-[#F6FAFF] text-[#023F86]' : 'bg-[#F6FAFF] text-[#9c4343] '}  rounded-lg font-semibold`}
                        onClick={() => handleHold(record?.userId)}
                    >
                        {record?.status === 'active' ? t('active') : t('hold')}
                    </button>
                </div>
            ),
        },
    ];

 
    return (
        <div>
            <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">{t("employeesList")}</h1>
                </div>

                <div style={{ marginBottom: 10 }}>
                    <button
                        className="bg-primary text-white w-[173px] h-[40px] rounded transition"
                        onClick={() => setOpen(true)}
                    >
                        {t("addEmployee")}
                    </button>
                </div>
            </Flex>

            <ConfigProvider>
                <Table
                    columns={columns}
                    dataSource={translatedUsers.length > 0 ? translatedUsers : []} 
                    pagination={{
                        current: page,
                        total: allUsers?.pagination?.total || 0,
                        pageSize: 10,
                        onChange: (page) => setPage(page),
                    }}
                />
            </ConfigProvider>

            <AddUserModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default Users;
