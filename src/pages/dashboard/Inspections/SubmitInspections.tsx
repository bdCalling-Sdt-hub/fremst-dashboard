import { Input } from "antd";
import { useState, useEffect } from "react";
import { PiImageThin } from "react-icons/pi";
import { useInspection } from "../../../context/InspectionContext";
import { jsPDF } from "jspdf";
import { useCreateInspectionMutation } from "../../../redux/features/Dashboard/inspectionsApi";
import moment from "moment";

const SubmitInspections = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { updateInspectionData, inspectionData } = useInspection();
  const [createInspection, { isLoading }] = useCreateInspectionMutation();

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setImgFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    const today = new Date().toISOString();
    updateInspectionData("lastInspectionDate", today);

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl); // Cleanup the URL to prevent memory leaks
      }
    };
  }, [imageUrl]);

  const handleApproval = (isApproved: boolean) => {
    updateInspectionData("isApproved", isApproved);
  };

  const handleNextInspection = (months: number) => {
    const currentDate = moment();
    const nextInspectionDate = currentDate.add(months, 'months');
    const formattedDate = nextInspectionDate.format("YYYY-MM-DD HH:mm:ss");
    updateInspectionData("nextInspectionDate", formattedDate);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateInspectionData("summery", e.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Inspection Report", 10, 10);
    
    doc.setFontSize(12);
    
    const customer = inspectionData?.customer || "Unknown Customer";
    const product = inspectionData?.product || "Unknown Product";
    const sku = inspectionData?.sku || "Unknown SKU";
    const enStandard = inspectionData?.enStandard || "Unknown Standard";
    const serialNo = inspectionData?.serialNo || "Unknown Serial No";
    const storageLocation = inspectionData?.storageLocation || "Unknown Location";
    const lastInspectionDate = moment(inspectionData?.lastInspectionDate).format('YYYY-MM-DD HH:mm:ss') || "Unknown Date";
    const nextInspectionDate = moment(inspectionData?.nextInspectionDate).format('YYYY-MM-DD HH:mm:ss') || "Unknown Date";
    
    doc.text(`Customer: ${customer}`, 10, 20);
    doc.text(`Product: ${product}`, 10, 30);
    doc.text(`SKU: ${sku}`, 10, 40);
    doc.text(`EN Standard: ${enStandard}`, 10, 50);
    doc.text(`Serial No: ${serialNo}`, 10, 60);
    doc.text(`Storage Location: ${storageLocation}`, 10, 70);
    doc.text(`Last Inspection Date: ${lastInspectionDate}`, 10, 80);
    doc.text(`Next Inspection Date: ${nextInspectionDate}`, 10, 90);
  
    const summery = inspectionData?.summery || "No Summary Available";
    doc.text("Inspection Summary:", 10, 100);
    doc.text(summery, 10, 110);
  
    const controlPoints = inspectionData?.step || [];
    let yPos = 130;
  
    controlPoints.forEach((step) => {
      doc.text(`${step.name}:`, 10, yPos);
      yPos += 10;
  
      step.answers.forEach((answer) => {
        const question = answer.question || "No Question";
        const comment = answer.comment || "No Comment";
        const response = answer.isYes ? "YES" : "NO";
  
        doc.text(`Q: ${question}`, 10, yPos);
        yPos += 7;
        doc.text(`Response: ${response}`, 10, yPos);
        yPos += 7;
        doc.text(`Comment: ${comment}`, 10, yPos);
        yPos += 10;
      });
    });
  
    const approvalStatus = inspectionData?.isApproved ? "Approved" : "Rejected";
    doc.text(`Approval Status: ${approvalStatus}`, 10, yPos);
    yPos += 10;
  
    if (imgFile) {
      const imgURL = URL.createObjectURL(imgFile);
      doc.addImage(imgURL, "PNG", 10, yPos, 50, 50);
      yPos += 60;
    }
    const pdfBase64 = doc.output('datauristring');
  
   
    const byteCharacters = atob(pdfBase64.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset++) {
      const byte = byteCharacters.charCodeAt(offset);
      byteArrays.push(byte);
    }
    const pdfBlob = new Blob([new Uint8Array(byteArrays)], { type: 'application/pdf' });
  
    return pdfBlob;
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (imgFile) {
      formData.append("inspectionImage", imgFile);
    }
    formData.append("data", JSON.stringify(inspectionData));

    const pdfBlob = generatePDF(); 
    console.log(pdfBlob, "generated.pdf");
    formData.append("pdfReport", pdfBlob, "generated.pdf");

    try {
      const res = await createInspection(formData).unwrap();
      console.log(res);
    } catch (error) {
      console.error("Error submitting inspection:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-10 w-2/3">
        <div className="w-full">
          <p className="text-[14px] font-semibold py-2">Inspection Summary</p>
          <Input.TextArea rows={8} className="w-full rounded-lg resize-none" onChange={handleSummaryChange} />
          
          <div className="flex gap-5 my-10">
            <button
              className="w-1/2 border border-[#229E45] text-[#229E45] hover:bg-[#229E45] hover:text-white h-[45px] rounded-md font-medium"
              onClick={() => handleApproval(true)}
            >
              Approved
            </button>
            <button
              className="w-1/2 bg-[#D2410A] h-[45px] rounded-md text-white border border-[#D2410A] hover:text-[#D2410A] hover:bg-transparent font-medium"
              onClick={() => handleApproval(false)}
            >
              Rejected
            </button>
          </div>

          <div className="flex gap-5">
            <button
              className="w-1/2 border border-primary text-primary hover:bg-primary hover:text-white h-[45px] rounded-md font-medium"
              onClick={() => handleNextInspection(6)}
            >
              6 months
            </button>
            <button
              className="w-1/2 bg-primary h-[45px] rounded-md text-white border border-primary hover:text-primary hover:bg-transparent font-medium"
              onClick={() => handleNextInspection(12)}
            >
              12 months
            </button>
          </div>

          <button
            className="w-full bg-primary h-[45px] rounded-md text-white font-medium mt-16"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>

        <div className="mb-8 w-full">
          <p className="text-[14px] font-semibold py-1">Upload Product Picture</p>
          <label htmlFor="image" className="p-3   ">
            <div className="flex justify-center items-center w-full h-[250px] border-2 border-dotted border-gray-200 bg-white">
              {imageUrl ? (
                <img src={imageUrl} style={{ height: "120px", width: "120px", borderRadius: 10, objectFit: "contain" }} alt="" />
              ) : (
                <PiImageThin className="text-8xl flex items-center justify-center text-[#666666] font-[400]" />
              )}
            </div>

            <div className="hidden">
              <Input id="image" type="file" onInput={handleChange} />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SubmitInspections;
