//@ts-nocheck
import { Input } from "antd";
import { useState, useEffect } from "react";
import { PiImageThin } from "react-icons/pi";
import { useInspection } from "../../../context/InspectionContext";
import { jsPDF } from "jspdf";
import { useCreateInspectionMutation } from "../../../redux/features/Dashboard/inspectionsApi";
import moment from "moment";
import Swal from "sweetalert2";
import "jspdf-autotable";
import { useGetProductByIdQuery } from "../../../redux/features/Dashboard/productsApi";
import { useGetCustomerByIdQuery } from "../../../redux/features/Dashboard/customersApi";

const SubmitInspections = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { updateInspectionData, inspectionData } = useInspection();
  const [createInspection, { isLoading, isError, isSuccess, data, error }] = useCreateInspectionMutation(); 

  const {data:product} = useGetProductByIdQuery(inspectionData.product) 
  const {data:customer} = useGetCustomerByIdQuery(inspectionData.customer) 
  
  const productName = product?.data?.name;
  const customerName = customer?.data?.contactPerson;
  const [month , setMonth] = useState(0)
 console.log(inspectionData); 
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          text: data?.message,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
    if (isError) {
      Swal.fire({
        //@ts-ignore
        text: error?.data?.message,
        icon: "error",
      });
    }
  }, [isSuccess, isError, error, data]);

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
        URL.revokeObjectURL(imageUrl); 
      }
    };
  }, [imageUrl]);

  const handleApproval = (isApproved: boolean) => {
    updateInspectionData("isApproved", isApproved);
  };

  const handleNextInspection = (months: number) => { 
    setMonth(months)
    const currentDate = moment();
    const nextInspectionDate = currentDate.add(months, "months");
    const formattedDate = nextInspectionDate.format("YYYY-MM-DD HH:mm:ss");
    updateInspectionData("nextInspectionDate", formattedDate);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateInspectionData("summery", e.target.value);
  }; 



  const generatePDF = () => {
    const doc = new jsPDF();
    const inspectionDate = moment().format("YYYY-MM-DD");
    
    const padding = 15; 
    const pageWidth = doc.internal.pageSize.width;

    doc.addImage("/pdflogo.png", "PNG", 15, 10, 45, 15);
    
    doc.setFontSize(16);
    const reportTitle = "Inspection Report - Denton Maddox";
    const textWidth = doc.getTextWidth(reportTitle);
    doc.text(reportTitle, pageWidth - textWidth - padding, 20);
    
    doc.setFontSize(12);
    
    // Text content with padding
    doc.text(`Customer: ${customerName || "Unknown"}`, padding, 40);
    doc.text(
      `Protocol ID: ${inspectionData.protocolId || "Unknown"}`,
      pageWidth - 80 - padding,
      40
    );
    
    doc.text(`Employee: ${inspectionData.username || "Unknown"}`, padding, 45);
    doc.text(
      `Product Name: ${productName || "Unknown"}`,
      pageWidth - 80 - padding,
      45
    );
    
    doc.text(`Date: ${inspectionDate}`, padding, 50);
    doc.text(
      `Storage Location:  ${inspectionData.storageLocation || "Unknown"}`,
      pageWidth - 80 - padding,
      50
    );
    
    doc.text(
      `Product SKU:  ${inspectionData.sku || "Unknown"}`,
      pageWidth - 80 - padding,
      55
    );
    doc.text(
      `Product Brand: ${inspectionData.brand || "Unknown"}`,
      pageWidth - 80 - padding,
      60
    );
    
  // Table setup
  const startX = padding;
  const startY = 70;
  const cellPadding = 5;
  const rowHeight = 10;
  const colWidths = [60, 50, 70]; // Adjust column widths as needed

  // Draw table header
  const headers = ["Control Points", "OK", "Comments"];
  let currentY = startY;
  let currentX = startX;

  doc.setFont("helvetica", "bold");
  headers.forEach((header, i) => {
    const colWidth = colWidths[i];
    doc.rect(currentX, currentY, colWidth, rowHeight); 
    doc.text(header, currentX + cellPadding, currentY + rowHeight / 2 + 2); 
    currentX += colWidth;
  });

  currentX = startX;
  currentY += rowHeight;

  // Table body
  doc.setFont("helvetica", "normal");
  const rows = inspectionData?.step?.flatMap((step) =>
    step.answers.map((answer) => [
      answer.question || "N/A",
      answer.isYes ? "YES" : "NO",
      answer.comment || "N/A",
    ])
  ) || [];

  rows.forEach((row) => {
    row.forEach((cell, i) => {
      const colWidth = colWidths[i];
      doc.rect(currentX, currentY, colWidth, rowHeight);
      doc.text(cell.toString(), currentX + cellPadding, currentY + rowHeight / 2 + 2);
      currentX += colWidth;
    });
    currentX = startX; 
    currentY += rowHeight; 
  });
 
  const pageHeight = doc.internal.pageSize.height; 
  const watermarkText = "FREMST";

  // Set font properties
  doc.setFontSize(110);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(90, 91, 157); 
  
  // Set transparency
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.1 })); 
  
  const centerX = (pageWidth - textWidth) / 2.5;
  const centerY = pageHeight / 3;
  
  // Draw rotated watermark
  const angle = -40;
  doc.text(watermarkText, centerX, centerY, { angle });
  
  // Restore graphics state to remove transparency settings
  doc.restoreGraphicsState();
  
    doc.setFontSize(12);
    // doc.setTextColor(0, 0, 0);   

    const isApproved = inspectionData.isApproved;
    const approvalText = isApproved ? "approved" : "not approved";
    
    currentY = rows.length > 0 ? startY + rowHeight * (rows.length + 1) : startY;
    
    const baseText = "The equipment is "; // Text before approvalText
    const endText = " as fall protection equipment"; 
    let textX = padding;
    let textY = currentY + 10;
    
    // Set font and default text color (black)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    doc.text(baseText, textX, textY);
    const baseTextWidth = doc.getTextWidth(baseText);

    if (isApproved) {
      doc.setTextColor(0, 128, 0); 
    } else {
      doc.setTextColor(255, 0, 0); 
    }

    doc.text(approvalText, textX + baseTextWidth, textY);  
    doc.setTextColor(0, 0, 0);
    const approvalTextWidth = doc.getTextWidth(approvalText);
    doc.text(endText, textX + baseTextWidth + approvalTextWidth, textY); 

    doc.text(
      `The next inspection should take place within ${month} months from the inspection`,
      padding,
      currentY + 15
    );
    doc.text(
      `Inspection date & place: ${inspectionDate}`,
      padding,
      currentY + 22
    );

    // Generate PDF as Blob or Download
    const pdfBlob = doc.output("blob");
    return pdfBlob;
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (imgFile) {
      formData.append("inspectionImage", imgFile);
    }
    formData.append("data", JSON.stringify(inspectionData));

    const pdfBlob = generatePDF();
    //console.log(pdfBlob, "generated.pdf");
    formData.append("pdfReport", pdfBlob, "generated.pdf");

    try {
      const res = await createInspection(formData).unwrap();
      //console.log(res);
    } catch (error) {
      //console.error("Error submitting inspection:", error);
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
          <label htmlFor="image" className="p-3">
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
