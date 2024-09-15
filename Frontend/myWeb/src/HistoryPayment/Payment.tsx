import React,{useEffect,useState} from 'react';

//import HistoryPayment from './HistoryPayment';
import Mastercard from '../Component/Card/Mastercard';



const Payment: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      const getFormattedDateTime = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = (date.getFullYear() + 543).toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      };
    
    return (
        <>
         {/* <HistoryPayment /> */}
         <h1 style={{textAlign: "center" , color: '#ffff'}} className="History-title">Payment</h1>
         <div style={{color: '#ffff' , margin: "0px 43% " , width: '250px'}}>
            Right Now: {getFormattedDateTime(currentTime)}
         </div>
         <Mastercard />
         <a href="/subscription" className="return-button-Admin">Return to subscription page</a>
        </>
        
    );
};

export default Payment;