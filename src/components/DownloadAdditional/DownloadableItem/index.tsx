import React, { FC } from 'react';
import classnames from 'classnames';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Downloadable } from './downloadItems';
import styles from './index.module.scss';

interface DownloadButtonProps {
  className: string;
  link: string;
  label: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({
  className,
  link,
  label,
}) => (
  <a className={className} href={link}>
    <GetAppIcon />
    {label}
  </a>
);

interface DownloadableItemProps {
  item: Downloadable;
  isExpanded: boolean;
  setExpandedItem: (itemName: string) => void;
}

const DownloadableItem: FC<DownloadableItemProps> = ({
  item,
  isExpanded,
  setExpandedItem,
}) => {
  const onClick = (): void =>
    isExpanded ? setExpandedItem('') : setExpandedItem(item.name);

  const itemClasses = classnames(styles.downloadableItem, {
    [styles.downloadableItemExpanded]: isExpanded,
  });

  const arrowClasses = isExpanded
    ? styles.headerArrowDown
    : styles.headerArrowRight;

  return (
    <div
      role="button"
      tabIndex={0}
      className={itemClasses}
      onKeyUp={onClick}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.headerArrow}>
          <div className={arrowClasses} />
        </div>
        {item.name}
      </div>

      {isExpanded && (
        <div className={styles.body}>
          {item.links.map(link => (
            <DownloadButton
              className={styles.bodyLink}
              key={link.label}
              link={link.path}
              label={link.label}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadableItem;
