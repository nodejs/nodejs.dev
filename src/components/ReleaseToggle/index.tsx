import React from 'react';

import './ReleaseToggle.scss';

interface Props {
  handleClick: (type: string) => void;
  selected: string;
}

export default function ReleaseToggle({
  handleClick,
  selected,
}: Props): JSX.Element {
  return (
    <div className="slider-checkbox">
      <div className="slider-checkbox-selector">
        <button
          type="button"
          className={
            selected === 'LTS'
              ? 'slider-checkbox-button -active'
              : 'slider-checkbox-button'
          }
          onClick={(): void => handleClick('LTS')}
        >
          LTS
        </button>
        <button
          type="button"
          className={
            selected === 'CURRENT'
              ? 'slider-checkbox-button -current -active'
              : 'slider-checkbox-button -current'
          }
          onClick={(): void => handleClick('CURRENT')}
        >
          Current
        </button>
      </div>
      <p className="release-toogle__description">
        {selected === 'LTS'
          ? 'Recommended for most users'
          : 'With the latest features'}
      </p>
    </div>
  );
}
