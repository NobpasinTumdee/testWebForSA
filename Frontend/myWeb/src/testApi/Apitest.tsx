import { UsersInterface } from "../interfaces/IUser";
import { useEffect, useState } from 'react';
import axios from 'axios';

export const APItest = () => {
    const [Users, setAlbums] = useState<UsersInterface[]>([]); // กำหนดประเภทของ state เป็น Array ของ Album


    useEffect(() => {
        axios.get<UsersInterface[]>('http://localhost:8000/users')
          .then(response => {
            console.log(response.data); // ดูข้อมูลที่ได้รับจาก API ใน console
            setAlbums(response.data); // TypeScript จะรู้ว่าข้อมูลที่ได้รับคือ Album[]
          })
          .catch(error => {
            console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
          });
      }, []);

      return (
        <div style={{color: "#fffff"}}>
          <h2>รายชื่อผู้ใช้</h2>
          <ul>
            {Users.length > 0 ? (
              Users.map(User => (
                <li key={User.id}>
                  <strong>{User.email}</strong> UserName:  {User.username} Password: {User.password} Status:  {User.status}
                </li>
              ))
            ) : (
              <p>ไม่พบข้อมูลผู้ใช้</p>
            )}
          </ul>
        </div>
      );
      
};
