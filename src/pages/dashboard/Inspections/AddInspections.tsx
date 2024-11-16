import { Button, ConfigProvider, DatePicker, Form, message, Select, Upload } from "antd";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const AddInspections = () => { 

    const props: UploadProps = {
        beforeUpload: (file) => {
          const isPDF = file.type === 'application/pdf';
          if (!isPDF) {
            message.error(`${file.name} is not a PDF file`);
          }
          return isPDF || Upload.LIST_IGNORE;
        },
        onChange: (info) => {
          console.log(info.fileList);
        },
      };

    return (
        <div className='w-full'>
            <div className='flex items-center gap-2 pb-[24px]'>
                <Link to="/inspections"> <BsArrowLeft size={26} />
                </Link>
                <p className='text-[18px] font-semibold' >Add Inspection Report </p>
            </div>

            {/* form   */}

            <Form layout='vertical' className='w-1/2'>


                <Form.Item name="productID" label={<p className='text-[14px] font-semibold'>Product ID</p>}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Select: {
                                    controlItemBgActive: "white",
                                    controlItemBgHover: "#F6F6F6",
                                    borderRadius: 10,
                                    controlOutline: "none",

                                },
                            },
                        }}
                    >

                        <Select
                            defaultValue="lucy"
                            style={{
                                width: 432,
                                height: 48
                            }}

                            options={[
                                {
                                    value: 'lucy',
                                    label: 'Lucy',
                                },
                                {
                                    value: 'lucy2',
                                    label: 'Lucy2',
                                },
                            ]}
                        />
                    </ConfigProvider>
                </Form.Item>

                <Form.Item name="date" label={<p className='text-[14px] font-semibold'>Inspection Date</p>}>
                <DatePicker className="w-[432px] h-[48px] rounded-lg" />
                </Form.Item>

                <Form.Item
  name="pdfFile"
  label={<p className="text-[14px] font-semibold">Upload PDF</p>}
  valuePropName="fileList"
  getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
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

                <button className="bg-primary text-white w-[432px] h-[50px] text-lg rounded-lg mt-5">
                    Create
                </button>
            </Form>

        </div>
    );
};

export default AddInspections;