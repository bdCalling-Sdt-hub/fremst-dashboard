import { Button, Divider } from 'antd';

import Brand from '/influencer.svg';
const InfluencerDetails = () => {
    return (
        <div className=" p-6 rounded-lg  mx-auto">
            {/* Header with Logo */}
            <div className="flex justify-center gap-4 mb-4">
                <img src={Brand} alt="Lay's Logo" className="size-[156px]" />
                <img src={Brand} alt="Lay's Logo" className="size-[156px]" />
                <img src={Brand} alt="Lay's Logo" className="size-[156px]" />
                {/* Adjust the logo path accordingly */}
            </div>

            {/* Content Grid */}
            <div className="flex gap-5 justify-between my-4">
                {/* Brand's Details Section */}
                <div className="space-y-3 w-[49%]">
                    <h3 className="text-xl text-center font-medium text-gray-800 mb-4">Influencer’s Details</h3>
                    <p className="flex justify-between">
                        <span className="font-medium">Full Name:</span>
                        <span>Messi</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Gender:</span>
                        <span>Female</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Describe yourself within 3 words:</span>
                        <span>Love this app</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Contact Number:</span>
                        <span>(+33)7 00 55 59 27</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">What's App Number:</span>
                        <span>(+33)7 00 55 59 27</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span>irnabela@gmail.com</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Address:</span>
                        <span>Address Apt. 738 2086 Marianne Parks</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">City:</span>
                        <span>Dhaka</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Zip:</span>
                        <span>1212</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Country:</span>
                        <span>Bangladesh</span>
                    </p>
                </div>

                <div className="space-y-3 w-[2%]">
                    <div className="w-0.5  bg-primary h-[40vh]"></div>
                </div>
                {/* Social Media and Other Details Section */}
                <div className="w-[49%]">
                    <h3 className="text-xl font-medium text-center text-gray-800 mb-4">Social Media Link</h3>
                    <p className="flex justify-between">
                        <span className="font-medium">Facebook:</span>
                        <span>www.facebook.com/shanto594</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Instagram:</span>
                        <span>www.instagram.com/shanto594</span>
                    </p>

                    <Divider type="vertical" className="my-4" />

                    <h3 className="text-lg font-medium text-center text-gray-800 mt-6">Campaign Information</h3>
                    <p className="flex justify-between">
                        <span className="font-medium">Active:</span>
                        <span className="text-green-500">4</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="font-medium">Completed:</span>
                        <span className="text-blue-500">15</span>
                    </p>
                </div>
            </div>

            {/* Divider */}
            <Divider />

            {/* Buttons */}
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

export default InfluencerDetails;
