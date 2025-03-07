'use client'
import React from "react";
import { motion } from "framer-motion";
import styles from "./SplashScreen.module.css";

const SplashScreen = ({ title, subtitle, Icon}) => {
   
  return (
    <div className={styles.splashScreen}>
      {/* Large Background Icon */}
      <div className={styles.iconBackground}>
        {Icon}
      </div>

      {/* Foreground Text */}
      <motion.div
        className={styles.textContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
