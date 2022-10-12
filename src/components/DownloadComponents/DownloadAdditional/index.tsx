import React, { useState, FC } from 'react';
import { FormattedMessage } from 'react-intl';
import DownloadableItem from './DownloadableItem';
import DownloadToggle from '../DownloadToggle';
import { getDownloadableItemsList } from './DownloadableItem/downloadItems';
import { NodeReleaseData } from '../../../types';
import styles from './index.module.scss';

interface DownloadAdditionalProps {
  line?: NodeReleaseData;
  selectedTypeRelease: string;
  handleTypeReleaseToggle: (selected: React.SetStateAction<string>) => void;
}

const DownloadAdditional = ({
  line,
  selectedTypeRelease,
  handleTypeReleaseToggle,
}: DownloadAdditionalProps) => {
  const [expandedItem, setExpandedItem] = useState('');

  return (
    <div className={styles.downloadAdditional}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <FormattedMessage id="components.downloadAdditional.title" />
        </h3>
        <DownloadToggle
          selected={selectedTypeRelease}
          handleClick={handleTypeReleaseToggle}
          showDescription={false}
        />
      </div>
      <div className={styles.body}>
        {line &&
          getDownloadableItemsList(line.fullVersion).map(item => (
            <DownloadableItem
              key={item.name}
              item={item}
              isExpanded={expandedItem === item.name}
              setExpandedItem={setExpandedItem}
            />
          ))}
      </div>
    </div>
  );
};

export default DownloadAdditional;
