import React from 'react';
import { FormattedMessage } from 'react-intl';

import { parseApiDocsVersion } from '../../../../util/parseApiDocsVersion';
import styles from './index.module.scss';

interface Props {
  added: string[];
}

const AddedIn = ({ added }: Props) => (
  <p className={styles.addedComponent}>
    <FormattedMessage
      id="docs.api.addedIn"
      values={{ added: parseApiDocsVersion(added) }}
    />
  </p>
);

export default AddedIn;
