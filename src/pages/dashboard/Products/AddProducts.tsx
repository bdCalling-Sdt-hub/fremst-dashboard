import {  Form, Input } from "antd";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import CommonInput from "../../../components/shared/CommonInput";
import { useEffect, useState } from "react";
import { PiImageThin } from "react-icons/pi";
import { useAddNewProductMutation } from "../../../redux/features/Dashboard/productsApi";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";


const AddProducts = () => {  
    const navigate = useNavigate()
    const [imgFile, setImgFile] = useState(null);
    const [imageUrl, setImageUrl] = useState()   
    const [addNewProduct , {isLoading , isError , isSuccess , data , error}] = useAddNewProductMutation()
const {t} = useTranslation()
    useEffect(() => {
        if (isSuccess) { 
          if (data) {
            Swal.fire({
              text: data?.message ,
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              navigate("/products")  
              window.location.reload(); 
            });
          }
    
        }
        if (isError) {
          Swal.fire({ 
            //@ts-ignore
            text: error?.data?.message,  
            icon: "error",
          });
        }
      }, [isSuccess, isError, error, data, navigate])     

    
    const handleChange = (e:any) => {
        const file = e.target.files[0]

        setImgFile(file); 
        //@ts-ignore
        setImageUrl(URL.createObjectURL(file))
    }; 

    const onFinish = async(values:any) => {
     
        const formData = new FormData() 
      const  {imagess , ...newValues}= values 
       if(imgFile){
        formData?.append("image" , imgFile)
       } 
       
       Object.entries(newValues).forEach(([key, value]) => {
        formData?.append(key, value as string);
      }); 

      await addNewProduct(formData)
    }
    return (
        <div className='w-full'>
        <div className='flex items-center gap-2 pb-[24px]'> 
          <Link to="/products"> <BsArrowLeft size={26} />
          </Link> 
        <p className='text-[18px] font-semibold' > {t("createNewProductInspection")} </p>
        </div> 
  
        {/* form   */} 
  
        <Form layout='vertical' className='w-2/3' onFinish={onFinish}>   
        <div className=" flex gap-10 w-full">
          <div className='pb-[5px] w-full'>
    <CommonInput name='name' label={t("productName")}  />
          {/* image  */}
          <div className=' py-[4px] w-full'>
                    <p className="text-[14px] font-semibold py-1">{t("uploadProductPicture")}</p>

                    <label
                        htmlFor="image"
                        style={{ display: "block", }}
                        className="p-3 border rounded-lg bg-white "
                    >
                        <Form.Item name="imagess"
                        >
                            <div className="flex justify-center items-center w-full h-[250px] border-2 border-dotted border-gray-200 ">
                                {imageUrl ? (
                                    <img src={imageUrl} style={{ height: "120px", width: "120px", borderRadius: 10 , objectFit:"contain" }} alt="" />
                                )
                                    : (
                                        <PiImageThin className="text-8xl flex items-center justify-center text-[#666666] font-[400]" />
                                    )}
                            </div>

                            <div className="hidden">
                                <Input
                                    id="image"
                                    type="file"
                                    onInput={handleChange}

                                />
                            </div>
                        </Form.Item>
                    </label>
                </div> 
          </div>   
        </div>
   
   <Form.Item  className="flex items-center justify-end"> 

          <button type="submit" className="bg-primary text-white w-[150px] h-[50px] text-lg rounded-lg mt-5">
     {isLoading ? "Loading..." : t("create")}  
          </button>
   </Form.Item>
        </Form>
      
      </div>
    );
};

export default AddProducts;