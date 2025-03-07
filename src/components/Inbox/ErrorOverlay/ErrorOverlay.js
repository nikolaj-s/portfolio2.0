// ErrorOverlay.js
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ErrorOverlay.module.css';

const ErrorOverlay = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.card}>
        <p className={styles.message}>{error}</p>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </motion.div>
  );
};

export default ErrorOverlay;
