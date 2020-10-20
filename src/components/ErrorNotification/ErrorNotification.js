import React from 'react';
import styles from './ErrorNotification.module.css';

const ErrorNotification = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorBox}>
        <div className={styles.dot}></div>
        <div className={styles.two}></div>
        <div className={styles.face2}>
          <div className={styles.eye}></div>
          <div className={styles.right}></div>
          <div className={styles.sad}></div>
        </div>
        <div className={styles.move}></div>
        <div className={styles.message}>
          <p className={styles.alert}>Error!</p>
          <p className={styles.subtitle}>Oh no, something went wrong.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotification;
