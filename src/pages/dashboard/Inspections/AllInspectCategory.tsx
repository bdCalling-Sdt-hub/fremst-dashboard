
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetAllProductsInspectionsQuery } from '../../../redux/features/Dashboard/inspectionsApi';
import { imageUrl } from '../../../redux/base/baseApi';
import { useTranslation } from 'react-i18next';

const AllInspectCategory = () => { 
    const navigate = useNavigate() 
    const {category } = useParams() 
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search); 
      const id = queryParams.get('id');  
      const {data} = useGetAllProductsInspectionsQuery(id) 
   const {t} = useTranslation();

      const products = data?.data?.map((value: { name: string, stepImage: string , _id: string }) => ({ 
        id:value?._id ,
        name: value?.name,
        icon: value?.stepImage?.startsWith("https")
          ? value?.stepImage
          : `${imageUrl}${value?.stepImage}`
      }))
   
   
    return (
        <div className="p-6 font-sans">
 
 <div className='flex  items-center justify-between mb-5'>
        <h2 className="text-lg font-semibold mb-4">{t("inspectByCategory")}</h2>
        <button onClick={() => navigate(`/inspections/submitInspections`)}  className="bg-primary text-white w-[170px] h-[40px] rounded  transition">
                Submit Inspections
              </button>
 </div>
        <div className="flex flex-col gap-3">
          {products?.map((product: { name: string, icon: string , id: string }, index:number) => (
            <div key={index} className="flex items-center bg-[#DEE5F1] h-[64px] p-4 ps-[23px] pe-[32px] rounded shadow-md"> 
             
              <p className="flex-1 font-medium">{product.name}</p>
              <button onClick={() => navigate(`/inspections-create/${category}/${category}/${product.name}?id=${product.id}&product=${id}`)}  className="bg-primary text-white w-[100px] h-[40px] rounded  transition">
                Inspect
              </button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default AllInspectCategory;