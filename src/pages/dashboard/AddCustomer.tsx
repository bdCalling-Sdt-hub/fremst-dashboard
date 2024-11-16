
import { Form } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CommonInput from '../../components/shared/CommonInput';


const AddCustomer = () => {
  const { id } = useParams();   
  console.log(id);
  const navigate = useNavigate();


  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 pb-[24px]'> 
        <Link to="/customers"> <BsArrowLeft size={26} />
        </Link> 
      <p className='text-[18px] font-semibold' > {id ? 'Edit Customer' : 'Add Customer'} </p>
      </div> 

      {/* form   */} 

      <Form layout='vertical' className='w-1/2'>  
        <div className='bg-[#DEE5F1] px-[31px] pt-[23px] pb-[5px] rounded-2xl'>
  <CommonInput name='companyName' label='Company Name' />
  <CommonInput name='companyNumber' label='Company Number' />
  <CommonInput name='contactPerson' label='Contact Person' />
  <CommonInput name='email' label='Email' />
  <CommonInput name='phone' label='Phone' />
  <CommonInput name='address' label='Address' />
        </div> 

        <button className="bg-primary text-white w-full h-[50px] text-lg rounded-lg mt-5">
        {id ? 'Save Changes' : 'Submit'}
        </button>
      </Form>
    
    </div>
  );
};

export default AddCustomer;
