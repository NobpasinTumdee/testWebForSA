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
            newUsername: '',
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Old USERNAME" name="oldUsername">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="New USERNAME" name="newUsername" rules={[{ required: true, message: 'Please input your new username!' }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Old PASSWORD" name="oldPassword">
                  <Input.Password readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="New PASSWORD" name="newPassword" rules={[{ required: true, message: 'Please input your new password!' }]}>
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Confirm PASSWORD" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]}>
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Firstname"
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
                  label="Lastname"
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
              <Form.Item label="Gender" name="gender">
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
                  label="Age"
                  name="age"
                  rules={[{ required: true, message: 'Please input your age !' }]}
                >
                  <Input
                    type="number"
                    min={1} // Ensure the minimum age is 1
                    onKeyPress={preventNonNumeric} // Only allow numeric input
                    onChange={handleAgeChange} // Prevent leading zeros
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
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