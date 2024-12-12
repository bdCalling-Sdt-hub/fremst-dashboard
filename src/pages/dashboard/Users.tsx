import {  ConfigProvider, Flex, Table } from 'antd';
import { useGetAllUsersQuery, useHoldUserMutation } from '../../redux/features/Dashboard/userApi';
import { useState } from 'react';
import AddUserModal from './AddUserModal';
import Swal from 'sweetalert2';

const Users = () => {  
    const [page , setPage] = useState(1) 
    const [open , setOpen] = useState(false)
    const {data:allUsers , refetch} = useGetAllUsersQuery(page)   
    const [holdUser] = useHoldUserMutation()
 

    const handleHold =async(id:string)=>{
      
await holdUser(id).then((res)=>{
    if(res?.data?.success){
        Swal.fire({
            text:res?.data?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
            refetch()
          })
    }else{
        Swal.fire({
            title: "Oops", 
            //@ts-ignore
            text: res?.error?.data?.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
      
    }
  })
    }

    const users = allUsers?.data?.map((value: any, index: number) => ({
        key: index + 1,
        userId: value?._id,
        userName: value?.name,
        email: value?.email,
        address: value?.address,
        phoneNumber: value?.contact ,
        status: value?.status
    }))

      
    const columns = [
        {
            title: 'Serial No.',
            dataIndex: 'key',
            key: 'key',
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
            render: (_: any, record: any) => (
                <div className="flex items-center gap-3">
                    <button className={`w-[115px] h-[44px] ${record?.status === 'active' ? 'bg-[#F6FAFF] text-[#023F86]' : 'bg-[#F6FAFF] text-[#9c4343] '}  rounded-lg font-semibold`} onClick={()=>handleHold(record?.userId)}>
                 {record?.status === 'active' ? 'Active' : 'Hold'}
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <Flex className="my-2" vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">Employees list</h1>
                </div>

                <div
                    style={{
                        marginBottom: 10,
                    }}
                >
                        <button
            className="bg-primary text-white w-[173px] h-[40px] rounded transition"
            onClick={()=>setOpen(true)}  
          >
            Add User
          </button>
                </div>
            </Flex>

            <ConfigProvider>
                <Table columns={columns} dataSource={users}  pagination={{
          current: page,
          total: allUsers?.pagination?.total || 0,
          pageSize: 10,
          onChange: (page) => setPage(page),
      }}   />
            </ConfigProvider>

      <AddUserModal open={open} setOpen={setOpen} />
        </div>
    );
};

export default Users;
