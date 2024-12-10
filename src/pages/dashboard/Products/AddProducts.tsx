import { Form, Input } from "antd";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import CommonInput from "../../../components/shared/CommonInput";
import { useState } from "react";
import { PiImageThin } from "react-icons/pi";


const AddProducts = () => { 
    const [imgFile, setImgFile] = useState(null);
    const [imageUrl, setImageUrl] = useState() 
    
    const handleChange = (e:any) => {
        const file = e.target.files[0]

        setImgFile(file); 
        //@ts-ignore
        setImageUrl(URL.createObjectURL(file))
    };
    return (
        <div className='w-full'>
        <div className='flex items-center gap-2 pb-[24px]'> 
          <Link to="/products"> <BsArrowLeft size={26} />
          </Link> 
        <p className='text-[18px] font-semibold' > Create New Product Inspection </p>
        </div> 
  
        {/* form   */} 
  
        <Form layout='vertical' className='w-2/3'>   
        <div className=" flex gap-10 w-full">
          <div className='pb-[5px] w-full'>
    <CommonInput name='productName' label='Product name' />
    <CommonInput name='qus1' label='Question - 01' />
    <CommonInput name='qus2' label='Question - 02' />
    <CommonInput name='qus3' label='Question - 03' />
    <CommonInput name='qus4' label='Question - 04' />
    <CommonInput name='qus5' label='Question - 05' />
          </div>   
          {/* image  */}
          <div className=' py-[4px] w-full'>
                    <p className="text-[14px] font-semibold py-1">Upload Product Picture</p>

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
  
          <button className="bg-primary text-white w-[500px] h-[50px] text-lg rounded-lg mt-5">
         Create
          </button>
        </Form>
      
      </div>
    );
};

export default AddProducts;