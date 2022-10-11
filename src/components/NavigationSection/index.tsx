import React from 'react';
import styles from './index.module.scss';

interface Props {
  isOpen: boolean;
  title: React.ReactNode;
  content: React.ReactNode;
}

const NavigationSection = ({ title, isOpen, content }: Props): JSX.Element => (
  <div className={styles.navigationSection}>
    {title}
    <div role="region" style={{ display: isOpen ? 'block' : 'none' }}>
      {content}
    </div>
  </div>
);

export default NavigationSection;
