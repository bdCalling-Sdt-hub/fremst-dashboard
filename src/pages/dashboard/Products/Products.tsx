
import { useNavigate } from "react-router-dom"
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../redux/features/Dashboard/productsApi"
import { useState } from "react"
import { Pagination } from "antd"
import { imageUrl } from "../../../redux/base/baseApi"
import { useTranslation } from "react-i18next"
import { MdDelete } from "react-icons/md"
import Swal from "sweetalert2"

const Products = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const { data: allProducts  , refetch} = useGetAllProductsQuery(page)  
  const [deleteProduct] = useDeleteProductMutation()
  const {t} = useTranslation();


  const products = allProducts?.data?.map((value: { name: string, image: string , _id: string }) => ({ 
    id:value?._id ,
    name: value?.name,
    icon: value?.image?.startsWith("https")
      ? value?.image
      : `${imageUrl}${value?.image}`
  }))
  
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
              await deleteProduct(id).then((res) => { 
               
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
  

  return (
    <div className="p-6 font-sans">
      <div className="flex gap-4 mb-6">
        <button onClick={() => navigate('/products-add')} className="bg-primary text-white w-[238px] h-[40px] rounded  transition">
         {t("addNewProduct")}
        </button>
        <button onClick={() => navigate('/products-edit')} className="bg-primary text-white w-[238px] h-[40px] rounded  transition">
         {t("editProducts")}
        </button>
      </div>
      <h2 className="text-lg font-semibold mb-4">{t("productTitle")}</h2>
      <div className="flex flex-col gap-3">
        {products?.map((product: { name: string, icon: string , id: string }, index:number) => (
          <div key={index} className="flex items-center bg-[#DEE5F1] h-[64px] p-4 ps-[23px] pe-[32px] rounded shadow-md">
            <img src={product?.icon} alt=" " className="mr-4 h-[38px] w-[38px]" />

            <p className="flex-1 font-medium">{product?.name}</p> 
            <div className=" flex gap-2 items-center">

            <button onClick={() => navigate(`/inspections-create/${product?.name}?id=${product?.id}`)} className="bg-primary text-white w-[100px] h-[40px] rounded  transition">
              Check
            </button> 
             <p className=' w-[40px] h-[40px] rounded border border-primary flex items-center justify-center cursor-pointer'  onClick={() => handleDelete(product?.id)}><MdDelete size={20} color="#D2410A" /> </p>  
            </div>
          </div>
        ))}
      </div>

      <div className=" mt-10">
        <Pagination
          align="center"
          current={page}
          total={allProducts?.pagination?.total || 0}
          pageSize={10}
          onChange={(page) => setPage(page)}
        />

      </div>
    </div>
  );
};

export default Products;
