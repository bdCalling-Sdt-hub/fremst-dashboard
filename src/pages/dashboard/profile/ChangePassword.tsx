import { Button, Form, Input } from 'antd';
import { useChangePasswordMutation } from '../../../redux/features/auth/authApi';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
    const [changePassword , {data , isError , isLoading , isSuccess , error }] = useChangePasswordMutation()  
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


    const onFinish = async(values: any) => {
        await changePassword(values)
    }; 

    return (
        <div className="max-w-lg mx-auto">
            <Form layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
                    label={
                        <label  className="block text-primaryText mb-1 text-lg">
                          {t("currentPassword")}
                        </label>
                    }
                    name="currentPassword"
                    rules={[{ required: true, message: t("pleaseInputCurrentPassword") }]}
                >
                    <Input.Password placeholder="KK!@#$15856" className=" h-12 px-6" />
                </Form.Item>
                <Form.Item
                    label={
                        <label className="block text-primaryText mb-1 text-lg">
                           {t("newPassword")}
                        </label>
                    }
                    name="newPassword"
                    dependencies={['currentPassword']}
                    rules={[
                      {
                        required: true, 
                        message: t("pleaseInputNewPassword"),
                      }, 
                      {
                        min: 8,
                        message: t("passwordMinLength"),
                    },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('currentPassword') === value) {
                            return Promise.reject(new Error(t("passwordSimilarError")));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                >
                    <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                </Form.Item>

                <Form.Item
                    label={
                        <label className="block text-primaryText mb-1 text-lg">
                            {t("confirmPassword")}
                        </label>
                    }
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                      {
                        required: true, 
                        message: t("pleaseInputConfirmPassword"),
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(t("passwordMismatchError")));
                        },
                      }),
                    ]}
                >
                    <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                </Form.Item>

                <Form.Item className="flex justify-center">
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
                     {isLoading ? `${t("loading")}` : `${t("changePassword")}`} 
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
