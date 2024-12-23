
import { Form, Input, Modal } from 'antd';
import CommonInput from '../../components/shared/CommonInput';
import { useCreateUserMutation } from '../../redux/features/Dashboard/userApi';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';


const AddUserModal = ({ open, setOpen }:{open:boolean , setOpen:(open:boolean)=>void}) => { 

  const [form] = Form.useForm(); 
  const [createUser , {isLoading , isError , isSuccess , data , error}] = useCreateUserMutation() 
 const {t} = useTranslation()
  useEffect(() => {
    if (isSuccess) { 
      if (data) {
        Swal.fire({
          text: data?.message ,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          setOpen(false); 
          form.resetFields();
          window.location.reload();  
        });
      }
    }
    if (isError) {
      Swal.fire({ 
        //@ts-ignore
        text: error?.data?.message,  
        icon: "error",
      });
    }
  }, [isSuccess, isError, error, data])    


  const onFinish = async(values:any) =>{
 //console.log(values); 

 await createUser(values)
 
  }

  return ( 
    <Modal
    centered
    open={open}
    onCancel={() => setOpen(false)}
    width={500}
    title={<p className="text-[18px] font-semibold">{t("addEmployee")}</p>}
    footer={null}
  >
    <div className='w-full'>

      {/* form   */} 

      <Form layout='vertical' className='' onFinish={onFinish} form={form}>  
        <div className='  pt-[23px] pb-[5px] rounded-2xl'>
  <CommonInput name='name' label='User name' />
  <CommonInput name='email' label='Email' /> 
  <CommonInput name='companyName' label='Company name' /> 
  <Form.Item name="password"  
        label={<p className='text-[14px] font-semibold'>Password</p>} 
        rules={[
          {
            required: true,
            message: "Please input your new Password!",
          }, 
          
{
min: 8,
message: "Password must be at least 8 characters long!",
},
        ]} 
        
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
      {isLoading ? "Loading..." : "Save changes"} 
        </button>
      </Form>
    
    </div> 
    </Modal>
  );
};

export default AddUserModal;
