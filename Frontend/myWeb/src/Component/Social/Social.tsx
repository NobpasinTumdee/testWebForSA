import React from 'react';
import styles from './SocialIcons.module.css';

// popup
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SocialIcons: React.FC = () => {
  const notify = () => toast.info('🦄 We do not have any contact channels at this time.!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  return (
    <>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', position: 'fixed', right: '15px', bottom: '0', zIndex: '1000' }}>
        <li className={`${styles.item} ${styles.first}`}>
          <a href="https://www.instagram.com/cpelnwza027/" target="_blank" rel="noopener noreferrer">
            <i className={`fa-brands fa-instagram ${styles.icon}`}></i>
          </a>
        </li>
        <li className={`${styles.item} ${styles.second}`}>
          <a onClick={notify}>
            <i className={`fa-brands fa-linkedin ${styles.icon}`}></i>
          </a>
        </li>
        <li className={`${styles.item} ${styles.third}`}>
          <a href="https://youtu.be/oQVAudSAuQM?si=RXAGDcQqmTilwWry" target="_blank" rel="noopener noreferrer">
            <i className={`fa-brands fa-youtube ${styles.icon}`}></i>
          </a>
        </li>
        <li className={`${styles.item} ${styles.fourth}`}>
          <a href="https://x.com/178tk_/status/1825880361580245059?s=61&t=YZ3gzoXN_nbOxHnGagwrfg" target="_blank" rel="noopener noreferrer">
            <i className={`fa-brands fa-x-twitter ${styles.icon}`}></i>
          </a>
        </li>
      </ul>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default SocialIcons;
