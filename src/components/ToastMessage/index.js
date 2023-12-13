import React, { useEffect } from "react";
import styles from "./styles.module.scss";

const CustomToast = ({ message, onClose, right, bottom }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // Close the toast after 3 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={styles.customToast}
      style={{
        top:right && "20px",
        right: right && "20px",
        bottom: bottom && "20px",
        left: bottom && "50%",
        transform: bottom && "translate(-50%, 0)"
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default CustomToast;
