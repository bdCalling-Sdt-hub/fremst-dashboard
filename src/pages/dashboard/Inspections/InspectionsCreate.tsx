import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useInspection } from '../../../context/InspectionContext';
import { useGetAllCustomersQuery } from '../../../redux/features/Dashboard/customersApi';
import { BsArrowLeft } from 'react-icons/bs';
import { Form, Input, Select } from 'antd';
import CommonInput from '../../../components/shared/CommonInput';
import { useTranslation } from 'react-i18next';
import { useGetProfileQuery } from '../../../redux/features/auth/authApi';

const InspectionsCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { data: profile } = useGetProfileQuery(undefined)
  const { inspectionData, updateInspectionData } = useInspection();
  //console.log(profile?.data?.name);
  const product = queryParams.get('id');
  const { category } = useParams();
  const { data: customersData } = useGetAllCustomersQuery({});
  const { t } = useTranslation();


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
    updateInspectionData('brand', values.brand);
    updateInspectionData('companyName', values.companyName);
    updateInspectionData('username', values.username);
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
        <p className='text-[18px] font-semibold'>{t("createInspection")}</p>
      </div>

      {/* Form */}
      <Form layout='vertical' className='w-1/2' onFinish={onFinish}
        initialValues={{
          username: profile?.data?.name,
        }} >
        <div className='pb-[5px]'>
          <CommonInput name='serialNo' label='Serial No' />
          <CommonInput name='enStandard' label='En Standard' />
          <CommonInput name='sku' label='Product SKU' />
          <CommonInput name='storageLocation' label='Storage Location' />
          <CommonInput name='brand' label='Brand' />
          <CommonInput name='companyName' label='Company Name' />
          <Form.Item
            name="username"
            label={<p className='text-[14px] font-semibold'>User Name</p>}

          >
            <Input

              style={{
                border: "1px solid #BABABA",
                height: "48px",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
                padding: "8px",
                background: "white",
              }}
            
              readOnly
            />
          </Form.Item>


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


