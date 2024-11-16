import { Input } from "antd";
import { useState } from "react";
import { PiImageThin } from "react-icons/pi";


const SubmitInspections = () => { 
    const [imageUrl, setImageUrl] = useState<string | null>(null);  

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setImageUrl(reader.result as string);
          reader.readAsDataURL(file);
        }
      };
    return (
        <div className="w-full"> 

           <div className="flex gap-10 w-2/3">


            <div className="w-full"> 

            <p className="text-[14px] font-semibold py-2">Inspection Summary</p>  
           <Input.TextArea rows={8}  className="w-full rounded-lg resize-none" /> 

           <p className="text-[14px] font-semibold py-2 mt-8">The Product is</p> 
           <div className="flex gap-5">
 <button className=" w-1/2 border border-[#229E45] text-[#229E45] hover:bg-[#229E45] hover:text-white h-[45px] rounded-md font-medium"> Approved </button>
 <button className=" w-1/2 bg-[#D2410A] h-[45px] rounded-md text-white border border-[#D2410A] hover:text-[#D2410A] hover:bg-transparent font-medium "> Rejected </button>
           </div> 

           <p className="text-[14px] font-semibold py-2 mt-8">Next inspection will be in</p> 
           <div className="flex gap-5">
 <button className=" w-1/2 border border-primary text-primary hover:bg-primary hover:text-white h-[45px] rounded-md font-medium"> Approved </button>
 <button className=" w-1/2 bg-primary h-[45px] rounded-md text-white border border-primary hover:text-primary hover:bg-transparent font-medium "> Rejected </button>
           </div>  

           <button className=" w-full bg-primary h-[45px] rounded-md text-white  font-medium mt-16"> Rejected </button>
            </div>  


            <div className="mb-8 w-full" >
            <p className="text-[14px] font-semibold py-1">Upload Product Picture</p>
            <label
                          htmlFor="image"
                          style={{ display: "block", }}
                          className="p-3 border rounded-lg bg-white w-[431px] "
                      >
                          <div 
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
                                      onInput={handleImageChange}
  
                                  />
                              </div>
                          </div>
                      </label>
          </div>
   
           </div>
        </div>
    );
};

export default SubmitInspections;