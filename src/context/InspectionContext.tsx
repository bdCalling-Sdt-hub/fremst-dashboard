import React, { createContext, useContext, useState } from 'react';

interface StepAnswer {
  question: string;
  comment: string;
  isYes: boolean;
}

interface Step {
  name: string;
  answers: StepAnswer[];
}

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
  brand: string;
  username: string;
  companyName: string;
  lastInspectionDate: string;
  nextInspectionDate: string;
  step: Step[];
}

interface InspectionContextValue {
  inspectionData: InspectionData;
  updateInspectionData: (field: keyof InspectionData, value: string) => void;
  updateStepData: (stepName: string, answers: StepAnswer[]) => void; 
  completedSteps: Record<string, boolean>;
  markStepComplete: (stepId: string) => void;
}

const InspectionContext = createContext<InspectionContextValue | undefined>(undefined);

export const InspectionProvider = ({ children }: { children: React.ReactNode }) => { 
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({}); 
  const [inspectionData, setInspectionData] = useState<InspectionData>({
    product: '',
    customer: '',
    sku: '',
    enStandard: '',
    serialNo: '', 
    brand: '', 
    companyName: '', 
    username: '',
    storageLocation: '',
    summery: '',
    isApproved: false,
    protocolId: '',
    lastInspectionDate: '', 
    nextInspectionDate: '',
    step: [],
  }); 

  const markStepComplete = (stepId: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepId]: true }));
  }; 

  const updateStepData = (stepName: string, answers: StepAnswer[]) => {
    setInspectionData((prevState) => {
      // Check if the step already exists
      const existingStepIndex = prevState.step.findIndex((step) => step.name === stepName);
      const updatedStep = { name: stepName, answers };
  
      if (existingStepIndex !== -1) {
        // Update the specific step
        return {
          ...prevState,
          step: prevState.step.map((step, index) =>
            index === existingStepIndex ? updatedStep : step
          ),
        };
      }
  
      // Add the new step to the array
      return {
        ...prevState,
        step: [...prevState.step, updatedStep],
      };
    });
  };

  const updateInspectionData = (field: keyof InspectionData, value: string) => {
    setInspectionData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <InspectionContext.Provider value={{ inspectionData, updateInspectionData, updateStepData , completedSteps, markStepComplete }}>
      {children}
    </InspectionContext.Provider>
  );
};

export const useInspection = () => {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspection must be used within an InspectionProvider');
  }
  return context;
};
