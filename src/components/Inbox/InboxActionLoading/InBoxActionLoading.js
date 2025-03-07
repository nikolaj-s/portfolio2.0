// components/LoadingOverlay.js
import React from "react";
import styles from "./InBoxActionLoading.module.css";

const InBoxActionLoading = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default InBoxActionLoading;