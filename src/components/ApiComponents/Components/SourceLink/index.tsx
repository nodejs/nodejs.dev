import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './index.module.scss';

interface Props {
  link: string;
  version: string;
}

const SourceLink = ({ version, link }: Props) => (
  <p className={styles.sourceLinkComponent}>
    <FormattedMessage id="docs.api.sourceLink" />{' '}
    <a href={`https://github.com/nodejs/node/blob/${version}/${link}`}>
      {link}
    </a>
  </p>
);

export default SourceLink;
