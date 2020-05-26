import React from 'react';

import './DownloadToggle.scss';

interface Props {
  handleClick: (type: string) => void;
  selected: string;
}

export default function DownloadToggle({
  handleClick,
  selected,
}: Props): JSX.Element {
  return (
    <div className="download-toogle">
      <div className="download-toogle__selector">
        <button
          type="button"
          className={
            selected === 'LTS'
              ? 'download-toogle__button -active'
              : 'download-toogle__button'
          }
          onClick={(): void => handleClick('LTS')}
        >
          LTS
        </button>
        <button
          type="button"
          className={
            selected === 'CURRENT'
              ? 'download-toogle__button -current -active'
              : 'download-toogle__button -current'
          }
          onClick={(): void => handleClick('CURRENT')}
        >
          Current
        </button>
      </div>
      <p className="download-toogle__description">
        {selected === 'LTS'
          ? 'Recommended for most users'
          : 'With the latest features'}
      </p>
    </div>
  );
}
