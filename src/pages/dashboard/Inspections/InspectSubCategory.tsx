import { Button, Form, Input, Radio } from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import { useGetInpectionsQuestionQuery } from '../../../redux/features/Dashboard/inspectionsApi';
import { useInspection } from '../../../context/InspectionContext';
import { imageUrl } from '../../../redux/base/baseApi';
import { useTranslation } from 'react-i18next';

const InspectSubCategory = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const { markStepComplete } = useInspection();
  const id = queryParams.get('id');
  const product = queryParams.get('product');
  const { category , subcategory } = useParams();
  const { data } = useGetInpectionsQuestionQuery(id);
  //console.log(subcategory); 
  const { updateStepData } = useInspection(); 
  const { t } = useTranslation();

  const questions = data?.data?.map((value: { _id: string, question: string, isComment: boolean }) => ({
    id: value?._id,
    name: value?.question,
    isComment: value?.isComment,
  }));

  const handleSaveStep = (values: any) => {
    const answers = questions?.map((question: { name: string; isComment: boolean; id: string }, index: number) => ({
      question: question.name,
      comment: values[`comment_${index}`] || '',
      isYes: values[`isYes_${index}`] === 'true',
    })) || [];
  
    updateStepData(subcategory || 'defaultStep', answers);  
    if (id) markStepComplete(id); 
    navigate(`/inspections-creates/${category}?id=${product}`);
  };

  return (
    <div className="p-6 bg-gray-100 w-full">
      <Link
        to={`/inspections-creates/${category}?id=${product}`}
        className="text-[16px] flex items-center gap-1 font-medium "
      >
        <GoArrowLeft size={28} />
        <span className="font-medium">{t('back')}</span>
      </Link>

      <Form onFinish={handleSaveStep} className="w-full mt-5" layout='vertical'>
        <div className="flex w-full gap-10">
          <div className="w-[600px]">
            {questions?.map((question:{ id: string, name: string, isComment: boolean }, index:number) => (
              <div key={question.id} className="mb-6">
                <Form.Item
                  name={`question_${index}`}
                  initialValue={question.name}
                  label={`${t('question')} - ${index + 1}`}
                >
                  <Input style={{
                        border: "1px solid #BABABA",
                        height: "48px",
                        borderRadius: "8px",
                        outline: "none",
                        width: "100%",
                        padding: "8px",  
                        background: "white",   
                    }} 
                     readOnly />
                </Form.Item>

                <div className="flex items-center space-x-4">
                  <Form.Item
                    name={`comment_${index}`}
                    label={t('commentField')}
                    // rules={[{ required: question.isComment, message: 'Comment is required' }]} 
                  >
                    <Input 
                    style={{
                      border: "1px solid #BABABA",
                      height: "48px",
                      borderRadius: "8px",
                      outline: "none",
                      width: "100%",
                      padding: "8px",  
                      background: "white",   
                  }}  disabled={!question.isComment} />
                  </Form.Item>

                  <Form.Item name={`isYes_${index}`}  rules={[{ required: true, message: "Please select an option!" }]}>
                    <Radio.Group>
                      <Radio value="true">{t("yes")}</Radio>
                      <Radio value="false">{t("no")}</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full">
            <p className="text-[14px] font-semibold py-1">{t("uploadProductPicture")}</p>
            <div className="flex justify-center items-center w-full h-[250px] border-2 border-dotted border-gray-200">
              <img
                src={
                  data?.stepImage?.startsWith('https')
                    ? data?.stepImage
                    : `${imageUrl}${data?.stepImage}`
                }
                alt="Step"
                style={{ height: '220px', width: '220px', borderRadius: 10, objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <Button type="primary" htmlType="submit" className="bg-primary h-[48px] w-[360px] text-white">
          {t("save")}
        </Button>
      </Form>
    </div>
  );
};

export default InspectSubCategory;
