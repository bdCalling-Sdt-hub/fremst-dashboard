//@ts-nocheck
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDeleteCustomerMutation, useGetAllCustomersQuery } from '../../redux/features/Dashboard/customersApi';
import { useEffect, useState } from 'react';
import AddCustomerModal from './AddCustomerModal';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { translateText } from '../../components/shared/translationUtils';
import { useLanguage } from '../../components/shared/LanguageContext';


const Customers = () => {

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [deleteCustomer] = useDeleteCustomerMutation()
  const [editDetails, setEditDetails] = useState()
  const { data: customersData, refetch } = useGetAllCustomersQuery({ page, search });
  const { t } = useTranslation()
  const { language } = useLanguage();
  const [translatedUsers, setTranslatedUsers] = useState([]);

  useEffect(() => {
    if (customersData && customersData.data) {
      translateUserData(customersData.data, language);
    }
  }, [language, customersData]);

  const translateUserData = async (values: any[], targetLang: string) => {
    try {
      const translatedData = await Promise.all(
        values.map(async (value) => {
          const translatedCompanyName = await translateText(value?.companyName, targetLang);
          const translatedContactPerson = await translateText(value?.contactPerson, targetLang);
          const translatedAddress = await translateText(value?.address, targetLang);

          return {
            ...value,
            id: value._id,
            companyName: translatedCompanyName,
            companyNumber: value?.companyPhone,
            contactPerson: translatedContactPerson,
            address: translatedAddress,
            email: value?.email,
            phone: value?.contact
          };
        })
      );
      setTranslatedUsers(translatedData);
    } catch (error) {
      console.error('Error translating user data:', error);
    }
  };

  const handleSearch = (e: { target: { value: any; }; }) => {
    const value = e.target?.value
    setSearch(value)
  }


  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCustomer(id).then((res) => {

          if (res?.data?.success) {
            Swal.fire({
              text: res?.data?.message,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetch();
            });
          } else {
            Swal.fire({
              title: "Oops",
              //@ts-ignore
              text: res?.error?.data?.message,
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  }

  const columns = [
    {
      title: t('companyName'),
      dataIndex: 'companyName',
      key: 'companyName',
    },

    {
      title: t('address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
    },

    {
      title: t('overview'),
      key: 'action',
      render: (_: any, record: any) => (
        <div className='flex gap-2 items-center font-medium'>
          {/* Edit Link with ID */}

          <p className='text-primary cursor-pointer' onClick={() => { setEditDetails(record); setOpen(true) }}>{t("edit")}</p>

          <p className='text-[#D2410A] cursor-pointer' onClick={() => handleDelete(record.id)}>{t("delete")}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center w-full">
        <div className='flex items-center gap-8 w-full'>
          <h1 className="text-xl text-primary font-semibold">{t("customersList")}</h1>
          <Input
            style={{
              maxWidth: 335,
              height: 42,
            }}
            placeholder="Search.."
            suffix={<SearchOutlined
              style={{
                fontSize: 24,
                color: '#292C61',
              }} />}
            onChange={handleSearch}
          />
        </div>
        <div className=" mb-5">
          <button
            className="bg-primary text-white w-[173px] h-[40px] rounded transition"
            onClick={() => setOpen(true)}
          >
            {t("addCustomer")}
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={translatedUsers}
        pagination={{
          current: page,
          total: customersData?.pagination?.total || 0,
          pageSize: 10,
          onChange: (page) => setPage(page),
        }}
        rowClassName="hover:bg-gray-100" />

      <AddCustomerModal open={open} setOpen={setOpen} editDetails={editDetails} setEditDetails={setEditDetails} refetch={refetch} />
    </div>
  );
};

export default Customers;
