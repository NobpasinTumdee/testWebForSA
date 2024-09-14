import { message, Select, Button, Form, Input } from "antd";
import React, { FC, useState, useEffect } from 'react';
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
    const fetchUserData = async () => {
      try {
        if (userIdstr) {
          const response = await GetUserById(userIdstr);
          if (response && response.status === 200) {
            const userData: UsersInterface = response.data;
            form.setFieldsValue({
              oldUsername: userData.username || '',
              oldPassword: userData.password || '',
              firstname: userData.firstname || '',
              lastname: userData.lastname || '',
              gender: userData.GenderID || '',
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

    fetchUserData();
    fetchGenders();
    setLoading(false);
  }, [userIdstr]);

  const handleEditInformation = (values: any) => {
    // Handle user information update logic here
    console.log('Updated Information:', values);
  };

  return (
    <>
      {isLoading ? (
        <div style={{ position: 'fixed', top: '50%', left: '50%', marginTop: '-50px', marginLeft: '-100px' }}>
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
            <Form.Item label="Old USERNAME" name="oldUsername">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="New USERNAME" name="newUsername" rules={[{ required: false, message: 'Please input your new username!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Old PASSWORD" name="oldPassword">
              <Input.Password readOnly />
            </Form.Item>
            <Form.Item label="New PASSWORD" name="newPassword" rules={[{ required: false, message: 'Please input your new password!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Confirm PASSWORD" name="confirmPassword" rules={[{ required: false, message: 'Please confirm your password!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Firstname" name="firstname">
              <Input onChange={(e) => form.setFieldsValue({ firstname: e.target.value })} />
            </Form.Item>
            <Form.Item label="Lastname" name="lastname">
              <Input onChange={(e) => form.setFieldsValue({ lastname: e.target.value })} />
            </Form.Item>
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
            <Form.Item label="Age" name="age" rules={[{ required: false, message: 'Please input your age!' }]}>
              <Input type="number" min="1" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phonenumber">
              <Input onChange={(e) => form.setFieldsValue({ phonenumber: e.target.value })} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Edit Information</Button>
            </Form.Item>
          </Form>
          <a href="/MainWeb" className="return-button-Admin">Return to home page</a>
        </div>
      )}
    </>
  );
};

export default EditInformation;
