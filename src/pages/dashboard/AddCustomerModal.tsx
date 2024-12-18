
import { Form, Modal } from 'antd';
import CommonInput from '../../components/shared/CommonInput';
import { useEffect } from 'react';
import { useAddCustomerMutation, useEditCustomerMutation } from '../../redux/features/Dashboard/customersApi';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

interface editDetailsType {
  id: string | number | null,
  companyName: string,
  companyNumber: string,
  contactPerson: string,
  address: string,
  email: string,
  phone: string
}

const AddCustomerModal = ({ open, setOpen, editDetails, setEditDetails, refetch }: { open: boolean, setOpen: (open: boolean) => void, setEditDetails: any, editDetails: editDetailsType | undefined, refetch: any }) => { 


  const [form] = Form.useForm()
  const [addCustomer] = useAddCustomerMutation()
  const [editCustomer] = useEditCustomerMutation() 
  const {t} = useTranslation()
  useEffect(() => {
    if (editDetails) {
      form.setFieldsValue({ email: editDetails?.email, companyName: editDetails?.companyName, companyPhone: editDetails?.companyNumber, contactPerson: editDetails?.contactPerson, address: editDetails?.address, phone: editDetails?.phone })
    }
  }, [editDetails, form])

  const onFinish = async (values: { question: string, answer: string }) => {
    ////console.log(values);  
    const data = {
      id: editDetails?.id,
      ...values
    }

    if (editDetails) {
      await editCustomer(data).then((res) => {
        //console.log(res);
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
          <div className=' pt-[23px] pb-[5px] rounded-2xl'>
            <CommonInput name='companyName' label='Company Name' />
            <CommonInput name='companyPhone' label='Company Number' />
            <CommonInput name='contactPerson' label='Contact Person' />
            <CommonInput name='email' label='Email' />
            <CommonInput name='phone' label='Phone' />
            <CommonInput name='address' label='Address' />
          </div>

          <button className="bg-primary text-white w-full h-[50px] text-lg rounded-lg mt-5">
            {editDetails ? 'Save Changes' : 'Submit'}
          </button>
        </Form>

      </div>
    </Modal>
  );
};

export default AddCustomerModal;
