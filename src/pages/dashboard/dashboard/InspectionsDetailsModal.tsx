import { Checkbox, Modal, Typography } from "antd";
import { imageUrl } from "../../../redux/base/baseApi";
import moment from "moment";
import { useInspectionByIdQuery } from "../../../redux/features/Dashboard/homeApi";
const {  Text, Link } = Typography;
export interface Inspection {
    _id: string;
    sku: string;
    enStandard: string;
    serialNo: string;
    isActive: boolean;
    productImage: string;
    summery: string;
    isApproved: boolean;
    lastInspectionDate: string;
    nextInspectionDate: string;
    createdAt: string;
    name: string;
    brand: string;
    companyName: string;
    contactPerson: string;
    inspectionInterval: string;
    delayedDays: number; 
    pdfReport: string ;
  } 

const InspectionsDetailsModal = ({open , setOpen , itemDetails}:{open:boolean , setOpen:(open:boolean)=>void , itemDetails: string}) => { 

    const {data} = useInspectionByIdQuery(itemDetails) 

    const inspectionDetails = data?.data

    //console.log(inspectionDetails);    

    return ( 
        <div>
                 <Modal
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={780} 
    
        footer={null}
      >  
      <div className=" py-10 px-5">
      <div className="flex items-center  gap-8 mb-6">
  {/* Image Side */}
  <div className=" pr-4 w-1/3">
    <img src={
                  inspectionDetails?.productImage?.startsWith("https")
                    ? inspectionDetails?.productImage
                    : `${imageUrl}${inspectionDetails?.productImage}`
                } 
                 className="rounded-lg mb-2 w-[302px] h-[280px] " />
  </div>

  {/* Text Side */}
  <div className=" w-2/3">
  <div className="space-y-[2px]"> 

  <div className="flex items-center gap-5">
    <Text strong className="w-1/3">Product SKU:</Text>
    <Text className="w-2/3">{inspectionDetails?.sku}</Text>
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
    <Text className=""> {moment(inspectionDetails?.lastInspectionDate).format("YYYY-MM-DD")}</Text>
  </div>
  
  <div className="flex items-center gap-5">
    <Text strong className="">Product active:</Text>
    <Checkbox checked={inspectionDetails?.isActive} className=""  />
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

      </div>
      </Modal>
        </div>
    );
};

export default InspectionsDetailsModal;