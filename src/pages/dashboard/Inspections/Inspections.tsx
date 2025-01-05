import { Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useGetAllInspectionsQuery } from '../../../redux/features/Dashboard/inspectionsApi';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { imageUrl } from '../../../redux/base/baseApi';

const Inspections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { data: allInspections, isLoading } = useGetAllInspectionsQuery({ page, search: searchTerm });
 

  const data = allInspections?.data?.map((value: any, index: number) => ({
    key: index + 1,
    customerId: value?.customer?._id,
    productId: value?.product?._id,
    userId: value?._id,
    username: value?.customer?.contactPerson,
    companyName: value?.customer?.companyName,
    product: value?.product?.name,
    date: moment(value?.lastInspectionDate).format('YYYY-MM-DD'),
    inspectionId: value?._id,
  }));

  const columns = [
    {
      title: t('serial'),
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: t('userName'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('companyName'),
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: t('product'),
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('latestInspection'),
      key: 'latestInspection',
      render: (_: any, record: any) => (
        <a
        className="text-blue-500 underline"
        href={`${imageUrl}/api/v1/pdf/create/${record.inspectionId}`}
        download
      >
        View PDF
      </a>
      ),
    },
    {
      title: t('action'),
      key: 'action',
      render: (_: any, record: any) => (
        <div className="text-[#0D7EFF] font-semibold">
          <Link to={`/inspections-details?customerId=${record.customerId}&productId=${record.productId}&userId=${record.userId}`}>
            Details
          </Link>
        </div>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center gap-8 w-full mb-5">
        <h1 className="text-xl text-primary font-semibold">{t('inspectionList')}</h1>
        <Input
          style={{ maxWidth: 335, height: 42 }}
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          suffix={<SearchOutlined style={{ fontSize: 24, color: '#292C61' }} />}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          current: page,
          total: allInspections?.pagination?.total || 0,
          pageSize: 10,
          onChange: (page) => setPage(page),
        }}
        rowClassName="hover:bg-gray-100"
      />
    </div>
  );
};

export default Inspections;
