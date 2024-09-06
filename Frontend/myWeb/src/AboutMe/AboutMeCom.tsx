import { useEffect,useState } from 'react';
//import { DataUser } from './DataUser';
import userPhoto from '../Component/Navbar/User.png';

//API users
import { UsersInterface } from "../interfaces/IUser";
import axios from 'axios';
const AboutMeCom: React.FC = () => {
    const [Users, setUsers] = useState<UsersInterface[]>([]);
    useEffect(() => {
        axios.get<UsersInterface[]>('http://localhost:8000/users')
          .then(response => {
            console.log(response.data); // ดูข้อมูลที่ได้รับจาก API ใน console
            setUsers(response.data); // TypeScript จะรู้ว่าข้อมูลที่ได้รับคือ Album[]
          })
          .catch(error => {
            console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
          });
      }, []);

    return (
        <>
            {Users.map((User) => (
                <div key={User.id}>
                    <img src={userPhoto} className='imgAboutME' />
                    <div className='dataAboutME'>
                        <div>Name : {User.username}</div>
                        <div>Gmail : {User.email}</div>
                        <div>status : {User.status}</div>
                        
                    </div>
                </div>
            ))}
        </>

    );
};

export default AboutMeCom;
