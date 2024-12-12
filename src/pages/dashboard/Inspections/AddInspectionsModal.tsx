import { Button, DatePicker, Form, message, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useAddInspectionHistoryMutation } from "../../../redux/features/Dashboard/inspectionsApi";
import Swal from "sweetalert2";
import { useEffect } from "react";


const AddInspectionsModal = ({
  open,
  setOpen,
  productId,
  customerId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: string | null;
  customerId: string | null;
}) => {
  const [addInspectionHistory, { isLoading , error , isSuccess , data , isError  }] = useAddInspectionHistoryMutation();
const [form] = Form.useForm()
  const props: UploadProps = {
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error(`${file.name} is not a PDF file`);
      }
      return isPDF || Upload.LIST_IGNORE;
    },
    maxCount: 1, 
    onChange: (info) => {
      console.log(info.fileList); 
    },
  }; 

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


  const onFinish = async (values: any) => { 
 
      const formData = new FormData();
      formData.append("lastInspectionDate", values.date.format("YYYY-MM-DD  HH:mm:ss"));
      if (values.pdfFile?.[0]?.originFileObj) {
        formData.append("pdfReport", values.pdfFile[0].originFileObj);
      }
      if (productId) formData.append("product", productId);
      if (customerId) formData.append("customer", customerId);

      await addInspectionHistory(formData)

      
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={500}
      title={<p className="text-[18px] font-semibold">Add Inspection Report</p>}
      footer={null}
    >
      <div className="w-full p-5 px-0">
        <Form layout="vertical" className="w-1/2" onFinish={onFinish} form={form}>
          <Form.Item
            name="date"
            label={<p className="text-[14px] font-semibold">Inspection Date</p>}
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker className="w-[432px] h-[48px] rounded-lg" />
          </Form.Item>

          <Form.Item
            name="pdfFile"
            label={<p className="text-[14px] font-semibold">Upload PDF</p>}
            valuePropName="fileList"
            getValueFromEvent={(e) =>
              Array.isArray(e) ? e : e?.fileList
            }
            rules={[{ required: true, message: "Please upload a PDF file" }]}
          >
            <Upload {...props}>
              <Button
                icon={<UploadOutlined />}
                className="w-[432px] h-[48px] rounded-lg"
              >
                Upload File
              </Button>
            </Upload>
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            className="w-[432px] h-[50px] text-lg rounded-lg mt-5"
            loading={isLoading}
          >
            Create
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default AddInspectionsModal;
