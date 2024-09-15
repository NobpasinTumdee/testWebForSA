import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { UsersInterface, GenderInterface } from '../interfaces/IUser';
import { GetUserById, GetGenders } from '../services/https';
import './EditInformation.css';
import { Loading } from '../Component/Loading/Loading';

const { Option } = Select;

const EditInformation: FC = () => {
  const [form] = Form.useForm();
  const [genderList, setGenderList] = useState<GenderInterface[]>([]);
  const [isLoading, setLoading] = useState(true);
  const userIdstr = localStorage.getItem("id");

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
            oldEmail : userData.email || '',
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
      e.preventDefault();
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Prevent leading zeros
    if (value.startsWith('0')) {
      value = value.replace(/^0+/, '');
    }
    form.setFieldsValue({ age: value });
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: 'fixed', top: '50%', left: '55%',
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
            onFinish={handleEditInformation}
            layout="vertical"
          >
           <Form.Item label={<span style={{ color: 'white' }}>USERNAME</span>} name="oldUsername">
                  <Input readOnly />
                </Form.Item>
                
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>Old Email</span>} name="oldEmail"  > 
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>New Email</span>}  name="newEmail"
                  rules={[
                    { required: true, message: 'Please input your new email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input 
                    type="email" 
                    onKeyPress={(e) => {
                      const char = String.fromCharCode(e.which);
                      if (!/^[a-zA-Z0-9@.]+$/.test(char)) {
                        e.preventDefault(); // Block input if character is not allowed
                      }
                    }} 
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>Old Password</span>} name="oldPassword">
                  <Input.Password readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>New Password</span>} name="newPassword" rules={[{ required: true, message: 'Please input your new password!' }]}>
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={<span style={{ color: 'white' }}>Confirm Password</span>}  name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]}>
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white' }}>Firstname</span>} 
                  name="firstname"
                  rules={[
                    { required: true, message: 'Please input your firstname!' },
                    { pattern: /^[A-Za-z]+$/, message: 'Firstname must contain only letters' }
                  ]}
                >
                  <Input
                    onKeyPress={preventNonAlphabetic} // Prevent non-alphabetic characters
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white' }}>Lastname</span>} 
                  name="lastname"
                  rules={[
                    { required: true, message: 'Please input your lastname!' },
                    { pattern: /^[A-Za-z]+$/, message: 'Lastname must contain only letters' }
                  ]}
                >
                  <Input
                    onKeyPress={preventNonAlphabetic} // Prevent non-alphabetic characters
                    autoComplete="off" // Disable autocomplete for lastname
                  />
                </Form.Item>

              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label={<span style={{ color: 'white' }}>Gender</span>}  name="gender">
              <Select
                placeholder="Select a Gender"
                style={{ width: '100%' }}
              >
                {genderList.map(gender => (
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
              { required: true, message: 'Please input your age!' },
              {
                validator: (_, value) => {
                  if (value && Number(value) > 100) {
                    return Promise.reject(new Error('Age cannot exceed 100!'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              type="number"
              min={1}
              max={100}
              onKeyPress={(e) => {
                const char = String.fromCharCode(e.which);
                // Allow only numeric characters
                if (!/[0-9]/.test(char)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                // Remove leading zeros
                if (value.startsWith('0')) {
                  e.target.value = value.replace(/^0+/, '');
                }
                // Ensure value does not exceed 100
                if (Number(e.target.value) > 100) {
                  e.target.value = '100';
                }
              }}
            />
          </Form.Item>



            </Col>

            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white' }}>Phone Number</span>} 
                  name="phonenumber"
                  rules={[
                    { required: true, message: 'Please input your phone number!' },
                    { pattern: /^0\d{9}$/, message: 'Phone number must start with 0 and be exactly 10 digits long' }
                  ]}
                >
                  <Input
                    maxLength={10}
                    onKeyPress={preventNonNumeric}  // Prevent non-numeric characters
                    onChange={handlePhoneNumberChange} // Ensure only numbers are allowed
                  />
                </Form.Item>
              </Col>
            </Row>
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