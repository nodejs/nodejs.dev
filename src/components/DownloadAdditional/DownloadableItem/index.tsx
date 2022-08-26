import React, { FC } from 'react';
import classnames from 'classnames';
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
    <i className="material-icons">get_app</i>
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

  return (
    <div
      role="button"
      tabIndex={0}
      className={itemClasses}
      onKeyUp={onClick}
      onClick={onClick}
    >
      <div className={styles.downloadableItemHeader}>
        <div className={styles.downloadableItemHeaderArrow}>
          <div
            className={
              isExpanded
                ? styles.downloadableItemHeaderArrowDown
                : styles.downloadableItemHeaderArrowRight
            }
          />
        </div>
        {item.name}
      </div>

      {isExpanded && (
        <div className={styles.downloadableItemBody}>
          {item.links.map(link => (
            <DownloadButton
              className={styles.downloadableItemBodyLink}
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
