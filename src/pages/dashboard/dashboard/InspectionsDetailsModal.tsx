import { Checkbox, Modal, Typography } from "antd";
import { imageUrl } from "../../../redux/base/baseApi";
import moment from "moment";
import { useInspectionByIdQuery } from "../../../redux/features/Dashboard/homeApi";
import { useTranslation } from "react-i18next";
const { Text } = Typography;
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
  pdfReport: string;
}

const InspectionsDetailsModal = ({ open, setOpen, itemDetails }: { open: boolean, setOpen: (open: boolean) => void, itemDetails: string }) => {

  const { data } = useInspectionByIdQuery(itemDetails)
  const inspectionDetails = data?.data 
  const { t } = useTranslation()

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
                  <Text strong className="w-1/3">{t("productSKU")}:</Text>
                  <Text className="w-2/3">{inspectionDetails?.sku}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("productName")}:</Text>
                  <Text className="">{inspectionDetails?.productName}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("productBrand")}:</Text>
                  <Text className="">{inspectionDetails?.brand}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("productType")}:</Text>
                  <Text className="">{inspectionDetails?.type}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("productSerialNo")}:</Text>
                  <Text className="">{inspectionDetails?.serialNo}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("productEnStandard")}:</Text>
                  <Text className="">{inspectionDetails?.enStandard}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("inspectionInterval")}:</Text>
                  <Text className="">{inspectionDetails?.inspectionInterval}</Text>
                </div>

                <div className="flex items-center gap-5 ">
                  <Text strong className="">{t("latestInspectionDate")}:</Text>
                  <Text className=""> {moment(inspectionDetails?.lastInspectionDate).format("YYYY-MM-DD")}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("productActive")}:</Text>
                  <Checkbox checked={inspectionDetails?.isActive} className="" />
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("inspectionHistory")}:</Text>
                  <a
                    className="text-blue-600"
                    href={`${imageUrl}/api/v1/pdf/create/${inspectionDetails?._id}`}
                    download
                  >
                    {t("inspection")} pdf
                  </a>

                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("companyName")}:</Text>
                  <Text className="">{inspectionDetails?.companyName}</Text>
                </div>

                <div className="flex items-center gap-5">
                  <Text strong className="">{t("contactPerson")}:</Text>
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