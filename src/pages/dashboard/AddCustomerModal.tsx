
import { Form, Input, Modal } from 'antd';
import CommonInput from '../../components/shared/CommonInput';
import { useEffect } from 'react';
import { useAddCustomerMutation, useEditCustomerMutation } from '../../redux/features/Dashboard/customersApi';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

interface editDetailsType {
  _id: string | number | null,
  companyName: string,
  companyNumber: string,
  contactPerson: string,
  address: string,
  email: string,
  phone: string 
  name:string
}

const AddCustomerModal = ({ open, setOpen, editDetails, setEditDetails, refetch }: { open: boolean, setOpen: (open: boolean) => void, setEditDetails: any, editDetails: editDetailsType | undefined, refetch: any }) => {


  const [form] = Form.useForm()
  const [addCustomer] = useAddCustomerMutation()
  const [editCustomer] = useEditCustomerMutation()
  const { t } = useTranslation()  

  
  useEffect(() => {
    if (editDetails) {
      form.setFieldsValue({ email: editDetails?.email, companyName: editDetails?.companyName, companyPhone: editDetails?.companyNumber, contactPerson: editDetails?.contactPerson, address: editDetails?.address, contact: editDetails?.phone , name: editDetails?.name })
    }
  }, [editDetails, form])

  const onFinish = async (values: { question: string, answer: string }) => {
    const data = {
      id: editDetails?._id,   
       ...values
     }  


    if (editDetails?._id) { 
    
      await editCustomer(data).then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            text: res?.data?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();
            setEditDetails(null)
            form.resetFields()
            setOpen(false);
          })
        } else {
          Swal.fire({
            title: "Oops",
            //@ts-ignore
            text: res?.error?.data?.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });

        }
      })
    } else {
      await addCustomer(values).then((res) => {
        if (res?.data?.success) {
          Swal.fire({
            text: res?.data?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();
            setEditDetails(null)
            form.resetFields()
            setOpen(false);
          })
        } else {
          Swal.fire({
            title: "Oops",
            //@ts-ignore
            text: res?.error?.data?.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });

        }
      })
    }
  }




  return (
    <Modal
      centered
      open={open}
      onCancel={() => { setOpen(false); form.resetFields(); setEditDetails(null) }}
      width={500}
      title={<p className='text-[18px] font-semibold' > {editDetails ? t("editCustomer") : t("addCustomer")} </p>}
      footer={null}
    >
      <div className='w-full'>


        {/* form   */}

        <Form layout='vertical' className='' form={form} onFinish={onFinish}>
          <div className=' pt-[13px] pb-[5px] rounded-2xl'>
            <CommonInput name='companyName' label={t("companyName")} />
            <CommonInput name='name' label={t("customerName")} />
            <CommonInput name='email' label={t("email")} /> 

            { 
            editDetails?._id ? "" :  <Form.Item name="password"
              label={<p className='text-[14px] font-semibold'>{t("password")}</p>}
              rules={[
                {
                  required: true,
                  message: t("pleaseEnterPassword"),
                },

                {
                  min: 8,
                  message: t("passwordMinLength"),
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
                  background: "white",
                }}
                className={` `}
              />
            </Form.Item>
            }
           
            <CommonInput name='contact' label={t("phone")} />
            <CommonInput name='address' label={t("address")} />
          </div>

          <button type='submit' className="bg-primary text-white w-full h-[50px] text-lg rounded-lg mt-5">
         {t("save")}
          </button>
        </Form>

      </div>
    </Modal>
  );
};

export default AddCustomerModal;
