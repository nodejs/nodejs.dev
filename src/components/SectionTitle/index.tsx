import React from 'react';
import styles from './index.module.scss';

interface Props {
  pathTree: string[];
}

const SectionTitle = ({ pathTree }: Props) => (
  <div className={styles.sectionTitle}>
    {pathTree.map((path, index) => {
      const isLast = index === pathTree.length - 1;

      if (isLast) {
        return (
          <span className={styles.active} key={path}>
            {path}
          </span>
        );
      }

      return `${path} / `;
    })}
  </div>
);

export default SectionTitle;
