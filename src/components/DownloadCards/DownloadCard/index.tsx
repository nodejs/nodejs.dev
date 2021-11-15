import React from 'react';
import { Tab } from 'react-tabs';
import './DownloadCard.scss';
import classnames from 'classnames';

interface Props {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  download: string;
  fileName: string;
  selected: boolean;
  onSelect: (name: string) => void;
}

export default function DownloadCard({
  name,
  icon: Icon,
  label,
  download,
  fileName,
  selected,
  onSelect,
}: Props): JSX.Element {
  const handleSelectCard = (): void => onSelect(name);
  const classNames = classnames('download-card', {
    'download-card--active': selected,
  });
  return (
    <Tab
      className={classNames}
      key={name}
      onClick={handleSelectCard}
      tabIndex="0"
      selectedClassName="download-card--active"
    >
      <div className="download-card__top">
        <Icon className="download-card__image" />
        {selected && (
          <a className="download-card__link" href={download}>
            <i className="material-icons">get_app</i>
          </a>
        )}
      </div>
      <p className="download-card__label">{label}</p>
      <p className="download-card__filename">{fileName}</p>
    </Tab>
  );
}
