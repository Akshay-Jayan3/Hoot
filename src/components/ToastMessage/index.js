import React, { useEffect } from 'react';
import styles from "./styles.module.scss";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const CustomToast = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // Close the toast after 3 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={styles.customToast}>
      <p>{message}</p>
    </div>
  );
};

export default CustomToast;
