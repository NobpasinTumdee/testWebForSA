import React from 'react';
import './CollectionComponent.css';
import { Form, Input, Button, message } from 'antd';
import {CollectionsInterface} from '../interfaces/IMoviePackage'
import {CreateCollection} from '../services/https/index'
import { useNavigate } from 'react-router-dom';


const CollectionComponent: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const userIdstr = localStorage.getItem("id");
    const UserId = Number(userIdstr);

    const onFinish = async (values: CollectionsInterface) => {
        // Ensure UserID is added to the form values
        const payload = { ...values, UserId };
    
        let res = await CreateCollection(payload);
        
        if (res){
            window.location.reload(); // reload หลังจากลบเสร็จ
        }
        if (res.status === 201) {
          messageApi.open({
            type: 'success',
            content: res.data.message,
          });
    
          setTimeout(() => {
            navigate('/Collection');
          }, 500);
        } else {
          messageApi.open({
            type: 'error',
            content: res.data.error,
          });
        }
    };
    
    return (
        <>
            {contextHolder}
            <div className="PopUpAdmin">
                <div className="textAdmin">
                    <h1>Create Collection</h1>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            CollectionName: '',
                            UserID: UserId,
                        }}
                    >
                        <Form.Item
                            label="Name Collection:"
                            name="CollectionName"
                            rules={[{ required: true, message: 'Please input the Collection name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-button"

                            >
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CollectionComponent;
