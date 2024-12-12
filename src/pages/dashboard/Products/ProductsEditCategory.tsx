import { Breadcrumb } from "antd";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDeleteStepsMutation, useGetAllStepsQuery } from "../../../redux/features/Dashboard/productsApi";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import Swal from "sweetalert2";


const ProductsEditCategory = () => { 
    const { category } = useParams();   
    const location = useLocation()   
    const queryParams = new URLSearchParams(location.search); 
    const id  = queryParams.get('id')  
    const {data: allSteps , refetch} = useGetAllStepsQuery(id) 
    const [deleteSteps] = useDeleteStepsMutation()
     const [open , setOpen] = useState(false)
    const navigate = useNavigate()   

    const subCategory = allSteps?.data?.map((value: { name: string  , product: string , _id: string , stepImage: string}) =>({ 
        name: value?.name  ,  
        productId: value?.product , 
        id: value?._id , 
        image: value?.stepImage
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
            await deleteSteps(id).then((res) => {
    
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
        <div> 
                <div className='flex items-center gap-2 pb-[24px]'> 
          
          <Breadcrumb
    items={[
      {
        title: <Link to="/products-edit" className='text-[16px] font-medium'>Edit  product inspection</Link>,
      },
      {
        title: <p className='text-[16px] font-medium'> {category} </p>  ,
      },
    ]}
  /> 
        </div>     
         
         <div className="flex items-center justify-between w-[672px] mb-5"> 
         <p className='text-[18px] font-semibold py-5' > {category} </p> 
 
<button onClick={() => setOpen(true)}   className="bg-primary text-white w-[140px] h-[40px] rounded  transition flex items-center justify-center gap-1"> 
 <span> <FiPlus size={18} /> </span> <span> Add Category  </span>
  </button>
         </div>

         {
            subCategory?.map((value: { name: string , id: string } , index:number)=> <div key={index} className="flex items-center p-3 justify-between w-[672px] border rounded-lg mb-3"> 
                <p> {value?.name} </p>  

                <div className=" flex items-center gap-2"> 
                <button onClick={() => navigate(`/products-edit/${category}/${value?.name}?productId=${id}&stepId=${value?.id}`)}   className="bg-primary text-white w-[100px] h-[40px] rounded  transition flex items-center justify-center gap-1">
             <span><MdOutlineModeEdit size={18} /></span> <span>Edit</span>
            </button> 

            <p className=' w-[40px] h-[40px] rounded bg-gray-200 flex items-center justify-center cursor-pointer' onClick={() => handleDelete(value?.id)}><MdDelete size={20} color="#D2410A" /> </p>  
                </div>
            </div>) 
         }
 
 <AddCategoryModal  open={open } setOpen={setOpen} id={id} refetch={refetch} />
        </div>
    );
};

export default ProductsEditCategory; 

// 