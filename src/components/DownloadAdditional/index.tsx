import React, { useState, FC } from 'react';
import { FormattedMessage } from 'react-intl';
import DownloadableItem from './DownloadableItem';
import DownloadToggle from '../DownloadToggle';
import { NodeReleaseLTSNPMVersion } from '../../types';
import { getDownloadableItemsList } from './DownloadableItem/downloadItems';
import styles from './index.module.scss';

interface DownloadAdditionalProps {
  line?: NodeReleaseLTSNPMVersion;
  selectedTypeRelease: string;
  handleTypeReleaseToggle: (selected: React.SetStateAction<string>) => void;
}

const DownloadAdditional: FC<DownloadAdditionalProps> = ({
  line,
  selectedTypeRelease,
  handleTypeReleaseToggle,
}) => {
  const [expandedItem, setExpandedItem] = useState('');

  return (
    <div className={styles.downloadAdditional}>
      <div className={styles.downloadAdditionalHeader}>
        <h3 className={styles.downloadAdditionalTitle}>
          <FormattedMessage id="components.downloadAdditional.title" />
        </h3>
        <DownloadToggle
          selected={selectedTypeRelease}
          handleClick={handleTypeReleaseToggle}
          showDescription={false}
        />
      </div>
      <div className={styles.downloadAdditionalBody}>
        {line &&
          getDownloadableItemsList(line?.version).map(item => (
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
