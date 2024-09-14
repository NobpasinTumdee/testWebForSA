import React from 'react';

import HistoryPayment from './HistoryPayment';
import Mastercard from '../Component/Card/Mastercard';

const Payment: React.FC = () => {

    
    return (
        <>
         <HistoryPayment />
         <Mastercard />
        </>
        
    );
};

export default Payment;