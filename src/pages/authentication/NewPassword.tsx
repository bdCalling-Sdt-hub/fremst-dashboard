import { Button, ConfigProvider, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useResetPasswordMutation } from '../../redux/features/auth/authApi';
import Swal from 'sweetalert2';

const NewPassword = () => {
    const navigate = useNavigate(); 
    const [resetPassword , {isError ,isLoading ,isSuccess ,error , data}] = useResetPasswordMutation() 

    useEffect(() => {
        if (isSuccess) { 
          if (data) {
            Swal.fire({
              text: data?.message ,
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              navigate("/login")  
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
      }, [isSuccess, isError, error, data, navigate])    


    const onFinish = async(values:{newPassword:string , confirmPassword:string}) => {

        // navigate('/'); 
        await resetPassword(values)
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
                    <div className="text-primaryText max-w-md mx-auto space-y-3 text-center">
                        <h1 className="text-3xl  font-medium text-center mt-2">Set a new password</h1>
                        <p>Create a new password. Ensure it differs from previous ones for security</p>
                    </div>

                    <Form
                        name="normal_NewPassword"
                        className="NewPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    New Password
                                </label>
                            }
                            name="newPassword"
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
                            <Input.Password placeholder="" className=" h-12 px-6" />
                        </Form.Item>
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Confirm Password
                                </label>
                            }
                            name="confirmPassword"
                            dependencies={["newPassword"]}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Please confirm your password!",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error("The new password that you entered do not match!")
                                  );
                                },
                              }),
                            ]}
                        >
                            <Input.Password placeholder="" className="h-12 px-6" />
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
                            {isLoading ? "Loading..." : "Update Password"}    
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
