import { useEffect, useState } from 'react';
import './UsertopRigh.css';
import { UsersInterface } from "../../interfaces/IUser";
import { message } from "antd"; // Ant Design message for notifications
import { GetUserById } from "../../services/https/index";


export const UsertopRigh: React.FC = () => {
    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    const userIdstr = localStorage.getItem("id");

    useEffect(() => {
        if (userIdstr) {
            fetchUserData(userIdstr);
        } else {
            message.error("ไม่พบ ID ของผู้ใช้ใน localStorage");
        }
    }, [userIdstr]);
    

    const fetchUserData = async (userIdstr: string ) => {
        try {
            console.log("Fetching user data for ID:", userIdstr); // Debug
            const res = await GetUserById(userIdstr);
            console.log("Response from API:", res); // Debug
            if (res.status === 200) {
                setUser(res.data);
                //message.success("พบข้อมูลUser");
            } else {
                message.error("ไม่พบข้อมูลUser");
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // Debug
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };
    return (
        <>
        {user ? (
            <div className="cardU">
                <div className="imgU"><img style={{width: '90%'}} src='https://media.tenor.com/Rp0U7bdOhSUAAAAj/anime.gif' /></div>
                <div className="textBoxU">
                    <div>Hello!! {user.username}  😘</div>
                    <div>Status: {user.status}</div>
                </div>
            </div>
        ) : (
            <div>Loading user data...</div>
        )}
        </>
    );
};

