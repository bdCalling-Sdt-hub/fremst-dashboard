
import {Table, Typography,  Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Link } = Typography;

const InspectionDetails = () => { 
    const navigate = useNavigate()

  const inspectionHistory = [
    { id: '35646464', report: 'BESIKTNING 240830_beb.pdf', date: '2024/10/21 , 12:56 AM' },
    { id: '35646464', report: 'BESIKTNING 240830_beb.pdf', date: '2024/10/21 , 12:56 AM' },
    { id: '35646464', report: 'BESIKTNING 240830_beb.pdf', date: '2024/10/21 , 12:56 AM' },
    { id: '35646464', report: 'BESIKTNING 240830_beb.pdf', date: '2024/10/21 , 12:56 AM' },
  ];

  // Table columns
  const columns = [
    { title: 'Protocol ID', dataIndex: 'id', key: 'id' },
    { 
      title: 'Report', 
      dataIndex: 'report', 
      key: 'report', 
      render: (report:any) => <Link href={`/${report}`} target="_blank" className="text-primary">{report}</Link>,
    },
    { title: 'Inspection date', dataIndex: 'date', key: 'date' },
    { 
      title: 'Overview', 
      key: 'action', 
      render: () => <button className="text-red-500 cursor-pointer">Delete</button>, 
    },
  ];

  return (
    <div className="  mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <Title level={3} className="!m-0">Safety harness</Title> 
        <button
            className="bg-primary text-white w-[253px] h-[40px] rounded transition"
            onClick={() => navigate('/inspections-add')}  
          >
          Add Inspection Report
          </button>

      </div>

      {/* Main Details Section */} 
      <div className='mb-3 space-2'>
              <Text strong>Username:</Text> Ture Hollander<br />
              <Text strong>Product active:</Text> <Checkbox defaultChecked  ></Checkbox><br />
              <Text strong>Latest inspection:</Text> <Link href="/BESIKTNING 240830_beb.pdf" target="_blank" className="text-blue-600">BESIKTNING 240830_beb.pdf</Link>
            </div> 

            <div className="flex items-center  gap-8 mb-6">
  {/* Image Side */}
  <div className=" pr-4">
    <img src="/inspections.svg" className="rounded-lg mb-2 w-[302px] h-[280px] " />
  </div>

  {/* Text Side */}
  <div className="">
  <div className="space-y-[2px]"> 

  <div className="flex items-center gap-5">
    <Text strong className="w-1/3">Product SKU:</Text>
    <Text className="w-2/3">451684</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Product name:</Text>
    <Text className="">Fallskyddssele - deluxe</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Product brand:</Text>
    <Text className="">PROTEX</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Product type:</Text>
    <Text className="">Fallskyddssele</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Product serial No:</Text>
    <Text className="">654456</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Product EN Standard:</Text>
    <Text className="">654465468/54542</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Inspection interval:</Text>
    <Text className="">12 Months</Text>
  </div>
  
  <div className="flex items-center gap-5 ">
    <Text strong className="">Latest inspection date:</Text>
    <Text className="">2023 Aug 30</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Product active:</Text>
    <Checkbox defaultChecked className="" />
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Inspection history:</Text>
    <Link href="/BESIKTNING 240830_beb.pdf" target="_blank" className="text-blue-600 ">BESIKTNING 240830_beb.pdf</Link>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Company name:</Text>
    <Text className="">Fermat AB</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Contact person:</Text>
    <Text className="">Simon Roeggen</Text>
  </div>
</div>

  </div>
</div>

      {/* Inspection History Table */}
      <Title level={3} className="mb-4 text-center">Inspection history</Title>
      <Table 
        columns={columns} 
        dataSource={inspectionHistory} 
        rowKey="id" 
        pagination={false} 
        className="rounded-lg overflow-hidden border-0 overflow-y-auto"
        rowClassName="bg-white hover:bg-gray-100 font-bold "
      />
    </div>
  );
};

export default InspectionDetails;
