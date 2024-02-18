import { useEffect, useRef } from "react";
import styles from "./style.module.css";

function HireTrainerModal({ onClose }) {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className={styles.container}>
      <form ref={ref}>
        <h3>
          Hire a <span>Trainer</span>
        </h3>
        <div className={styles.close} onClick={onClose}>
          X
        </div>
        <div className={styles.radioBtns}>
          <div>
            <input
              type="radio"
              id="author"
              name="trainer"
              value="author"
              defaultChecked
            />
            <label htmlFor="author">Hire original author</label>
          </div>
          <div>
            <input type="radio" id="trainer" name="trainer" value="trainer" />
            <label htmlFor="trainer">Hire experience trainer</label>
          </div>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="message">Message</label>
          <textarea id="message"></textarea>
        </div>
        <div className={styles.submit}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default HireTrainerModal;
