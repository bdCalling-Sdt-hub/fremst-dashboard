import { Button, ConfigProvider, Form, Input } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForgetPasswordMutation } from '../../redux/features/auth/authApi';
import Swal from 'sweetalert2';

const ForgetPassword = () => {
    const navigate = useNavigate();  
    const [email , setEmail] = useState()
    const [forgetPassword, {isLoading , isError , error , data , isSuccess}] = useForgetPasswordMutation() 
 

    useEffect(() => {
        if (isSuccess) {
         
          if (data) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: data?.message,
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              localStorage.setItem("email", JSON.stringify(email))    
              navigate('/verify-otp')
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
      }, [isSuccess, isError, error, data, navigate]);   


    const onFinish = async(values:{ email: SetStateAction<undefined>; }) => {  
       
        setEmail(values?.email)
     await forgetPassword(values)
        //; 
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#292C61',

                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 40,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="flex bg-[#292C61] items-center justify-center h-screen">
                <div className="bg-white w-[630px] rounded-lg shadow-lg p-10 ">
                    <div className="text-primaryText space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Forget Password</h1>
                    </div>

                    <Form
                        name="normal_ForgetPassword"
                        className="ForgetPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your email address" type="email" className="h-12" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                }}
                            >
                             { isLoading ? "Loading..." : "Send Code"} 
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
