import { Form, Input, Modal, Radio } from "antd";
import { useAddQuestionMutation, useUpdateQuestionMutation } from "../../../redux/features/Dashboard/productsApi";
import Swal from "sweetalert2";
import { useEffect } from "react";


const AddQuestionModal = ({open , setOpen , productId , stepId , setEditDetails , editDetails , refetch }:{open:boolean , setOpen:(open:boolean)=>void , productId:string|null , stepId:string|null , setEditDetails:any , editDetails:any , refetch:any}) => { 
    const [form] = Form.useForm()  
    const [addQuestion , { isLoading }] = useAddQuestionMutation()
    const [updateQuestion] = useUpdateQuestionMutation()

    useEffect(()=>{ 
        if(editDetails){
            form.setFieldsValue({question:editDetails?.question , isComment:editDetails?.isComment ? "true" : "false"}) 
        }
    },[editDetails , form]) 

    const onFinish =async(values:{question:string , isComment:string})=>{
       
        const data = {
            product:productId, 
            stepID:stepId ,
             question:values?.question , 
             isComment:values?.isComment==="true" ? true : false
        }  
        const editData = {
            product:productId,  
            id:editDetails?._id ,
            stepID:stepId ,
             question:values?.question , 
             isComment:values?.isComment==="true" ? true : false
        }  
 
        if(editDetails){
            await updateQuestion(editData).then((res)=>{
              //console.log(res); 
              if(res?.data?.success){
                Swal.fire({
                    text:res?.data?.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                  }).then(() => {
                    refetch();   
                    setEditDetails(null)  
                    form.resetFields() 
                    setOpen(false);
                  })
            }else{
                Swal.fire({
                    title: "Oops", 
                     //@ts-ignore
                    text: res?.error?.data?.message,
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                  });
              
            }
            })
            }else{
              await addQuestion(data).then((res)=>{
              
                if(res?.data?.success){
                  Swal.fire({
                      text:res?.data?.message,
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    }).then(() => {
                      refetch();    
                      setEditDetails(null)  
                    form.resetFields() 
                    setOpen(false);
                    })
              }else{
                  Swal.fire({
                      title: "Oops", 
                       //@ts-ignore
                      text: res?.error?.data?.message,
                      icon: "error",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                
              } 
              })
            } 
    } 


    return ( 
        <Modal
        centered
        open={open}
        onCancel={() => { setOpen(false); form.resetFields() , setEditDetails(null) }}
        width={500}
        title={<p className='text-[18px] font-semibold' > {editDetails ? "Edit Question" : "Add Question"}  </p>}
        footer={null}
    >
        <div> 
        <Form form={form} layout="vertical" onFinish={onFinish} className="py-4" initialValues={{
            question:editDetails?.question , 
        }}>
  <Form.Item
    label={
      <p className="text-[16px] font-medium">Question Name</p>
    }
    name="question" 
    rules={[{ required: true, message: 'Please enter the question name!' }]} 
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
    />
  </Form.Item>

  <Form.Item
    name="isComment" 
    label={
        <p className="text-[16px] font-medium">Comment</p>
      }
    rules={[{ required: true, message: 'Please select an answer!' }]} 
  >
    <div className="flex items-center space-x-2" >
      <Radio.Group defaultValue={editDetails?.isComment ? "true" : "false"}>
        <Radio value="true" className="text-[#45C518]">YES</Radio>
        <Radio value="false" className="text-[#FF3E3E]">NO</Radio>
      </Radio.Group>
    </div>
  </Form.Item>

  <Form.Item className=" flex items-center justify-end">
    <button type="submit" className="bg-primary text-white w-[100px] h-[40px] rounded">{isLoading ? 'Loading...' : 'Submit'}</button>
  </Form.Item>
</Form>
            
        </div> 
        </Modal>
    );
};

export default AddQuestionModal;