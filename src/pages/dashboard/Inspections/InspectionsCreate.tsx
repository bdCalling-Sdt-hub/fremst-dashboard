import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useInspection } from '../../../context/InspectionContext';
import { useGetAllCustomersQuery } from '../../../redux/features/Dashboard/customersApi';
import { BsArrowLeft } from 'react-icons/bs';
import { Form, Select } from 'antd';
import CommonInput from '../../../components/shared/CommonInput';

const InspectionsCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { inspectionData, updateInspectionData } = useInspection();
  const product = queryParams.get('id');
  const { category } = useParams();
  const { data: customersData } = useGetAllCustomersQuery({});



  useEffect(() => {
    if (!inspectionData.product && product) {
      updateInspectionData('product', product);
    }
  }, [product, inspectionData, updateInspectionData]);



  const onFinish = (values: any) => {
    const protocolId = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1).join('');

    updateInspectionData('customer', values.customer);
    updateInspectionData('sku', values.sku);
    updateInspectionData('enStandard', values.enStandard);
    updateInspectionData('serialNo', values.serialNo);
    updateInspectionData('storageLocation', values.storageLocation);
    updateInspectionData('protocolId', protocolId);

    navigate(`/inspections-creates/${category}?id=${product}`);
  };


  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 pb-[24px]'>
        <Link to="/products">
          <BsArrowLeft size={26} />
        </Link>
        <p className='text-[18px] font-semibold'>Create Inspections</p>
      </div>

      {/* Form */}
      <Form layout='vertical' className='w-1/2' onFinish={onFinish}>
        <div className='pb-[5px]'>
          <CommonInput name='serialNo' label='Serial No' />
          <CommonInput name='enStandard' label='En Standard' />
          <CommonInput name='sku' label='Product SKU' />
          <CommonInput name='storageLocation' label='Storage Location' />

          <Form.Item
            name="customer"
            label={<p className='text-[14px] font-semibold'>Select Customer</p>}
            rules={[{ required: true, message: `Customer is required` }]}
          >
            <Select
              placeholder="Select a customer"
              style={{ width: "100%", height: "48px" }}
              showSearch
              optionFilterProp="children"
            >
              {customersData?.data?.map((customer: { _id: string, contactPerson: string, email: string }) => (
                <Select.Option key={customer._id} value={customer._id}>
                  {customer.contactPerson} ({customer.email})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <button type="submit" className="bg-primary text-white w-full h-[50px] text-lg rounded-lg mt-5">
            Next
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InspectionsCreate;


