import React from 'react';
import { Tab } from 'react-tabs';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  download: string;
  fileName: string;
  selected: boolean;
  onSelect: (name: string) => void;
}

const DownloadCard = ({
  name,
  icon: Icon,
  label,
  download,
  fileName,
  selected,
  onSelect,
}: Props): JSX.Element => {
  const handleSelectCard = (): void => onSelect(name);
  const classNames = classnames(styles.downloadCard, {
    [styles.downloadCardActive]: selected,
  });

  return (
    <Tab
      className={classNames}
      id={`download-card-${name}`}
      key={name}
      onClick={handleSelectCard}
      tabIndex="0"
      selectedClassName={styles.downloadCardActive}
    >
      <div className={styles.downloadCardTop}>
        <Icon className={styles.downloadCardImage} />
        {selected && (
          <a className={styles.downloadCardLink} href={download}>
            <i className="material-icons">get_app</i>
          </a>
        )}
      </div>
      <p className={styles.downloadCardLabel}>{label}</p>
      <p className={styles.downloadCardFilename}>{fileName}</p>
    </Tab>
  );
};

export default DownloadCard;
