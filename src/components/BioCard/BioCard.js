import { motion } from "framer-motion";
import styles from "./BioCard.module.css";

const BioCard = () => {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h2 className={styles.title}>Hello, 👋</h2>
        <p className={styles.description}>
        I&apos;m Nikolaj, a passionate full-stack web developer creating dynamic and scalable web applications. From sleek, high-performing landing pages to fully integrated web and desktop applications, I specialize in bringing ideas to life through clean, efficient code. Whether you need a simple website or a complex, full-stack solution, I offer tailored development services to turn your vision into reality.
        </p>
      </div>
    </motion.div>
  );
};

export default BioCard;
