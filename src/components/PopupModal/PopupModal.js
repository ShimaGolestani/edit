import styles from "./PopupModal.module.css";
import { Icon } from "@iconify/react";
const PopupModal = ({ hidden }) => {
  return (
    <div hidden={hidden} className={styles.main}>
      <div className={styles.card}>
        <Icon icon={"line-md:loading-loop"} className={styles.icon} />
        <div
          style={{
            display: "block",
            position: "absolute",
            paddingTop: "10rem",
            backgroundColor: "white",
          }}
        ></div>
      </div>
    </div>
  );
};
export default PopupModal;
