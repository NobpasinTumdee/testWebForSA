import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, message, InputNumber } from 'antd';
import { UsersInterface, GenderInterface } from '../interfaces/IUser';
import { GetUserById, GetGenders, UpdateUserByid } from '../services/https';
import './EditInformation.css';
import { Loading } from '../Component/Loading/Loading';
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const EditInformation: FC = () => {
  const [form] = Form.useForm();
  const [genderList, setGenderList] = useState<GenderInterface[]>([]);
  const [isLoading, setLoading] = useState(true);
  const userIdstr = localStorage.getItem("id");
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchGenders();
  }, [userIdstr]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const fetchUserData = async () => {
    try {
      if (userIdstr) {
        const response = await GetUserById(userIdstr);

        if (response && response.status === 200) {
          const userData: UsersInterface = response.data;
          form.setFieldsValue({
            oldUsername: userData.username || '',
            oldPassword: userData.password || '',
            oldEmail: userData.email || '',
            newEmail: '',
            newPassword: '',
            confirmPassword: '',
            firstname: userData.firstname || '',
            lastname: userData.lastname || '',
            gender: userData.gender || '',
            age: userData.age ? userData.age.toString() : '',
            phonenumber: userData.phonenumber || '',
          });
        } else {
          message.error('Error retrieving user data');
        }
      } else {
        message.error('UserId not found in localStorage');
      }
    } catch (error) {
      message.error('Error fetching user data');
    }
  };

  const fetchGenders = async () => {
    try {
      const res = await GetGenders();
      if (res.status === 200 && res.data) {
        setGenderList(res.data);
      } else {
        message.error("I can't retrieve any Gender information.😭");
      }
    } catch (error) {
      message.error("I found the Error🤯");
    }
  };

  const handleEditInformation = (values: any) => {
    console.log('Updated Information:', values);
  };

  const preventNonAlphabetic = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^[a-zA-Z]+$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const preventNonNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    if (!/^\d*$/.test(phoneNumber)) {
      form.setFields([
        {
          name: 'phonenumber',
          errors: ['Phone number must contain only digits.'],
        },
      ]);
    } else if (phoneNumber.length > 10) {
      form.setFields([
        {
          name: 'phonenumber',
          errors: ['Phone number cannot exceed 10 digits.'],
        },
      ]);
    } else if (!phoneNumber.startsWith('0')) {
      form.setFields([
        {
          name: 'phonenumber',
          errors: ['Phone number must start with 0.'],
        },
      ]);
    } else {
      form.setFields([
        {
          name: 'phonenumber',
          errors: [],
        },
      ]);
    }
  };

  const onFinish = async (values: UsersInterface) => {
    setLoading(true);

    if (!id) {
      messageApi.open({
        type: "error",
        content: "ไม่พบ ID ของผู้ใช้",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await UpdateUserByid(id, values);
      setLoading(false);

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "ข้อมูลของคุณถูกอัพเดตเรียบร้อยแล้ว!",
        });

        // บันทึกข้อมูลผู้ใช้ใน localStorage
        localStorage.setItem("userData", JSON.stringify(values));

        // เปลี่ยนเส้นทางหลังจากอัพเดตเสร็จสิ้น
        setTimeout(() => {
          navigate("/MainWeb");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดขณะอัพเดตข้อมูล",
      });
    }
  };

  const handleAgeChange = (value: number | null) => {
    const numberValue = value === null ? NaN : Number(value);
    
    if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
      form.setFields([
        {
          name: 'age',
          errors: ['Age must be between 1 and 100.'],
        },
      ]);
    } else {
      form.setFields([
        {
          name: 'age',
          errors: [],
        },
      ]);
    }
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: 'fixed', top: '50%', left: '50%',
            marginTop: '-50px', marginLeft: '-100px'
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className="containerEdit">
          <h2 className='edit-h2'>EDIT INFORMATION</h2>
          <Form
            form={form}
            className="edit-form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item label={<span style={{ color: 'white' }}>Username</span>} name="oldUsername">
              <Input readOnly style={{ width: '100%' }} />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>Old Email</span>} name="oldEmail">
                  <Input readOnly style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>New Email</span>} name="newEmail"
                  rules={[
                    { required: true, message: "Please input your new email" },
                    { type: 'email', message: 'Invalid email format!' }
                  ]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>Old Password</span>} name="oldPassword">
                  <Input.Password readOnly style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>New Password</span>} name="newPassword"
                  rules={[{ required: true, message: "Please input your new password" }]}
                >
                  <Input.Password style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label={<span style={{ color: 'white' }}>Confirm Password</span>} name="confirmPassword" dependencies={['newPassword']} hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password style={{ width: '100%' }} />
            </Form.Item>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>Firstname</span>} name="firstname">
                  <Input onKeyPress={preventNonAlphabetic} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>Lastname</span>} name="lastname">
                  <Input onKeyPress={preventNonAlphabetic} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>Gender</span>} name="gender">
                  <Select style={{ width: '100%' }}>
                    {genderList.map((gender) => (
                      <Option key={gender.ID} value={gender.ID}>
                        {gender.gender}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white' }}>Age</span>}
                  name="age"
                  rules={[
                    {
                      validator(_, value) {
                        const numberValue = Number(value);
                        if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                          return Promise.reject(new Error('Age must be between 1 and 100!'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={100}
                    style={{ width: '100%' }}
                    onChange={handleAgeChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label={<span style={{ color: 'white' }}>Phone Number</span>} name="phonenumber">
              <Input
                onKeyPress={preventNonNumeric}
                onChange={handlePhoneNumberChange}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="editinformation-button">
                Edit Information
              </Button>
            </Form.Item>
          </Form>
          <a href="/MainWeb" className="return-button-Admin">Return to home page</a>
        </div>
      )}
    </>
  );
};

export default EditInformation;
