import React from 'react';

//import HistoryPayment from './HistoryPayment';
import Mastercard from '../Component/Card/Mastercard';

const Payment: React.FC = () => {

    
    return (
        <>
         {/* <HistoryPayment /> */}
         <h1 style={{textAlign: "center" , color: '#ffff'}} className="History-title">Payment</h1>
         <Mastercard />
         <a href="/subscription" className="return-button-Admin">Return to subscription page</a>

        </>
        
    );
};

export default Payment;