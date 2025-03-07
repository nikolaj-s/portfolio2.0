import { SeoIcon } from "../Icons/SeoIcon";
import { SpeedIcon } from "../Icons/SpeedIcon";
import { DesignIcon } from "../Icons/DesignIcon";
import styles from "./ThreeColumnText.module.css";

const ThreeColumnText = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
      
        <div className={styles.row}>
          <div className={styles.column}>
            <SeoIcon />
            <p>
              I optimize websites for search engines, improving visibility and driving organic traffic to your business.
            </p>
          </div>
          <div className={styles.column}>
            <SpeedIcon />
            <p>
              Performance matters! I optimize websites for speed and responsiveness, providing a seamless user experience.
            </p>
          </div>
          <div className={styles.column}>
            <DesignIcon />
            <p>
              Every pixel counts. I craft visually stunning and user-friendly designs that make a lasting impression.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeColumnText;
