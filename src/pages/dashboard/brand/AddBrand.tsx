import { Form, Modal } from "antd";
import CommonInput from "../../../components/shared/CommonInput";
import Swal from "sweetalert2";
import { useAddBrandMutation, useEditBrandMutation } from "../../../redux/features/Dashboard/brandApi";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";


const AddBrand = ({ open, setOpen, editDetails, setEditDetails, refetch }: { open: boolean, setOpen: (open: boolean) => void, setEditDetails: any, editDetails: {id:string , brand:string } | undefined, refetch: any }) => { 
    
  const [form] = Form.useForm()
  const [addBrand] = useAddBrandMutation()
  const [editBrand] = useEditBrandMutation()
  const { t } = useTranslation()  

    useEffect(() => {
      if (editDetails) {
        form.setFieldsValue({ name: editDetails?.brand })
      }
    }, [editDetails, form])
  
    const onFinish = async (values: { question: string, answer: string }) => {
      const data = {
        id: editDetails?.id,
        ...values
      }
  
      if (editDetails) {
        await editBrand(data).then((res) => {
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
        await addBrand(values).then((res) => { 
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
      title={<p className='text-[18px] font-semibold' > {editDetails ? t("editBrand") : t("addBrand")} </p>}
      footer={null}
    >
      <div className='w-full'>


        {/* form   */}

        <Form layout='vertical' className='' form={form} onFinish={onFinish}>
          <div className=' pt-[13px] pb-[5px] rounded-2xl'>
            <CommonInput name='name' label={t("brand")} />
          </div>

          <button className="bg-primary text-white w-full h-[50px] text-lg rounded-lg mt-5">
            {t("save")}
          </button>
        </Form>

      </div>
    </Modal>
    );
};

export default AddBrand;