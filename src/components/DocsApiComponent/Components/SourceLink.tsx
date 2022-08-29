import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './source-link.module.scss';

interface Props {
  sourceName: string;
  sourceLink: string;
}

const SourceLink = ({ sourceName, sourceLink }: Props) => (
  <p className={styles.sourceLinkComponent}>
    <FormattedMessage id="docs.api.sourceLink" />{' '}
    <a href={sourceLink}>{sourceName}</a>
  </p>
);

export default SourceLink;
