
import { Form, Input } from 'antd';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import CommonInput from '../../components/shared/CommonInput';


const AddUser = () => {

  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 pb-[24px]'> 
        <Link to="/users"> <BsArrowLeft size={26} />
        </Link> 
      <p className='text-[18px] font-semibold' > Add User </p>
      </div> 

      {/* form   */} 

      <Form layout='vertical' className='w-1/2'>  
        <div className='bg-[#DEE5F1] px-[31px] pt-[23px] pb-[5px] rounded-2xl'>
  <CommonInput name='userName' label='User Name' />
  <CommonInput name='Email' label='Email' />
  <Form.Item name="password"  
        label={<p className='text-[14px] font-semibold'>Password</p>}
        > 
        <Input.Password   
        style={{
            border: "1px solid #BABABA",
            height: "48px",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
            padding: "8px",  
            background:"white"  ,   
          }} 
          className={` `}
          />     
        </Form.Item> 

        </div> 

        <button className="bg-primary text-white w-full h-[50px] text-lg rounded-lg mt-5">
       Save Changes
        </button>
      </Form>
    
    </div>
  );
};

export default AddUser;
