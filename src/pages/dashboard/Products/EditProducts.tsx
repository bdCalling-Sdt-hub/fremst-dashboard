
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';  
import img1 from "../../../assets/img1.png"
import img2 from "../../../assets/img2.png"
import img3 from "../../../assets/img3.png"
import img4 from "../../../assets/img4.png"
import img5 from "../../../assets/img5.png"
import img6 from "../../../assets/img6.png"
import { MdOutlineModeEdit } from 'react-icons/md';

const EditProducts = () => {  
    const navigate = useNavigate()
    const products = [
        { name: 'Safety harness', icon: img1 },
        { name: 'Safety lanyard', icon: img2 },
        { name: 'Carabina', icon: img3 },
        { name: 'Rescue equipment', icon: img4 },
        { name: 'Safety net', icon: img5 },
        { name: 'Tripod', icon: img6 },
      ];  

    return (
        <div>
                    <div className='flex items-center gap-2 pb-[24px]'> 
          <Link to="/products"> <BsArrowLeft size={26} />
          </Link>  
          
        <p className='text-[18px] font-semibold' > Edit  product inspection </p>
        </div>   

        <h2 className="text-lg font-semibold mb-4">Edit products</h2>
      <div className="flex flex-col gap-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center bg-[#DEE5F1] h-[64px] p-4 ps-[23px] pe-[32px] rounded shadow-md"> 
          <img src={product.icon} alt=" " className="mr-4 h-[38px] w-[38px]" />
           
            <p className="flex-1 font-medium">{product.name}</p>
            <button onClick={() => navigate(`/products-edit/${product.name}`)} className="bg-primary text-white w-[100px] h-[40px] rounded  transition flex items-center justify-center gap-1">
             <span><MdOutlineModeEdit size={18} /></span> <span>Edit</span>
            </button>
          </div>
        ))}
      </div> 


        </div>
    );
};

export default EditProducts;