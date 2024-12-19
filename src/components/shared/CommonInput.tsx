import { ConfigProvider, Form, Input } from 'antd';
import { useEffect } from 'react'; 

const CommonInput = ({ name, label }: { name: string; label: string }) => { 
    const form = Form.useFormInstance(); 

    useEffect(() => { 
        // form.setFieldsValue({ name: "" }) 
    }, [form]);

    return ( 
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Poppins, sans-serif',
                }
            }}
        >  
            <Form.Item 
                name={name}  
                label={<p className='text-[14px] font-semibold'>{label}</p>} 
                rules={[{ required: true, message: `${label} is required` }]} 
            > 
                <Input   
                    style={{
                        border: "1px solid #BABABA",
                        height: "44px",
                        borderRadius: "8px",
                        outline: "none",
                        width: "100%",
                        padding: "8px",  
                        background: "white",   
                    }} 
                    className={``}
                />     
            </Form.Item> 
        </ConfigProvider>
    );
};

export default CommonInput;
