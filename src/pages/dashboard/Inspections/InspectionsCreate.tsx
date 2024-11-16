import { Form } from "antd";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommonInput from "../../../components/shared/CommonInput";


const InspectionsCreate = () => { 
  const navigate = useNavigate() 
  const {category} = useParams()
    return (
        <div className='w-full'>
        <div className='flex items-center gap-2 pb-[24px]'> 
          <Link to="/products"> <BsArrowLeft size={26} />
          </Link> 
        <p className='text-[18px] font-semibold' > Create Inspections </p>
        </div> 
  
        {/* form   */} 
  
        <Form layout='vertical' className='w-1/2'>  
          <div className=' pb-[5px]'>
    <CommonInput name='companyName' label='Company Name' />
    <CommonInput name='contactPerson' label='Contact Person' />
    <CommonInput name='brand' label='Brand' />
    <CommonInput name='product' label='Product SKU' />
    <CommonInput name='location' label='Storage Location' />
          </div> 
  
          <button className="bg-primary text-white w-full h-[50px] text-lg rounded-lg mt-5" onClick={() => navigate(`/inspections-create/${category}/${category}`)}>
          Next
          </button>
        </Form>
      
      </div>
    );
};

export default InspectionsCreate;