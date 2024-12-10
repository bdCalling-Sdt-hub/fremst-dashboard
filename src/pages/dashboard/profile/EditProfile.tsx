import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../redux/features/auth/authApi';
import { imageUrl } from '../../../redux/base/baseApi';
import Swal from 'sweetalert2';

interface FormValues {
    name: string;
    email: string;
    image: File | null;
}

const EditProfile: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string>('');
    const [file, setFile] = useState<File | null>(null); 
    const {data:profile} = useGetProfileQuery(undefined)    
    const [updateProfile , {isError , isLoading , isSuccess , data , error}] = useUpdateProfileMutation()
    const [form] = Form.useForm()
    const userData = profile?.data 
   

    useEffect(()=>{ 
        if(userData){
            form.setFieldsValue({email:userData?.email , name:userData?.name}) 
            setImagePreview(userData?.profile?.startsWith("https") ? userData?.profile : `${imageUrl}${userData?.profile}`)
        }
    },[userData , form]) 

 
    useEffect(() => {
        if (isSuccess) { 
          if (data) {
            Swal.fire({
              text: data?.message ,
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            }).then(() => { 
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
 


    const onFinish = async(values:any) => { 
        const formData = new FormData() 
        if(file){
            formData?.append("profile" , file)
        } 

       formData.append("name",values?.name) 
  
        await updateProfile(formData)
     
 
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    }; 

    return (
        <div className="max-w-lg mx-auto">
            <Form name="update_profile" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} form={form}>
                {/* Banner Image */}
                <div className="flex justify-center">
                    <div className="w-[150px] h-[150px] relative">
                        <img
                            src={imagePreview}
                            alt="User Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <label
                            className="absolute bottom-[10%] cursor-pointer right-[5%] bg-primary rounded-full p-1 text-white"
                            htmlFor="imageUploadBanner"
                        >
                            <CiEdit size={25} />
                        </label>

                        <input
                            id="imageUploadBanner"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                </div>

                <Form.Item
                    label={
                        <label htmlFor="name" className="block text-primaryText mb-1 text-lg">
                            Full Name
                        </label>
                    }
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className="h-12" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label={
                        <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                            Email
                        </label>
                    }
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input className="h-12" placeholder="Enter your email" readOnly />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button
                        style={{
                            height: 42,
                        }}
                        type="primary"
                        htmlType="submit"
                    >
                      {isLoading ? "Updating..." : "Update"} 
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfile;
