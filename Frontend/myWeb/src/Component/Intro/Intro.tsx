import React, { useState } from 'react';
import styles from './TypographyAnimation.module.css';

const TypographyAnimation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const hideComponent = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsFadingOut(false); // รีเซ็ตสถานะการ fading-out
    }, 800); // รอให้การ fade-out เสร็จสิ้นก่อนที่จะซ่อนคอมโพเนนต์
  };

  return (
    <div
      className={`${styles.bodySo} ${!isVisible ? styles.hiddenSo : ''} ${isFadingOut ? styles.fadeOut : ''}`}
    >
      {isVisible && (
        <div className={styles.containerSo} onClick={hideComponent}>
          <span className={styles.textSo}>&nbsp;Netflim&nbsp;</span>
          <span className={styles.hoverTextSo}>&nbsp;Netflim&nbsp;</span>
        </div>
      )}
    </div>
  );
};

export default TypographyAnimation;
