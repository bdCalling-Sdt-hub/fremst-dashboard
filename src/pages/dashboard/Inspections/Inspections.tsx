import { Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// Sample data
const data = [
    {
      protocolId: "P-1001",
      username: "john_doe",
      companyName: "Tech Solutions Ltd.",
      product: "Software Suite",
      date: "2024-10-15",
      latestInspection: "https://example.com/inspections/john_doe_latest.pdf"
    },
    {
      protocolId: "P-1002",
      username: "jane_smith",
      companyName: "HealthCorp",
      product: "Medical Device",
      date: "2024-09-20",
      latestInspection: "https://example.com/inspections/jane_smith_latest.pdf"
    },
    {
      protocolId: "P-1003",
      username: "mike_jones",
      companyName: "GreenEnergy Inc.",
      product: "Solar Panel",
      date: "2024-07-05",
      latestInspection: "https://example.com/inspections/mike_jones_latest.pdf"
    },
    {
      protocolId: "P-1004",
      username: "linda_white",
      companyName: "AquaPure",
      product: "Water Purifier",
      date: "2024-03-12",
      latestInspection: "https://example.com/inspections/linda_white_latest.pdf"
    },
    {
      protocolId: "P-1005",
      username: "paul_brown",
      companyName: "BuildRight",
      product: "Construction Tools",
      date: "2024-06-22",
      latestInspection: "https://example.com/inspections/paul_brown_latest.pdf"
    },
    {
      protocolId: "P-1006",
      username: "emma_clark",
      companyName: "AutoTech",
      product: "Engine Parts",
      date: "2024-04-30",
      latestInspection: "https://example.com/inspections/emma_clark_latest.pdf"
    },
    {
      protocolId: "P-1007",
      username: "chris_wilson",
      companyName: "GadgetWorks",
      product: "Smartphone",
      date: "2024-01-18",
      latestInspection: "https://example.com/inspections/chris_wilson_latest.pdf"
    },
    {
      protocolId: "P-1008",
      username: "nancy_lee",
      companyName: "EcoHome",
      product: "Insulation Material",
      date: "2024-05-25",
      latestInspection: "https://example.com/inspections/nancy_lee_latest.pdf"
    },
    {
      protocolId: "P-1009",
      username: "steven_martin",
      companyName: "FoodPlus",
      product: "Packaged Food",
      date: "2024-02-14",
      latestInspection: "https://example.com/inspections/steven_martin_latest.pdf"
    },
    {
      protocolId: "P-1010",
      username: "rachel_green",
      companyName: "ClearSkies",
      product: "Air Purifier",
      date: "2024-03-10",
      latestInspection: "https://example.com/inspections/rachel_green_latest.pdf"
    }
];

  

// Column definitions

const Inspections = () => {
   
    const columns = [
        {
            title: 'Protocol ID',
            dataIndex: 'protocolId',
            key: 'protocolId',
        },
        {
            title: "User's Name",
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Latest Inspection',
            dataIndex: 'latestInspection',
            key: 'latestInspection',
            render: (latestInspection:any) => (
                <a href={latestInspection} target="_blank" rel="noopener noreferrer">
                    View PDF
                </a>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            render: () => (
                <div className="text-[#0D7EFF] font-semibold">
              <Link to="/inspections-details">Details</Link>   
                </div>
            ),
        },
    ];
    return (
        <div className="">
            <div className="flex items-center gap-8 w-full mb-5">
                <h1 className="text-xl text-primary font-semibold">Inspection list</h1>  
                <Input
                        style={{
                            maxWidth: 335,
                            height: 42,
                        }}
                        placeholder="Search.."
                        suffix ={<SearchOutlined   
                              style={{
                            fontSize: 24,
                            color: '#292C61',
                          }}  />}
                    />

            </div>
            <Table columns={columns} dataSource={data} rowClassName="hover:bg-gray-100" />

        </div>
    );
};

export default Inspections;
