
import { useNavigate } from "react-router-dom"
import { useGetAllProductsQuery } from "../../../redux/features/Dashboard/productsApi"
import { useState } from "react"
import { Pagination } from "antd"
import { imageUrl } from "../../../redux/base/baseApi"
import { useTranslation } from "react-i18next"

const Products = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const { data: allProducts } = useGetAllProductsQuery(page) 
  const {t} = useTranslation();


  const products = allProducts?.data?.map((value: { name: string, image: string , _id: string }) => ({ 
    id:value?._id ,
    name: value?.name,
    icon: value?.image?.startsWith("https")
      ? value?.image
      : `${imageUrl}${value?.image}`
  }))

  return (
    <div className="p-6 font-sans">
      <div className="flex gap-4 mb-6">
        <button onClick={() => navigate('/products-add')} className="bg-primary text-white w-[238px] h-[40px] rounded  transition">
          Add new products
        </button>
        <button onClick={() => navigate('/products-edit')} className="bg-primary text-white w-[238px] h-[40px] rounded  transition">
          Edit products
        </button>
      </div>
      <h2 className="text-lg font-semibold mb-4">{t("productTitle")}</h2>
      <div className="flex flex-col gap-3">
        {products?.map((product: { name: string, icon: string , id: string }, index:number) => (
          <div key={index} className="flex items-center bg-[#DEE5F1] h-[64px] p-4 ps-[23px] pe-[32px] rounded shadow-md">
            <img src={product.icon} alt=" " className="mr-4 h-[38px] w-[38px]" />

            <p className="flex-1 font-medium">{product.name}</p>
            <button onClick={() => navigate(`/inspections-create/${product.name}?id=${product.id}`)} className="bg-primary text-white w-[100px] h-[40px] rounded  transition">
              Check
            </button>
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
