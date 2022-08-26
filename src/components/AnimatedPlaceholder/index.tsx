import React from 'react';
import styles from './index.module.scss';

interface Props {
  children?: React.ReactNode;
}

const AnimatedPlaceholder = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.animatedPlaceholder}>
      {/* Prefer external skeleton structure or render default in case not passed */}
      {children}
      {!children && (
        <>
          <div className={styles.animatedPlaceholderImage} />
          <div className={styles.animatedPlaceholderText}>
            <div className={styles.animatedPlaceholderTextLine} />
            <div className={styles.animatedPlaceholderTextLine} />
            <div className={styles.animatedPlaceholderTextLine} />
            <div className={styles.animatedPlaceholderTextLine} />
          </div>
        </>
      )}
    </div>
  );
};

export default AnimatedPlaceholder;
