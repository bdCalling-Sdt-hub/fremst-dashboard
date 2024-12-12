// context/InspectionContext.js
import React, { createContext, useContext, useState } from 'react';
interface InspectionContextValue {
    inspectionData: InspectionData;
    updateInspectionData: (field: keyof InspectionData, value: string) => void;
  } 

  interface StepAnswer {
    question: string;
    comment: string;
    isYes: boolean;
  }
  
  interface Step {
    name: string;
    answers: StepAnswer[];
  }
  
  // Define the types for the inspection data
  interface InspectionData {
    product: string;
    customer: string;
    sku: string;
    enStandard: string;
    serialNo: string;
    storageLocation: string;
    summery: string;
    isApproved: boolean;
    protocolId: string;
    lastInspectionDate: string;
    nextInspectionDate: string;
    step: Step[];
  }


const InspectionContext = createContext<InspectionContextValue | undefined>(undefined);


export const InspectionProvider = ({ children }:{children: React.ReactNode}) => {
  const [inspectionData, setInspectionData] = useState<InspectionData>({
    product: '',
    customer: '',
    sku: '',
    enStandard: '',
    serialNo: '',
    storageLocation: '',
    summery: '',
    isApproved: false,
    protocolId: '',
    lastInspectionDate: '',
    nextInspectionDate: '',
    step: [],
  });
 
 

  const updateInspectionData = (field: keyof InspectionData, value: string) => {
    setInspectionData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <InspectionContext.Provider value={{ inspectionData, updateInspectionData }}>
      {children}
    </InspectionContext.Provider>
  );
};


export const useInspection = () => useContext(InspectionContext);
