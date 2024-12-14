
import { Table, Typography, Checkbox } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInspectionByIdQuery } from '../../../redux/features/Dashboard/homeApi';
import { imageUrl } from '../../../redux/base/baseApi';
import moment from 'moment';
import { useDeleteInspectionHistoryMutation, useGetInspectionHistoryQuery } from '../../../redux/features/Dashboard/inspectionsApi';
import Swal from 'sweetalert2';
import AddInspectionsModal from './AddInspectionsModal';
import { useState } from 'react';       
import { useTranslation } from 'react-i18next';

const { Title, Text, Link } = Typography;

const InspectionDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const customerId = queryParams.get('customerId');
  const productId = queryParams.get('productId');
  const userId = queryParams.get('userId');

  const [open, setOpen] = useState(false)

  const { data: inspection } = useInspectionByIdQuery(userId)
  const [deleteInspectionHistory] = useDeleteInspectionHistoryMutation()
  const { data: inspectionsHistory, refetch } = useGetInspectionHistoryQuery({ customerId, productId })
 const {t} = useTranslation()
  const inspectionDetails = inspection?.data

  const inspectionHistory = inspectionsHistory?.data?.history?.map((value: any, index: number) => ({
    key: index + 1,
    id: value?._id,
    report: `${imageUrl}${value?.pdfReport}`,
    date: moment(value?.lastInspectionDate).format('YYYY-MM-DD  , h:mm a')
  }))

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteInspectionHistory(id).then((res) => {

          if (res?.data?.success) {
            Swal.fire({
              text: res?.data?.message,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetch();
            });
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
        });
      }
    });
  }


  // Table columns
  const columns = [
    { title: 'Serial No', dataIndex: 'key', key: 'key' },
    {
      title: 'Report',
      dataIndex: 'report',
      key: 'report',
      render: (report: any) => <Link href={report} target="_blank" className="text-primary">Inspection.pdf</Link>,
    },
    { title: 'Inspection date', dataIndex: 'date', key: 'date' },
    {
      title: 'Overview',
      key: 'action',
      render: (_: any, record: any) => <button className="text-red-500 cursor-pointer" onClick={() => handleDelete(record?.id)}>Delete</button>,
    },
  ];

  return (
    <div className="  mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <Title level={3} className="!m-0">{inspectionDetails?.productName}</Title>
        <button
          className="bg-primary text-white w-[253px] h-[40px] rounded transition"
          onClick={() => setOpen(true)}
        >
          Add Inspection Report
        </button>

      </div>

      {/* Main Details Section */}
      <div className='mb-3 space-2'>
        <Text strong>Username:</Text>{inspectionDetails?.contactPerson}<br />
        <Text strong>Product active:</Text> <Checkbox checked={inspectionDetails?.isActive}  ></Checkbox><br />
        <Text strong>Latest inspection:</Text> <Link href={`${imageUrl}${inspectionDetails?.pdfReport}`} target="_blank" className="text-blue-600">Inspection.pdf</Link>
      </div>

      <div className="flex items-center  gap-8 mb-6">
        {/* Image Side */}
        <div className=" pr-4">
          <img src={
            inspectionDetails?.productImage?.startsWith("https")
              ? inspectionDetails?.productImage
              : `${imageUrl}${inspectionDetails?.productImage}`
          } className="rounded-lg mb-2 w-[302px] h-[280px] " />
        </div>

        {/* Text Side */}
        <div className="">
          <div className="space-y-[2px]">

            <div className="flex items-center gap-5">
              <Text strong className="">Product SKU:</Text>
              <Text className="">{inspectionDetails?.sku}</Text>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Product name:</Text>
              <Text className="">{inspectionDetails?.productName}</Text>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Product brand:</Text>
              <Text className="">{inspectionDetails?.brand}</Text>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Product type:</Text>
              <Text className="">{inspectionDetails?.type}</Text>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Product serial No:</Text>
              <Text className="">{inspectionDetails?.serialNo}</Text>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Product EN Standard:</Text>
              <Text className="">{inspectionDetails?.enStandard}</Text>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Inspection interval:</Text>
              <Text className="">{inspectionDetails?.inspectionInterval}</Text>
            </div>

            <div className="flex items-center gap-5 ">
              <Text strong className="">Latest inspection date:</Text>
              <Text className="">{moment(inspectionDetails?.lastInspectionDate).format("YYYY-MM-DD")}</Text>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Product active:</Text>
              <Checkbox checked={inspectionDetails?.isActive} className="" />
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Inspection history:</Text>
              <Link href={`${imageUrl}${inspectionDetails?.pdfReport}`} target="_blank" className="text-blue-600 ">Inspection.pdf</Link>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Company name:</Text>
              <Text className="">{inspectionDetails?.companyName}</Text>
            </div>

            <div className="flex items-center gap-5">
              <Text strong className="">Contact person:</Text>
              <Text className="">{inspectionDetails?.contactPerson}</Text>
            </div>
          </div>

        </div>
      </div>

      {/* Inspection History Table */}
      <Title level={3} className="mb-4 text-center">{t("inspectionHistory")}</Title>
      <Table
        columns={columns}
        dataSource={inspectionHistory}
        rowKey="id"
        pagination={false}
        className="rounded-lg overflow-hidden border-0 overflow-y-auto"
        rowClassName="bg-white hover:bg-gray-100 font-bold "
      />
      <AddInspectionsModal open={open} setOpen={setOpen} productId={productId} customerId={customerId} />
    </div>
  );
};

export default InspectionDetails;
