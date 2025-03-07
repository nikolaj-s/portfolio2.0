import styles from "./InboxSkeleton.module.css";

const InboxSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.emailListSkeleton}>
        <h2 className={styles.skeleton}></h2>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.skeletonItem}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonText}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxSkeleton;
