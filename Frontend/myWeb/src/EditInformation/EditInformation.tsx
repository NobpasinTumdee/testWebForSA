import { FC, useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { UsersInterface, GenderInterface } from '../interfaces/IUser';
import { GetUserById, GetGenders, UpdateUserByid } from '../services/https';
import './EditInformation.css';
import { Loading } from '../Component/Loading/Loading';
import {EditInfo} from './EditInfoCom';

const { Option } = Select;

const EditInformation: FC = () => {
  const [form] = Form.useForm(); //ตั้งค่า form
  const [genderList, setGenderList] = useState<GenderInterface[]>([]); //เก็บข้อมูลเพศเป็น array
  const [isLoading, setLoading] = useState(true); //หน้าโหลดตอนเปิด
  const userIdstr = localStorage.getItem("id");

  //===========================popup ===========================================
  const [isPopup, setPopup] = useState(false); //popupEditPassword
  const Openpopup = () => {
    setPopup(!isPopup);
  }

  //===========================เปิดหน้ามาจะโหลดข้อมูลจาก เพศ และ ผู้ใช้ลง textbox ===========================================
  useEffect(() => {
    if (userIdstr) {
      fetchGenders();
      fetchUserData(userIdstr);
    }
  }, [userIdstr]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  //=========================== เงื่อนไขการกรอกข้อมูลต่างๆ  ================================================================

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
  //=========================== ฟังก์ชั่นโหลดข้อมูลต่างๆ  ================================================================

  const fetchUserData = async (userIdstr: string) => {
    try {
      const res = await GetUserById(userIdstr);
      if (res.status === 200) {
        form.setFieldsValue({
          email: res.data.email,
          username: res.data.username,
          password: res.data.password,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          GenderID: res.data.GenderID,
          age: res.data.age,
          phonenumber: res.data.phonenumber,
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
  //=========================== ถ้ากดปุ่มจะทำการนำข้อมูลส่งไปยัง backend  ================================================================

  const onFinish = async (values: UsersInterface) => {
    setLoading(true);
    if (!userIdstr) {//เช็คว่ามีไอดีของผู้ใช้เข้ามาไหม
      message.open({
        type: "error",
        content: "ไม่พบ ID ของผู้ใช้",
      });
      setLoading(false);
      return;
    }
    try {
      const res = await UpdateUserByid(userIdstr, values); //ส่งข้อมูลที่กรอกเข้าไปยังฟังก์ชั่น update user
      setLoading(false);

      if (res.status === 200) {
        message.open({
          type: "success",
          content: res.data.message,
        });

      } else {
        message.open({
          type: "error",
          content: res.data.error,
        });
      }
    } catch (error) {
      setLoading(false);
      message.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
      });
    }
  };

  return (
    <>{/* แสดงหน้าโหลด */}

      {isPopup && (
        <EditInfo />
      )}
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
          <div onClick={Openpopup} className='BtnReset'><div className='textEdit'>Edit Password</div></div>
          <Form
            form={form}
            className="edit-form"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              email: '',
              username: '',
              password: '',
              firstname: '',
              lastname: '',
              GenderID: 1,
              age: '',
              phonenumber: '',
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white', fontSize: '20px' }}>Username</span>}
                  name="username"
                >
                  <Input readOnly onKeyPress={preventNonAlphabetic} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white', fontSize: '20px' }}>Email</span>}
                  name="email"
                rules={[{type: 'email'}]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>

            {/* <Form.Item
              label={<span style={{ color: 'white', fontSize: '20px' }}>Password Hash</span>}
              name="password"
            >
              <Input.Password readOnly/>
            </Form.Item> */}

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white', fontSize: '20px' }}>Firstname</span>}
                  name="firstname"
                >
                  <Input onKeyPress={preventNonAlphabetic} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white', fontSize: '20px' }}>Lastname</span>}
                  name="lastname"
                >
                  <Input onKeyPress={preventNonAlphabetic} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label={<span style={{ color: 'white', fontSize: '20px' }}>Gender</span>}
                  name="GenderID"
                >
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
                  label={<span style={{ color: 'white', fontSize: '20px' }}>Age</span>}
                  name="age"
                >
                  <Input
                    type="number"
                    min={1} // Ensure the minimum age is 1
                    max={100}
                    onKeyPress={preventNonNumeric} // Only allow numeric input
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
                  label={<span style={{ color: 'white', fontSize: '20px' }}>Phone Number</span>}
                  name="phonenumber"
                  rules={[
                    { required: false, message: 'Please input your phone number!' },
                    { pattern: /^0\d{9}$/, message: 'Phone number must start with 0 and be exactly 10 digits long' }
                  ]}
                >
                  <Input
                    maxLength={10}
                    onKeyPress={preventNonNumeric}  // Prevent non-numeric characters
                    onChange={handlePhoneNumberChange} // Ensure only numbers are allowed
                  />
                </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="editinformation-button"
              >
                Confirm
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
