
import { useNavigate, useParams } from 'react-router-dom';

const AllInspectCategory = () => { 
    const navigate = useNavigate() 
    const {category} = useParams() 
   
    const products = [
        { name: 'Label and Marking' },
        { name: 'Webbing' },
        { name: 'Stiches'},
     
      ]; 
    return (
        <div className="p-6 font-sans">
 
 <div className='flex  items-center justify-between mb-5'>
        <h2 className="text-lg font-semibold mb-4">Inspect by Category</h2>
        <button onClick={() => navigate(`/inspections/submitInspections`)}  className="bg-primary text-white w-[170px] h-[40px] rounded  transition">
                Submit Inspections
              </button>
 </div>
        <div className="flex flex-col gap-3">
          {products.map((product, index) => (
            <div key={index} className="flex items-center bg-[#DEE5F1] h-[64px] p-4 ps-[23px] pe-[32px] rounded shadow-md"> 
             
              <p className="flex-1 font-medium">{product.name}</p>
              <button onClick={() => navigate(`/inspections-create/${category}/${category}/${product.name}`)}  className="bg-primary text-white w-[100px] h-[40px] rounded  transition">
                Inspect
              </button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default AllInspectCategory;