import { Breadcrumb } from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";


const ProductsEditCategory = () => { 
    const { category } = useParams();   
    const navigate = useNavigate()  
 const subCategory = [
    "Label and Marking" , "Webbing" , "Stitches"
 ]

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
         
         <p className='text-[18px] font-semibold py-5' > {category} </p> 

         {
            subCategory?.map((value , index)=> <div key={index} className="flex items-center p-3 justify-between w-[472px] border rounded-lg mb-3"> 
                <p> {value} </p> 
                <button onClick={() => navigate(`/products-edit/${category}/${value}`)}   className="bg-primary text-white w-[100px] h-[40px] rounded  transition flex items-center justify-center gap-1">
             <span><MdOutlineModeEdit size={18} /></span> <span>Edit</span>
            </button>
            </div>) 
         }
         
         {/* ###### add category hobe +  */}
        </div>
    );
};

export default ProductsEditCategory; 

// 