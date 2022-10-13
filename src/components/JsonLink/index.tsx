import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface Props {
  fileTitle: string;
  version: string;
}

const baseURL = `https://nodejs.org/docs/latest-`;

const JsonLink = ({ fileTitle, version }: Props): JSX.Element | null => {
  const href = `${baseURL}${version}.x/api/${fileTitle}.json`;

  return (
    <div className={styles.json}>
      <a href={href}>
        <FormattedMessage id="components.jsonLink.title" tagName="span" />
        <FontAwesomeIcon icon={faRobot} />
      </a>
    </div>
  );
};

export default JsonLink;
