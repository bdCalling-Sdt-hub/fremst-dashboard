import { IoPersonCircleOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
export interface Root {
    customers: number
    products: number
    
  }
  


const Summary = ({homeData}:{homeData:Root}) => {  

    const data=[
        {
            icon: <IoPersonCircleOutline size={32} /> , 
            title: "Customer" ,
            total: homeData?.customers
        } , 
        {
            icon: <PiDotsNineBold size={32} /> , 
            title: "Products" ,
            total: homeData?.products
        } , 
    ]
    return (
        <div className="flex gap-5 items-center"> 
            {
                data?.map((value , index)=> <div key={index} className="w-[246px] rounded-xl border border-[#BBBCC8] flex items-center h-[64px] gap-3">
                <p className="w-[54px] bg-primary text-white flex items-center justify-center h-full rounded-s-xl border-0 "> {value?.icon} </p> 
                <div className="flex-col "> 
                    <p className="text-[#535353] font-[400] text-[16px]"> {value?.title}</p> 
                    <p className="text-[#000000] font-[400] text-[18px]" >{value?.total}</p>
                </div>
             </div>
                )
            }
        
        </div>
    );
};

export default Summary;