import { useState } from "react";
import { RxCross2, RxPlus } from "react-icons/rx";

const data = [
    {
        id: 1, 
        image:"/inspection.png" ,
        lastInspectionDate: "2024-11-02",
        inspectionInterval: "1 months",
        companyName: "Fremst AB - Simon Rosengren",
        inspectionType: "PROTEKT",
        nextInspectionDate: "2025-03-25",
        delay: "-28 Days",
    },
    {
        id: 2, 
        image:"/inspection.png" ,
        lastInspectionDate: "2024-11-02",
        inspectionInterval: "1 months",
        companyName: "Fremst AB - Simon Rosengren",
        inspectionType: "PROTEKT",
        nextInspectionDate: "2025-03-25",
        delay: "-28 Days",
    },
    {
        id: 3, 
        image:"/inspection.png" ,
        lastInspectionDate: "2024-11-02",
        inspectionInterval: "1 months",
        companyName: "Fremst AB - Simon Rosengren",
        inspectionType: "PROTEKT",
        nextInspectionDate: "2025-03-25",
        delay: "-28 Days",
    },
    {
        id: 4, 
        image:"/inspection.png" ,
        lastInspectionDate: "2024-11-02",
        inspectionInterval: "1 months",
        companyName: "Fremst AB - Simon Rosengren",
        inspectionType: "PROTEKT",
        nextInspectionDate: "2025-03-25",
        delay: "-28 Days",
    },
    {
        id: 5, 
        image:"/inspection.png" ,
        lastInspectionDate: "2024-11-02",
        inspectionInterval: "1 months",
        companyName: "Fremst AB - Simon Rosengren",
        inspectionType: "PROTEKT",
        nextInspectionDate: "2025-03-25",
        delay: "-28 Days",
    },
  
    
];

const UpcomingInspections = () => { 
    const [activeButton, setActiveButton] = useState<string | null>("ascending");

    // Button data array
    const buttons = [
      {
        id: 'ascending',
        label: 'Ascending date',
      },
      {
        id: 'descending',
        label: 'Descending date',
      },
    ];
  
    const handleButtonClick = (id: string) => {
      setActiveButton(id === activeButton ? null : id); // Toggle active state
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
              ? 'bg-primary text-white'
              : 'border border-[#282828] text-[#242424]'
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
                {data.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <img src={item?.image} alt="Inspection Icon" className="w-12 h-[64px]" />
                            <div>
                                <p className="text-[#282828] font-medium text-[15px] pb-1">Last inspection date: <span className="font-medium text-[#535353]">{item.lastInspectionDate}</span></p>
                                <p className="text-[#282828] font-medium text-[16px]">Inspection interval: <span className="text-[#535353] font-medium text-[16px]">{item.inspectionInterval}</span></p>
                               
                            </div>
                        </div>  

                        <div>
                        <p className=" text-[#C1920C] font-medium text-[15px] pb-1">{item.companyName}</p>
                        <p className="text-[#167851] font-medium text-[15px] pb-1">{item.inspectionType}</p>
                        </div> 

                        <div>
                            <p>Next inspection: <span className="font-medium text-[15px] pb-1 ">{item.nextInspectionDate}</span></p>
                            <p className="font-medium text-[15px] pb-1 text-[#D2410A]">Delayed: {item.delay}</p>
                        </div>
                        <button className="bg-primary text-white w-[152px]  rounded-lg h-[40px] font-medium">Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingInspections;
