//@ts-nocheck
import { useEffect, useState } from "react";
import { useDeleteBrandMutation, useGetAllBrandsQuery } from "../../../redux/features/Dashboard/brandApi";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { Table } from "antd";
import AddBrand from "./AddBrand";
import { useLanguage } from "../../../components/shared/LanguageContext";
import { translateText } from "../../../components/shared/translationUtils";

const Brand = () => {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [deleteBrand] = useDeleteBrandMutation()
    const [editDetails, setEditDetails] = useState()
    const { data: brandsData, refetch } = useGetAllBrandsQuery(page);
    const { t } = useTranslation() 
      const { language } = useLanguage();
      const [translatedUsers, setTranslatedUsers] = useState([]);
    
      useEffect(() => {
        if (brandsData && brandsData.data) {
          translateUserData(brandsData.data, language);
        }
      }, [language, brandsData]);
    
      const translateUserData = async (values: any[], targetLang: string) => {
        try {
          const translatedData = await Promise.all(
            values.map(async (value , index) => {
              const translatedBrandName = await translateText(value?.name, targetLang);  
              return {
                ...value,
                key: index + 1,
                id: value._id,
                brand: translatedBrandName
              };
            })
          );
          setTranslatedUsers(translatedData);
        } catch (error) {
          console.error('Error translating user data:', error);
        }
      }; 



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
                await deleteBrand(id).then((res) => {

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
            title: t('serial'),
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: t('brand'),
            dataIndex: 'brand',
            key: 'brand',
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
                    <h1 className="text-xl text-primary font-semibold">{t("brand")}</h1>
                </div>
                <div className=" mb-5">
                    <button
                        className="bg-primary text-white w-[173px] h-[40px] rounded transition"
                        onClick={() => setOpen(true)}
                    >
                        {t("addBrand")}
                    </button>
                </div>
            </div>
            <Table columns={columns} dataSource={translatedUsers}
                pagination={{
                    current: page,
                    total: brandsData?.pagination?.total || 0,
                    pageSize: 10,
                    onChange: (page) => setPage(page),
                }}
                rowClassName="hover:bg-gray-100" />

            <AddBrand open={open} setOpen={setOpen} editDetails={editDetails} setEditDetails={setEditDetails} refetch={refetch} />
        </div>
    );
};

export default Brand;