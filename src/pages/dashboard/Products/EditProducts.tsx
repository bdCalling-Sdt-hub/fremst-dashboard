//@ts-nocheck
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';  
import { MdOutlineModeEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '../../../redux/features/Dashboard/productsApi';
import { imageUrl } from '../../../redux/base/baseApi';
import { Pagination } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../components/shared/LanguageContext';
import { translateText } from '../../../components/shared/translationUtils';

const EditProducts = () => {  
    const navigate = useNavigate() 
    const [page, setPage] = useState(1)
    const { data: allProducts } = useGetAllProductsQuery(page)
    const {t} = useTranslation();  
      const { language } = useLanguage();
      const [translatedUsers, setTranslatedUsers] = useState([]);
    
      useEffect(() => {
        if (allProducts && allProducts.data) {
          translateUserData(allProducts.data, language);
        }
      }, [language, allProducts]);
    
      const translateUserData = async (values: any[], targetLang: string) => {
        try {
          const translatedData = await Promise.all(
            values.map(async (value, index) => {
              const translatedName = await translateText(value?.name, targetLang);
    
              return {
                ...value,
                key: index + 1,
                name: translatedName,
                id: value?._id,
                icon: value?.image?.startsWith("https")
                  ? value?.image
                  : `${imageUrl}${value?.image}`
              };
            })
          );
          setTranslatedUsers(translatedData);
        } catch (error) {
          console.error('Error translating user data:', error);
        }
      };
    


    return (
        <div>
                    <div className='flex items-center gap-2 pb-[24px]'> 
          <Link to="/products"> <BsArrowLeft size={26} />
          </Link>  
          
        <p className='text-[18px] font-semibold' > {t("editInspection")} </p>
        </div>   

        <h2 className="text-lg font-semibold mb-4">{t("editProducts")}</h2>
      <div className="flex flex-col gap-3">
        {translatedUsers?.map((product: { name: string, icon: string , id: string }, index:number) => (
          <div key={index} className="flex items-center bg-[#DEE5F1] h-[64px] p-4 ps-[23px] pe-[32px] rounded shadow-md"> 
          <img src={product.icon} alt=" " className="mr-4 h-[38px] w-[38px]" />
           
            <p className="flex-1 font-medium">{product.name}</p>
            <button onClick={() => navigate(`/products-edit/${product.name}?id=${product.id}`)} className="bg-primary text-white w-[100px] h-[40px] rounded  transition flex items-center justify-center gap-1">
             <span><MdOutlineModeEdit size={18} /></span> <span>{t("edit")}</span>
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

export default EditProducts;