import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { jsonLink } from '../../../../../apiUrls';
import styles from './index.module.scss';

interface Props {
  fileName: string;
  version: string;
}

const JsonLink = ({ fileName, version }: Props): JSX.Element | null => (
  <div className={styles.json}>
    <a href={jsonLink(fileName, version)}>
      <FormattedMessage id="components.jsonLink.title" tagName="span" />
      <FontAwesomeIcon icon={faRobot} />
    </a>
  </div>
);

export default JsonLink;
