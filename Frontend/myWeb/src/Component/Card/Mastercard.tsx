import React from 'react';
import styles from './Mastercard.module.css'; // Import CSS module

const Mastercard: React.FC = () => {
  return (
    <div className={styles.containerM}>
      <div className={styles.frontCard}>
        <h3 className={styles.mainTitle}>
          Financial | <span className='SpanM'>Elite</span>
        </h3>
        <i className={`fa fa-globe ${styles.globe}`}></i>
        <div className={styles.chip}></div>
        <div className={styles.cardInfo}>
          <p className={styles.no}>5423 4426 6230 0041</p>
          <p className={styles.name}>Ahmet Ömer</p>
          <p className={styles.expDate}>
            <span>Expiry Date</span>: 07/22
          </p>
        </div>
        <div className={styles.mastercard}></div>
      </div>
    </div>
  );
};

export default Mastercard;
