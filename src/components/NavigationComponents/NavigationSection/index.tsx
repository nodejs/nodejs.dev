import React from 'react';
import styles from './index.module.scss';

interface Props {
  isOpen: boolean;
  label: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

const getDisplay = (isOpen: boolean) => ({
  display: isOpen ? 'block' : 'none',
});

const NavigationSection = ({
  label,
  title,
  isOpen,
  content,
}: Props): JSX.Element => (
  <div className={styles.navigationSection}>
    {title}
    <div role="region" aria-label={label} style={getDisplay(isOpen)}>
      {content}
    </div>
  </div>
);

export default NavigationSection;
