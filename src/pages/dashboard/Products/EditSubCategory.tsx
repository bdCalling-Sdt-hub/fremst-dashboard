import  { useState } from 'react';
import { Breadcrumb, Button, Form, Input, Radio } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import AddQuestionModal from './AddQuestionModal';
import { useDeleteQuestionMutation, useGetAllQuestionsQuery } from '../../../redux/features/Dashboard/productsApi';
import { imageUrl } from '../../../redux/base/baseApi';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';


const EditSubCategory = () => {

  const [open, setOpen] = useState(false)   
  const [editDetails , setEditDetails] = useState(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const stepId = queryParams.get('stepId')
  const productId = queryParams.get('productId')
  const { category, subCategory } = useParams();
  const {data:allQuestions , refetch} = useGetAllQuestionsQuery(stepId) 
const [deleteQuestion] = useDeleteQuestionMutation()
 
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteQuestion(id).then((res) => {

          if (res?.data?.success) {
            Swal.fire({
              text: res?.data?.message,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetch();
            });
          } else {
            Swal.fire({
              title: "Oops",
              //@ts-ignore
              text: res?.error?.data?.message,
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  }  




  return (
    <div className="p-6 bg-gray-100  w-full">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          {
            title: <Link to="/products-edit" className="text-[16px] font-medium">Edit product inspection</Link>,
          },
          {
            title: <Link to={`/products-edit/${category}?id=${productId}`} className="text-[16px] font-medium">Safety Harness</Link>,
          },
          {
            title: <p className="text-[16px] font-medium">{subCategory}</p>,
          },
        ]}
      />

      <h2 className="text-2xl font-semibold my-6">Edit {subCategory} Details</h2>


      <div  className='w-full'>
        <div className='flex w-full gap-10'>
          <div className='w-[600px]'>

            {/* Questions Section */}
            {allQuestions?.data?.map((value:{ question: string;
    isComment: boolean;
    _id: string;}, index:number) => (
            <div key={value._id} className="mb-5 w-full">
            <Form
              className="flex items-center space-x-4 w-full"
              initialValues={{
                question: value.question,
                isComment: value.isComment ? "true" : "false", 
              }}
              layout="vertical"
            >
              <Form.Item
                name="question"
                label={
                  <div className="flex items-center justify-between w-[450px]">
                    <p className="text-[16px] font-semibold">{`Question - ${index + 1}`}</p> 

                    <div className='flex items-center gap-1'> 

                    <button
                      className="bg-white px-2 py-1 rounded text-end"
                      onClick={() => {
                        setOpen(true); 
                         //@ts-ignore
                        setEditDetails(value); 
                      }}
                    >
                      <AiOutlineEdit size={20} color="#292c61" />
                    </button> 

                    <p className='bg-white px-2 py-1 rounded  flex items-center justify-center cursor-pointer' onClick={() => handleDelete(value?._id)}><MdDelete size={20} color="#D2410A" /> </p>  

                    </div>
                  </div>
                }
              >
                <Input.TextArea
                  rows={2}
                  style={{
                    border: "1px solid #BABABA",
                    resize: "none",
                    borderRadius: "8px",
                    outline: "none",
                    width: "450px",
                    padding: "8px",
                    background: "white",
                  }} 

                  readOnly
                />
              </Form.Item>
      
              <Form.Item name="isComment" className='mt-5'>
                <Radio.Group defaultValue={value.isComment ? "true" : "false"} >
                  <Radio value="true" className="text-[#45C518]" >
                    YES
                  </Radio>
                  <Radio value="false" className="text-[#FF3E3E]">
                    NO
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </div>
            ))}

            <Button

              onClick={() => setOpen(true)}
              className="flex items-center space-x-2 mb-8  border border-primary px-2 py-1 rounded "
            >
              <span className=' font-semibold text-primary '>+ Add Question</span>
            </Button>
          </div>

          {/* Image Upload Section */}
          <div className="mb-8 w-full" >
            <p className="text-[14px] font-semibold py-1">Upload Product Picture</p>
            <label
              htmlFor="image"
              style={{ display: "block", }}
              className="p-3 border rounded-lg bg-white w-[431px] "
            >
              <Form.Item name="imagess"
              >
                <div className="flex justify-center items-center w-full h-[250px] border-2 border-dotted border-gray-200 ">
         
                    <img src={allQuestions?.stepImage?.startsWith("https")? allQuestions?.stepImage : `${imageUrl}${allQuestions?.stepImage}`} style={{ height: "120px", width: "120px", borderRadius: 10, objectFit: "contain" }} alt="" />
                 
                </div>

              </Form.Item>
            </label>
          </div>

        </div>
        {/* Next Button */}
        <Button type="primary" className=" bg-primary h-[48px] w-[360px] text-white">
          Next
        </Button>
      </div>

      <AddQuestionModal open={open} setOpen={setOpen} stepId={stepId} productId={productId} setEditDetails={setEditDetails} editDetails={editDetails} refetch={refetch} />
    </div>
  );
};

export default EditSubCategory;