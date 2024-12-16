import { Input } from "antd";
import { useState, useEffect } from "react";
import { PiImageThin } from "react-icons/pi";
import { useInspection } from "../../../context/InspectionContext";
import { jsPDF } from "jspdf";
import { useCreateInspectionMutation } from "../../../redux/features/Dashboard/inspectionsApi";
import moment from "moment";
import Swal from "sweetalert2";
import "jspdf-autotable";

const SubmitInspections = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { updateInspectionData, inspectionData } = useInspection();
  const [createInspection, { isLoading, isError, isSuccess, data, error }] = useCreateInspectionMutation();

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
        URL.revokeObjectURL(imageUrl); // Cleanup the URL to prevent memory leaks
      }
    };
  }, [imageUrl]);

  const handleApproval = (isApproved: boolean) => {
    updateInspectionData("isApproved", isApproved);
  };

  const handleNextInspection = (months: number) => {
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


    doc.addImage("/pdflogo.png" , "PNG", 10, 10, 30, 20);
    doc.setFontSize(24);
    doc.text("Inspection Report - Denton Maddox", 60, 20);

    doc.setFontSize(12);
    doc.text(`Customer: ${inspectionData.customer || "Unknown"}`, 10, 40);
    doc.text(`Protocol ID: 67597f48c4d3de3ccb85a93b`, 120, 40);
    doc.text(`Date: ${inspectionDate}`, 10, 50);
    doc.text(`Product Name: Denton Maddox`, 120, 50);
    doc.text(`Product SKU: abcd`, 120, 80);
    doc.text(`Storage Location: Earth`, 120, 60);
    doc.text(`Product Brand: Minus esse id minus`, 120, 90);

    // Dynamically Generate Table Body Data
    const tableBody = inspectionData?.step?.flatMap((step) =>
      step.answers.map((answer) => [
        answer.question || "N/A", // Control Points (Question)
        answer.isYes ? "YES" : "NO", // OK (Boolean to YES/NO)
        answer.comment || "N/A", // Comments
      ])
    ) || [];

    // Control Points Table
    doc.autoTable({
      startY: 90,
      head: [["Control Points", "OK", "Comments"]],
      body: tableBody,
      theme: "grid",
      styles: { align: "center", fontSize: 10 },
      headStyles: { fillColor: [100, 100, 255] },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 90 } },
    });

    // Footer Content
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("The equipment is approved as fall protection equipment", 10, doc.lastAutoTable.finalY + 10);
    doc.text("The next inspection should take place within 0 months from the inspection", 10, doc.lastAutoTable.finalY + 20);
    doc.text(`Inspection date & place: ${inspectionDate}`, 10, doc.lastAutoTable.finalY + 30);

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
