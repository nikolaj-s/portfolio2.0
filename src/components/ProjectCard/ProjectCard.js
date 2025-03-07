import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ title, description, thumbnail, techStack, projectLink, color }) => {
  return (
    <motion.a 
      href={projectLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.card}
      whileHover={{ scale: 1.05, zIndex: 3 }}
      whileTap={{ scale: 0.98 }}
      transition={{duration: 0.03}}
      style={{border: `solid 2px ${color}`}}
    >
      <div className={styles.thumbnailWrapper}>
        <img src={thumbnail} alt={`${title} Thumbnail`} className={styles.thumbnail} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.description}>Built With:</p>
        <div className={styles.techStack}>
          {techStack.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
