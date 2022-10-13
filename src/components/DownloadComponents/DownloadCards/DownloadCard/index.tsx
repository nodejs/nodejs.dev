import React from 'react';
import { Tab } from 'react-tabs';
import GetAppIcon from '@mui/icons-material/GetApp';
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
      selectedClassName={styles.downloadCardActive}
      tabIndex="0"
    >
      <div className={styles.top}>
        <Icon className={styles.image} />
        {selected && (
          <a className={styles.link} href={download}>
            <GetAppIcon />
          </a>
        )}
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.filename}>{fileName}</p>
    </Tab>
  );
};

export default DownloadCard;
