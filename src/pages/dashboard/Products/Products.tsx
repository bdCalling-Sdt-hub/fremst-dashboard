
import { useNavigate } from "react-router-dom"
import img1 from "../../../assets/img1.png"
import img2 from "../../../assets/img2.png"
import img3 from "../../../assets/img3.png"
import img4 from "../../../assets/img4.png"
import img5 from "../../../assets/img5.png"
import img6 from "../../../assets/img6.png"


// Sample data

const products = [
    { name: 'Safety harness', icon: img1 },
    { name: 'Safety lanyard', icon: img2 },
    { name: 'Carabina', icon: img3 },
    { name: 'Rescue equipment', icon: img4 },
    { name: 'Safety net', icon: img5 },
    { name: 'Tripod', icon: img6 },
  ]; 

const Products = () => {
 const navigate = useNavigate()
    return (
      <div className="p-6 font-sans">
      <div className="flex gap-4 mb-6">
        <button onClick={() => navigate('/products-add')} className="bg-primary text-white w-[238px] h-[40px] rounded  transition">
          Add new products
        </button>
        <button  onClick={() => navigate('/products-edit')} className="bg-primary text-white w-[238px] h-[40px] rounded  transition">
          Edit products
        </button>
      </div>
      <h2 className="text-lg font-semibold mb-4">What product do you want to inspect today?</h2>
      <div className="flex flex-col gap-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center bg-[#DEE5F1] h-[64px] p-4 ps-[23px] pe-[32px] rounded shadow-md"> 
          <img src={product.icon} alt=" " className="mr-4 h-[38px] w-[38px]" />
           
            <p className="flex-1 font-medium">{product.name}</p>
            <button onClick={() => navigate(`/inspections-create/${product.name}`)}  className="bg-primary text-white w-[100px] h-[40px] rounded  transition">
              Check
            </button>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Products;
