import React from 'react';
import styles from './SocialIcons.module.css';

const SocialIcons: React.FC = () => {
  return (
    <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' ,position: 'fixed' ,right: '15px',bottom: '0'}}>
      <li className={`${styles.item} ${styles.first}`}>
        <a href="#">
          <i className={`fa-brands fa-instagram ${styles.icon}`}></i>
        </a>
      </li>
      <li className={`${styles.item} ${styles.second}`}>
        <a href="#">
          <i className={`fa-brands fa-linkedin ${styles.icon}`}></i>
        </a>
      </li>
      <li className={`${styles.item} ${styles.third}`}>
        <a href="#">
          <i className={`fa-brands fa-youtube ${styles.icon}`}></i>
        </a>
      </li>
      <li className={`${styles.item} ${styles.fourth}`}>
        <a href="#">
          <i className={`fa-brands fa-x-twitter ${styles.icon}`}></i>
        </a>
      </li>
    </ul>
  );
};

export default SocialIcons;
