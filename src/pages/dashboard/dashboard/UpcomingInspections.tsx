//@ts-nocheck
import { useState, useEffect } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { imageUrl } from "../../../redux/base/baseApi";
import moment from "moment";
import InspectionsDetailsModal from "./InspectionsDetailsModal";

export interface Root {
  customers: number;
  products: number;
  inspections: Inspection[];
}

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
}

const UpcomingInspections = ({ homeData }: { homeData: Root }) => {  
  const [open , setOpen] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>("ascending");
  const [displayedInspections, setDisplayedInspections] = useState<Inspection[]>(
    homeData?.inspections || []
  ); 

  const [itemDetails, setItemDetails] = useState(null) 
  console.log(itemDetails);

  useEffect(() => {
    if (homeData?.inspections) {
      const sorted = [...homeData?.inspections].sort((a, b) => {
        const dateA = new Date(a.nextInspectionDate).getTime();
        const dateB = new Date(b.nextInspectionDate).getTime();
        return activeButton === "ascending" ? dateA - dateB : dateB - dateA;
      });
      setDisplayedInspections(sorted);
    }
  }, [activeButton, homeData?.inspections]);

  const buttons = [
    {
      id: "ascending",
      label: "Ascending date",
    },
    {
      id: "descending",
      label: "Descending date",
    },
  ];

  const handleButtonClick = (id: string) => {
    setActiveButton(id === activeButton ? null : id);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center space-x-7 mb-4 mt-[44px] w-1/2">
        <h2 className="text-[16px] font-[600]">Upcoming inspections</h2>
        <p className="text-gray-600 font-[600] text-[12px]">Filter by</p>
        <div className="flex gap-2">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => handleButtonClick(button.id)}
              className={`w-[155px] h-[32px] rounded flex items-center gap-1 justify-center ${
                activeButton === button.id
                  ? "bg-primary text-white"
                  : "border border-[#282828] text-[#242424]"
              }`}
            >
              <span>{button.label}</span>
              <span>
                {activeButton === button.id ? (
                  <RxCross2 size={14} />
                ) : (
                  <RxPlus size={14} color="#242424" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Inspection List */}
      <div className="space-y-5 w-3/4 ">
        {displayedInspections.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4  ">
              <img
                src={
                  item?.productImage?.startsWith("https")
                    ? item?.productImage
                    : `${imageUrl}${item?.productImage}`
                }
                alt="Inspection Icon"
                className="w-12 h-[64px] p-1 rounded border border-primary "
              />
              <div>
                <p className="text-[#282828] font-medium text-[15px] pb-1">
                  Last inspection date:{" "}
                  <span className="font-medium text-[#535353]">
                    {moment(item.lastInspectionDate).format("YYYY-MM-DD")}
                  </span>
                </p>
                <p className="text-[#282828] font-medium text-[16px]">
                  Inspection interval:{" "}
                  <span className="text-[#535353] font-medium text-[16px]">
                    {item.inspectionInterval}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <p className=" text-[#C1920C] font-medium text-[15px] pb-1">
                {item.companyName}
              </p>
              <p className="text-[#167851] font-medium text-[15px] pb-1">
                {item.brand}
              </p>
            </div>

            <div>
              <p>
                Next inspection:{" "}
                <span className="font-medium text-[15px] pb-1 ">
                  {moment(item.nextInspectionDate).format("YYYY-MM-DD")}
                </span>
              </p>
              <p className="font-medium text-[15px] pb-1 text-[#D2410A]">
                Delayed: {item.delayedDays}
              </p>
            </div>
            <button className="bg-primary text-white w-[152px]  rounded-lg h-[40px] font-medium" onClick={() => { setOpen(true), setItemDetails(item?._id) }}>
              Details
            </button>
          </div>
        ))}
      </div> 
      <InspectionsDetailsModal open={open} setOpen={setOpen} itemDetails={itemDetails} />
    </div>
  );
};

export default UpcomingInspections;
