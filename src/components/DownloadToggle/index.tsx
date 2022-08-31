import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  handleClick: (type: string) => void;
  selected: string;
  showDescription?: boolean;
}

const DownloadToggle = ({
  handleClick,
  selected,
  showDescription = true,
}: Props): JSX.Element => {
  const activeClassNames = classnames({ [styles.active]: selected === 'LTS' });
  const currentClassNames = classnames(styles.current, {
    [styles.active]: selected === 'CURRENT',
  });

  const handleOnClick = () =>
    handleClick(selected === 'CURRENT' ? 'LTS' : 'CURRENT');

  return (
    <div className={styles.downloadToogle}>
      <div className={styles.selector}>
        <div className={styles.switch}>
          <button
            className={activeClassNames}
            type="button"
            role="switch"
            aria-label="Show LTS versions"
            aria-checked={selected === 'LTS'}
            onClick={handleOnClick}
          >
            <FormattedMessage id="components.downloadToggle.lts" />
          </button>
          <button
            className={currentClassNames}
            type="button"
            role="switch"
            aria-label="Show LTS versions"
            aria-checked={selected === 'LTS'}
            onClick={handleOnClick}
          >
            <FormattedMessage id="components.downloadToggle.current" />
          </button>
        </div>
      </div>
      {showDescription && (
        <p className={styles.description}>
          <FormattedMessage
            id="components.downloadToggle.recommendation"
            values={{ selected }}
          />
        </p>
      )}
    </div>
  );
};

export default DownloadToggle;
