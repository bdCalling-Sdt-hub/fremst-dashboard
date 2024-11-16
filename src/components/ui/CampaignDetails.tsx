import { Button, Input, DatePicker, Radio } from 'antd';

import dayjs from 'dayjs';
import Brand from '/brand.svg';
const { RangePicker } = DatePicker;

const CampaignDetails = () => {
    const defaultStartDate = dayjs('2024-08-25 07:00', 'YYYY-MM-DD HH:mm');
    const defaultEndDate = dayjs('2024-08-26 07:00', 'YYYY-MM-DD HH:mm');

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold text-center mb-4">Campaign Details</h2>

            {/* Brand Logo */}
            <div className="flex justify-center mb-6">
                <img src={Brand} alt="Lays Logo" className="size-[150px] object-contain" />
            </div>

            {/* Form Content */}
            <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div>
                    <label className="block text-sm font-medium mb-1">Name of the Campaign</label>
                    <Input
                        style={{
                            height: 40,
                        }}
                        value="GOI Ladies Night @goiclubmarbella"
                        className="mb-4"
                        disabled
                    />

                    <label className="block text-sm font-medium mb-1">Event Date & Time</label>
                    <RangePicker
                        style={{
                            height: 40,
                        }}
                        defaultValue={[defaultStartDate, defaultEndDate]}
                        format="DD MMM HH:mm A"
                        className="w-full mb-4"
                        disabled
                    />

                    <label className="block text-sm font-medium mb-1">Address</label>
                    <Input
                        style={{
                            height: 40,
                        }}
                        value="Marquis St, Spain"
                        className="mb-4"
                        disabled
                    />

                    <label className="block text-sm font-medium mb-1">Address Link</label>
                    <Input
                        style={{
                            height: 40,
                        }}
                        value="google.map/hafuh"
                        className="mb-4"
                        disabled
                    />

                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <Input
                        style={{
                            height: 40,
                        }}
                        value="Female"
                        className="mb-4"
                        disabled
                    />
                </div>

                {/* Right Column */}
                <div>
                    <label className="block text-sm font-medium mb-1">Campaign Details</label>
                    <Input.TextArea placeholder="write here..." rows={3} className="mb-4" />

                    <label className="block text-sm font-medium mb-1">Terms & Conditions</label>
                    <Input.TextArea placeholder="write here..." rows={3} className="mb-4" />

                    <label className="block text-sm font-medium mb-1">Brands Instagram</label>
                    <Input value="instagram.com/shanto594" className="mb-4" disabled />

                    <label className="block text-sm font-medium mb-1">
                        Choose the type of requirement they are looking for
                    </label>
                    <Radio.Group className="flex flex-col mb-4">
                        <Radio value={1} className="mb-2">
                            3 Quality stories during the event mentioning the brand's IG.
                        </Radio>
                        <Radio value={2}>Permanent photo posted on IG.</Radio>
                    </Radio.Group>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
                <Button danger className="w-32">
                    Reject
                </Button>
                <Button type="primary" className="w-32">
                    Approve
                </Button>
            </div>
        </div>
    );
};

export default CampaignDetails;
