import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useInspection } from '../../../context/InspectionContext';
import { useGetAllCustomersQuery } from '../../../redux/features/Dashboard/customersApi';
import { BsArrowLeft } from 'react-icons/bs';
import { Form, Select } from 'antd';
import CommonInput from '../../../components/shared/CommonInput';
import { useTranslation } from 'react-i18next';
import { useGetAllBrandsQuery } from '../../../redux/features/Dashboard/brandApi';
import { useGetAllEmployeesQuery } from '../../../redux/features/Dashboard/inspectionsApi';

const InspectionsCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { inspectionData, updateInspectionData } = useInspection(); 
  const [selectedCustomerId , setSelectedCustomerId] = useState<string | undefined>() 
  const {data:allEmployees} = useGetAllEmployeesQuery(selectedCustomerId)
  const product = queryParams.get('id');
  const { category } = useParams();
  const { data: customersData } = useGetAllCustomersQuery({});
  const { t } = useTranslation(); 
  const {data:allBrands} = useGetAllBrandsQuery({})   

  useEffect(() => {
    if (!inspectionData.product && product) {
      updateInspectionData('product', product);
    }
  }, [product, inspectionData, updateInspectionData]);

 
  const handleCustomerChange = (value:any) => {    
    const selectedCustomer = JSON.parse(value);
    setSelectedCustomerId(selectedCustomer?.id)
  };

  const onFinish = (values: { customer: string; sku: string; enStandard: string; serialNo: string; brand: string; username: string; storageLocation: string; }) => {
    const selectedCustomer = JSON.parse(values.customer);
    const protocolId = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1).join('');
  
    updateInspectionData('customer', selectedCustomer.id);
    updateInspectionData('sku', values.sku);
    updateInspectionData('enStandard', values.enStandard);
    updateInspectionData('serialNo', values.serialNo);
    updateInspectionData('brand', values.brand);
    updateInspectionData('companyName', selectedCustomer.name);
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
      <Form layout='vertical' className='w-1/2' onFinish={onFinish} >
        <div className='pb-[5px]'>
          <CommonInput name='serialNo' label='Serial no' />
          <CommonInput name='enStandard' label='En standard' />
          <CommonInput name='sku' label='Product SKU' />
          <CommonInput name='storageLocation' label='Storage location' />
          <Form.Item
            name="brand"
            label={<p className='text-[14px] font-semibold'>Select brand</p>}
            rules={[{ required: true, message: `Customer is required` }]}
          >
            <Select
              placeholder="Select a brand"
              style={{ width: "100%", height: "48px" }}
              showSearch
              optionFilterProp="children"
            >
              {allBrands?.data?.map((brand: { _id: string, name: string }) => (
                <Select.Option key={brand?._id} value={brand?.name}>
                  {brand?.name} 
                </Select.Option>
              ))}
            </Select>
          </Form.Item>  


          <Form.Item
            name="customer"
            label={<p className='text-[14px] font-semibold'>Select customer</p>}
            rules={[{ required: true, message: `Customer is required` }]}
          >
            <Select
              placeholder="Select a customer"
              style={{ width: "100%", height: "48px" }}
              showSearch
              optionFilterProp="children" 
              onChange={(value) => {handleCustomerChange(value)}}
            >
              {customersData?.data?.map((customer: { _id: string, companyName: string}) => (
               <Select.Option
               key={customer._id}
               value={JSON.stringify({ id: customer._id, name: customer.companyName })}
             >
               {customer.companyName}
             </Select.Option>
              ))}
            </Select>
          </Form.Item>  


          <Form.Item
            name="username"
            label={<p className='text-[14px] font-semibold'>Select Employee</p>}
            rules={[{ required: true, message: `Customer is required` }]} 
          >
            <Select
              placeholder="Select a employee"
              style={{ width: "100%", height: "48px" }}
              showSearch
              optionFilterProp="children"  
              disabled={!selectedCustomerId}
            >
              {allEmployees?.data?.map((customer: { _id: string, name: string}) => (
               <Select.Option
               key={customer._id}
               value={customer.name}
             >
               {customer.name}
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


