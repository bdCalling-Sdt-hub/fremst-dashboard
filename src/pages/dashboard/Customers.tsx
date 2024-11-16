import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

// Sample data
const customerData = [
    {
      id: 1,
      companyName: "Tech Solutions Ltd",
      companyNumber: "0012345678",
      contactPerson: "Alice Johnson",
      address: "123 Tech Ave, Silicon Valley, CA 94025",
      email: "alice@techsolutions.com",
      phone: "+1 555-0123-4567"
    },
    {
      id: 2,
      companyName: "Green Energy Corp",
      companyNumber: "0023456789",
      contactPerson: "Bob Smith",
      address: "456 Green Rd, Denver, CO 80203",
      email: "bob@greenenergy.com",
      phone: "+1 555-0234-5678"
    },
    {
      id: 3,
      companyName: "Global Logistics Inc",
      companyNumber: "0034567890",
      contactPerson: "Catherine Lee",
      address: "789 Cargo St, Dallas, TX 75201",
      email: "catherine@globallogistics.com",
      phone: "+1 555-0345-6789"
    },
    {
      id: 4,
      companyName: "FinTech Innovations",
      companyNumber: "0045678901",
      contactPerson: "David Patel",
      address: "101 Finance Ln, New York, NY 10005",
      email: "david@fintechinnovations.com",
      phone: "+1 555-0456-7890"
    },
    {
      id: 5,
      companyName: "Blue Ocean Foods",
      companyNumber: "0056789012",
      contactPerson: "Emily Chen",
      address: "202 Seafood Blvd, Miami, FL 33101",
      email: "emily@blueoceanfoods.com",
      phone: "+1 555-0567-8901"
    },
    {
      id: 6,
      companyName: "Peak Healthcare",
      companyNumber: "0067890123",
      contactPerson: "Frank Williams",
      address: "303 Wellness Dr, Seattle, WA 98101",
      email: "frank@peakhealthcare.com",
      phone: "+1 555-0678-9012"
    },
    {
      id: 7,
      companyName: "Epsilon AI Labs",
      companyNumber: "0078901234",
      contactPerson: "Grace Kim",
      address: "404 Neural St, Boston, MA 02115",
      email: "grace@epsilonailabs.com",
      phone: "+1 555-0789-0123"
    },
    {
      id: 8,
      companyName: "EcoFriendly Solutions",
      companyNumber: "0089012345",
      contactPerson: "Henry Lopez",
      address: "505 Greenway Rd, Portland, OR 97204",
      email: "henry@ecofriendly.com",
      phone: "+1 555-0890-1234"
    },
    {
      id: 9,
      companyName: "Urban Builders LLC",
      companyNumber: "0090123456",
      contactPerson: "Isabella Garcia",
      address: "606 Cityscape Ave, Chicago, IL 60601",
      email: "isabella@urbanbuilders.com",
      phone: "+1 555-0901-2345"
    },
    {
      id: 10,
      companyName: "Digital Marketing Pros",
      companyNumber: "0101234567",
      contactPerson: "James Anderson",
      address: "707 Digital Dr, Austin, TX 73301",
      email: "james@digitalmarketingpros.com",
      phone: "+1 555-1012-3456"
    }
  ];

const Customers = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: "Company Number",
            dataIndex: 'companyNumber',
            key: 'companyNumber',
        },
        {
            title: "Contact Person",
            dataIndex: 'contactPerson',
            key: 'contactPerson',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        
        {
            title: 'Overview',
            key: 'action',
            render: (_: any, record: any) => (
              <div className='flex gap-2 items-center font-medium'>
                {/* Edit Link with ID */}
                <Link to={`/customer-add/${record.id}`}>
                  <p className='text-primary'>Edit</p>
                </Link>
                <p className='text-[#D2410A]'>Delete</p>
              </div>
            ),
          },
    ]; 

    return (
        <div className="">
            <div className="flex justify-between items-center w-full">
                <div className='flex items-center gap-8 w-full'>
                    <h1 className="text-xl text-primary font-semibold">Customers list</h1> 
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
                <div className=" mb-5">
                <button
            className="bg-primary text-white w-[173px] h-[40px] rounded transition"
            onClick={() => navigate('/customer-add')}
          >
            Add Customer
          </button>
                </div>
            </div>
            <Table columns={columns} dataSource={customerData} rowClassName="hover:bg-gray-100" />

        </div>
    );
};

export default Customers;
