import {  ConfigProvider, Flex, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const Users = () => { 
    const navigate = useNavigate()
    const users = [
        {
          userId: 1,
          userName: 'John Doe',
          email: 'johndoe@example.com',
          address: '123 Main St, Springfield, IL',
          phoneNumber: '555-1234'
        },
        {
          userId: 2,
          userName: 'Jane Smith',
          email: 'janesmith@example.com',
          address: '456 Oak St, Springfield, IL',
          phoneNumber: '555-5678'
        },
        {
          userId: 3,
          userName: 'Samuel Green',
          email: 'samuelgreen@example.com',
          address: '789 Pine St, Springfield, IL',
          phoneNumber: '555-9101'
        },
        {
          userId: 4,
          userName: 'Emily Johnson',
          email: 'emilyjohnson@example.com',
          address: '101 Maple St, Springfield, IL',
          phoneNumber: '555-1122'
        },
        {
          userId: 5,
          userName: 'Michael Brown',
          email: 'michaelbrown@example.com',
          address: '202 Birch St, Springfield, IL',
          phoneNumber: '555-3344'
        },
        {
          userId: 6,
          userName: 'Olivia White',
          email: 'oliviawhite@example.com',
          address: '303 Cedar St, Springfield, IL',
          phoneNumber: '555-5566'
        },
        {
          userId: 7,
          userName: 'Daniel Black',
          email: 'danielblack@example.com',
          address: '404 Elm St, Springfield, IL',
          phoneNumber: '555-7788'
        },

      ];
      
    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },

        {
            title: 'Overview',
            key: 'Overview',
            render: (_: any, _record: any) => (
                <div className="flex items-center gap-3">
                    <button className='w-[115px] h-[44px] text-[#023F86] bg-[#F6FAFF] rounded-lg font-medium'>
                 Hold
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">Users list</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                        <button
            className="bg-primary text-white w-[173px] h-[40px] rounded transition"
            onClick={() => navigate('/user-add')}  
          >
            Add User
          </button>
                </div>
            </Flex>

            <ConfigProvider>
                <Table columns={columns} dataSource={users} />
            </ConfigProvider>

      
        </div>
    );
};

export default Users;
