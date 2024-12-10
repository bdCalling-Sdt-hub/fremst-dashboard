import React, { useState } from 'react';
import { Breadcrumb, Button, Form, Input, Radio } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { PiImageThin } from 'react-icons/pi';
import CommonInput from '../../../components/shared/CommonInput';

const EditSubCategory = () => { 
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [questions, setQuestions] = useState([{ id: 1, text: '', commentEnabled: false }]);
    const { category , subCategory } = useParams();  


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImageUrl(reader.result as string);
        reader.readAsDataURL(file);
      }
    };
  
    const handleAddQuestion = () => {
      setQuestions([
        ...questions,
        { id: questions.length + 1, text: '', commentEnabled: false }
      ]);
    }; 


    return (
        <div className="p-6 bg-gray-100  w-full">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          {
            title: <Link to="/products-edit" className="text-[16px] font-medium">Edit Product Inspection</Link>,
          },
          {
            title: <Link to={`/products-edit/${category}`} className="text-[16px] font-medium">Safety Harness</Link>,
          },
          {
            title: <p  className="text-[16px] font-medium">{subCategory}</p>, 
          },
        ]}
      />

      <h2 className="text-2xl font-semibold my-6">Edit {subCategory} Details</h2>


      <Form layout="vertical" className='w-full'> 
      <div className='flex w-full gap-10'> 
        <div className='w-[600px]'>

        {/* Questions Section */}
        {questions.map((question) => (
          <div key={question.id} className="mb-6"> 
          <CommonInput label={`Question - ${question.id < 10 ? `0${question.id}` : question.id}`} name={`question - ${question.id < 10 ? `0${question.id}` : question.id}`} />

            <div className="flex items-center space-x-4">
              <Form.Item label="Comment Field"> 
                <Input  style={{
            border: "1px solid #BABABA",
            height: "48px",
            borderRadius: "8px",
            outline: "none",
            width: "100%",
            padding: "8px",  
            background:"white"  ,   
          }}  />
              </Form.Item>

              <div className="flex items-center space-x-2 mt-1">
                <Radio.Group>
                  <Radio value="yes" className="text-[#45C518]">YES</Radio> <br />
                  <Radio value="no" className="text-[#FF3E3E]">NO</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        ))} 
        
        <Button
          
          onClick={handleAddQuestion}
          className="flex items-center space-x-2 mb-8 border-0 "
        >
          <span className=' font-semibold text-primary'>+ Add Question</span>
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
                                {imageUrl ? (
                                    <img src={imageUrl} style={{ height: "120px", width: "120px", borderRadius: 10 , objectFit:"contain" }} alt="" />
                                )
                                    : (
                                        <PiImageThin className="text-8xl flex items-center justify-center text-[#666666] font-[400]" />
                                    )}
                            </div>

                            <div className="hidden">
                                <Input
                                    id="image"
                                    type="file"
                                    onInput={handleImageChange}

                                />
                            </div>
                        </Form.Item>
                    </label>
        </div>
 
        </div>
        {/* Next Button */}
        <Button type="primary" className=" bg-primary h-[48px] w-[360px] text-white">
          Next
        </Button>
      </Form> 


    </div>
    );
};

export default EditSubCategory;