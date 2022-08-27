import React from 'react';
import styles from './index.module.scss';

interface Props {
  children?: React.ReactNode;
}

const AnimatedPlaceholder = ({ children }: Props): JSX.Element => (
  <div className={styles.placeholder}>
    {/* Prefer external skeleton structure or render default in case not passed */}
    {children}
    {!children && (
      <>
        <div className={styles.placeholderImage} />
        <div className={styles.placeholderText}>
          <div className={styles.placeholderTextLine} />
          <div className={styles.placeholderTextLine} />
          <div className={styles.placeholderTextLine} />
          <div className={styles.placeholderTextLine} />
        </div>
      </>
    )}
  </div>
);

export default AnimatedPlaceholder;
