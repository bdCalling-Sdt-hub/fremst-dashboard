import { Form, Input, Modal } from "antd";
import CommonInput from "../../../components/shared/CommonInput";
import { useEffect, useState } from "react";
import { PiImageThin } from "react-icons/pi";
import { useAddNewStepMutation } from "../../../redux/features/Dashboard/productsApi";
import Swal from "sweetalert2";


const AddCategoryModal = ({ open, setOpen, id, refetch }: { open: boolean, setOpen: (open: boolean) => void, id: string | null, refetch: any }) => {

    const [form] = Form.useForm()
    const [imgFile, setImgFile] = useState(null);
    const [imageUrl, setImageUrl] = useState()
    const [addNewStep , {isLoading , isError , isSuccess , data , error}] = useAddNewStepMutation() 

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
             refetch()
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
      }, [isSuccess, isError, error, data, ])    

    const handleChange = (e: any) => {
        const file = e.target.files[0]
        setImgFile(file);
        //@ts-ignore
        setImageUrl(URL.createObjectURL(file))
    };

    const onFinish = async (values: { name: string, imagess: File }) => {
        const formData = new FormData()
        const { imagess, ...newValues } = values

        if (imgFile) {
            formData.append('stepImage', imgFile)
        }

        formData.append('name', newValues.name)
        formData.append('product', id as string)

        await addNewStep(formData)
    }


    return (
        <Modal
            centered
            open={open}
            onCancel={() => { setOpen(false); form.resetFields() }}
            width={500}
            title={<p className='text-[18px] font-semibold' > Add Category </p>}
            footer={null}
        >
            <div >

                <Form form={form} layout="vertical" onFinish={onFinish}>

                    <CommonInput name='name' label='Category Name' />

                    <div className=' py-[4px] w-full'>
                        <p className="text-[14px] font-semibold py-1">Image</p>

                        <label
                            htmlFor="image"
                            style={{ display: "block", }}
                            className="p-3 border border-[#BABABA] rounded-lg bg-white "
                        >
                            <Form.Item name="imagess"
                            >
                                <div className="flex justify-center items-center w-full h-[200px] border-2 border-dotted border-[#BABABA] ">
                                    {imageUrl ? (
                                        <img src={imageUrl} style={{ height: "120px", width: "120px", borderRadius: 10, objectFit: "contain" }} alt="" />
                                    )
                                        : (
                                            <PiImageThin className="text-8xl flex items-center justify-center text-[#666666] font-[400]" />
                                        )}
                                </div>

                                <div className="hidden">
                                    <Input
                                        id="image"
                                        type="file"
                                        onInput={handleChange}

                                    />
                                </div>
                            </Form.Item>
                        </label>
                    </div>

                    <Form.Item className=" flex items-center justify-end ">
                        <button type="submit" className=" bg-primary text-[14px] font-medium w-[100px]  text-white py-2 rounded-lg mt-5"> {isLoading ? "Saving..." : "Save"}</button>
                    </Form.Item>

                </Form>


            </div>
        </Modal>
    );
};

export default AddCategoryModal;