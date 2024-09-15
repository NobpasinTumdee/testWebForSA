import React from 'react';
import styles from './PaymentCard.module.css'; // Import CSS module

const PaymentCard: React.FC = () => {
  return (
    <div className={styles.containerPay}>
      <div className={styles.leftSidePay}>
        <div className={styles.cardPay}>
          <div className={styles.cardLinePay}></div>
          <div className={styles.buttonsPay}></div>
        </div>
        <div className={styles.postPay}>
          <div className={styles.postLinePay}></div>
          <div className={styles.screenPay}>
            <div className={styles.dollarPay}>$</div>
          </div>
          <div className={styles.numbersPay}></div>
          <div className={styles.numbersLine2Pay}></div>
        </div>
      </div>
      <div className={styles.rightSidePay}>
        <div className={styles.newPay}>SUBSCRIPTION NOW !!!</div>
        <svg
          viewBox="0 0 451.846 451.847"
          height="512"
          width="512"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.arrowPay}
        >
          <path
            fill="#cfcfcf"
            d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default PaymentCard;
