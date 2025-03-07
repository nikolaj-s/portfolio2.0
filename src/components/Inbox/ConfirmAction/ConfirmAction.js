"use client";
import { motion } from "framer-motion";
import styles from "./ConfirmAction.module.css";
import { TextButton } from "../TextButton/TextButton";

const ConfirmAction = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <motion.div
        className={styles.popup}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <TextButton name={'Cancel'} onClick={onCancel}/>
          <TextButton name={'Confirm'}  onClick={onConfirm} />
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmAction;
