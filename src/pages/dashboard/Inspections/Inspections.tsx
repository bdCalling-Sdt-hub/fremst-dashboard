// @ts-nocheck
import { Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetAllInspectionsQuery } from '../../../redux/features/Dashboard/inspectionsApi';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { imageUrl } from '../../../redux/base/baseApi';
import { useLanguage } from '../../../components/shared/LanguageContext';
import { translateText } from '../../../components/shared/translationUtils';

const Inspections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { data: allInspections, isLoading } = useGetAllInspectionsQuery({ page, search: searchTerm });
  const { language } = useLanguage();  
  const [translatedUsers, setTranslatedUsers] = useState([]);  

  useEffect(() => {
      if (allInspections && allInspections.data) {
          translateUserData(allInspections.data, language);
      }
  }, [language, allInspections]);    


  const translateUserData = async (usersData: any[], targetLang: string) => {
    try {
        const translatedData = await Promise.all(
            usersData.map(async (value , index) => {
                const translatedUserName = await translateText(value?.customer?.contactPerson, targetLang);
                const translatedCompanyName = await translateText(value?.customer?.companyName, targetLang);
                const translatedProductName = await translateText(value?.product?.name, targetLang);
                return {
                    ...value, 
                    key: index + 1,
                    customerId: value?.customer?._id,
                    productId: value?.product?._id,
                    userId: value?._id,
                    username: translatedUserName,
                    companyName: translatedCompanyName,
                    product:translatedProductName,
                    date: moment(value?.lastInspectionDate).format('YYYY-MM-DD'),
                    inspectionId: value?._id,
                };
            })
        );
        setTranslatedUsers(translatedData); 
    } catch (error) {
        console.error('Error translating user data:', error);
    }
}; 

 
    

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
        {t("inspection")}.pdf
      </a>
      ),
    },
    {
      title: t('action'),
      key: 'action',
      render: (_: any, record: any) => (
        <div className="text-[#0D7EFF] font-semibold">
          <Link to={`/inspections-details?customerId=${record.customerId}&productId=${record.productId}&userId=${record.userId}`}>
            {t('details')}
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
        dataSource={translatedUsers}
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
