import React, { useEffect } from 'react';
import './EditInformation.css';
import { Form, Input, message, Button } from 'antd';
import { UsersInterface } from '../interfaces/IUser';
import { ResetPassword } from '../services/https/index';
import { GetUserById } from '../services/https';

export const EditInfo: React.FC = () => {
    const [form] = Form.useForm(); //ตั้งค่า form
    const [messageApi, contextHolder] = message.useMessage();
    const userIdstr = localStorage.getItem("id");

    useEffect(() => {
        if (userIdstr) {
            fetchUserData(userIdstr);
        }
    }, [userIdstr]);

    const fetchUserData = async (userIdstr: string) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                form.setFieldsValue({
                    email: res.data.email,
                    username: res.data.username,
                });
            } else {
                message.open({
                    type: "error",
                    content: "ไม่พบข้อมูลผู้ใช้",
                });
            }
        } catch (error) {
            message.open({
                type: "error",
                content: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
            });
        }
    };

    const onFinish = async (values: UsersInterface) => {
        // ส่งข้อมูลไปที่ API เพื่อรีเซ็ตรหัสผ่าน
        let res = await ResetPassword(values);

        if (res.status === 200) {
            messageApi.open({
                type: 'success',
                content: res.data.message,
            });

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
            <div className='ComEditcontanner'>
                <div className='Editheader'>
                    Reset Password
                </div>
                <div>

                    <Form style={{ margin: '0px' }}
                        form={form}
                        name="resetPassword"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark={false}
                    >
                        <Form.Item style={{ margin: '0px' }}
                            name="username"
                            label={<span style={{ color: '#000', marginLeft: '20px', fontSize: "13px", marginTop: '10px' }}>USERNAME</span>}
                            rules={[{ required: true, message: 'Please enter your username' }]}
                        >
                            <Input readOnly placeholder="Username" className='textboxResetpassUserPass' />
                        </Form.Item>

                        <Form.Item style={{ margin: '0px' }}
                            name="email"
                            label={<span style={{ color: '#000', marginLeft: '20px', fontSize: "13px", marginTop: '10px', }}>Email</span>}
                            rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
                        >
                            <Input readOnly placeholder="Email" className='textboxResetpassUserPass' />
                        </Form.Item>

                        <Form.Item style={{ margin: '0px' }}
                            name="password"
                            label={<span style={{ color: '#000', marginLeft: '20px', fontSize: "13px", marginTop: '10px' }}>NEW PASSWORD</span>}
                            rules={[{ required: true, message: 'Please enter your new password' }]}
                        >
                            <Input.Password placeholder="New Password" className='textboxResetpass' />
                        </Form.Item>

                        <Form.Item style={{ margin: '0px' }}
                            name="confirmPassword"
                            label={<span style={{ color: '#000', marginLeft: '20px', fontSize: "13px", marginTop: '10px' }}>CONFIRM PASSWORD</span>}
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm Password" className='textboxResetpass' />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                style={{ margin: '0px 35%', marginTop: '30px' }}
                                type="primary"
                                htmlType="submit"
                            >
                                CONFIRM
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>

    );

};
